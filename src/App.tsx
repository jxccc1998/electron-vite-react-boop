import { useEffect, useState } from "react";
import "./App.css";
import SearchList from "@/components/search-list";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import Header, { messageType } from "@/components/header";
import { useKeyPress, useUpdateEffect } from "ahooks";
import {
  CHANGE_DIRECTORY,
  GET_CUSTOMIZE_DIR,
  GET_CUSTOMIZE_SCRIPT_FILES,
  GET_SCRIPT_CONTENT,
  GET_SCRIPT_FILES,
} from "../constant/event";

export type funcItemType = {
  type: "base" | "customize";
  name: string;
  description: string;
  tag: string;
  id: number;
  fileName: string;
};

const extractMultiLineComments = (content: string) => {
  let pattern = /\/\*\*(.*?)\*(.*?)\//s; // 使用 s 标志使点号（.）能够匹配包括换行符在内的所有字符

  let match = content.match(pattern);
  if (match) {
    let jsonString = match[1].trim();
    try {
      // 解析 JSON
      return eval("(" + jsonString + ")");
    } catch (error) {
      console.error("JSON 解析错误");
    }
  } else {
    console.log("未找到匹配的注释块");
  }
  // const commentsRegex = /\/\*\*([\s\S]*?)\**\//g;
  // let match = null;
  // const comments = [];
  //
  // while ((match = commentsRegex.exec(content))) {
  //   comments.push(match[1].trim());
  // }
  // // return comments[0]
  // return eval("(" + comments[0] + ")");
};

let editor: any;
function App() {
  const [files, setFiles] = useState<funcItemType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<messageType>({
    type: "INFO",
    content: "按下ctrl+x搜索并使用功能",
  });

  const loadScripts = async () => {
    const scriptFiles: string[] = await window.ipcRenderer.invoke(
      GET_SCRIPT_FILES
    );
    const res = window.ipcRenderer.sendSync(GET_CUSTOMIZE_DIR);
    let customizeScriptFiles: string[] = [];
    if (res) {
      customizeScriptFiles = await window.ipcRenderer.invoke(
        GET_CUSTOMIZE_SCRIPT_FILES,
        res
      );
    }
    const scriptFilePromises = scriptFiles.map(async (fileName) => {
      const scriptFileContent = await window.ipcRenderer.invoke(
        GET_SCRIPT_CONTENT,
        {
          name: fileName,
          type: "base",
        }
      );
      if (scriptFileContent) {
        try {
          const annotate = extractMultiLineComments(scriptFileContent);
          if (
            annotate &&
            annotate.name &&
            annotate.description &&
            annotate.id
          ) {
            annotate.type = "base";
            annotate.fileName = fileName;
            return annotate;
          }
        } catch (e) {}
      }
      return null;
    });

    const customizeScriptFilePromises = customizeScriptFiles.map(
      async (fileName) => {
        const scriptFileContent = await window.ipcRenderer.invoke(
          GET_SCRIPT_CONTENT,
          {
            name: fileName,
            type: "customize",
          }
        );
        if (scriptFileContent) {
          try {
            const annotate = extractMultiLineComments(scriptFileContent);
            if (
              annotate &&
              annotate.name &&
              annotate.description &&
              annotate.id
            ) {
              annotate.type = "customize";
              annotate.fileName = fileName;
              return annotate;
            }
          } catch (e) {}
        }
        return null;
      }
    );

    const annotates = await Promise.all(
      scriptFilePromises.concat(customizeScriptFilePromises)
    );
    setFiles(annotates.filter((v) => v));
  };

  useUpdateEffect(() => {
    loadScripts();
  }, [isUpdate]);

  useEffect(() => {
    window.ipcRenderer.on(CHANGE_DIRECTORY, (e, dir) => {
      setIsUpdate((val) => !val);
    });
    editor = ace.edit("editor");
    editor.setFontSize(20);
    editor.setOption("wrap", "free");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/monokai");
    loadScripts();
  }, []);

  useKeyPress(["ctrl.x"], () => {
    setOpen(true);
  });

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      editor.focus();
    }, 100);
  };

  const changeMessage = (message: messageType) => {
    setMessage(message);
  };

  const isMessageType = (obj: any): obj is messageType => {
    return obj && typeof obj === "object" && "type" in obj && "content" in obj;
  };

  const afterFunc = (res: messageType | string) => {
    if (isMessageType(res)) {
      changeMessage(res);
      return res.type;
    } else {
      changeMessage({ type: "INFO", content: "按下ctrl+x搜索并使用功能" });
    }
    return res;
  };

  const changeText = (func: Function) => {
    const selection = editor.getSelection();
    const ranges = selection.getAllRanges();
    const selectedTexts = ranges.map((range: string) =>
      editor.session.getTextRange(range)
    );
    // 有多项（多光标选中）， 单项（单光标选中）， 单项空（全文本）
    if (selectedTexts.length > 1 && selectedTexts[0] !== "") {
      // 多光标情况
      ranges.forEach((range: string, i: number) => {
        const res = afterFunc(func(selectedTexts[i]));
        if (res === "ERROR" || res === "INFO" || res === "SUCCESS") {
          return;
        }
        editor.session.replace(range, res);
      });
    } else if (selectedTexts.length === 1 && selectedTexts[0] !== "") {
      const res = afterFunc(func(selectedTexts[0]));
      if (res === "ERROR" || res === "INFO" || res === "SUCCESS") {
        return;
      }
      const range = selection.getRange();
      editor.session.replace(range, res);
    } else if (selectedTexts[0] === "") {
      const res = afterFunc(func(editor.getValue()));
      if (res === "ERROR" || res === "INFO" || res === "SUCCESS") {
        return;
      }
      editor.setValue(res);
    }
    console.log("选中的文本数组: ", selectedTexts);
  };

  return (
    <div className="drag-wrapper">
      <div className="main">
        <Header message={message} />
        {open && (
          <>
            <div onClick={close} className="overlay" />
            <SearchList value={files} onChange={changeText} close={close} />
          </>
        )}
        <div id="editor"></div>
      </div>
    </div>
  );
}

export default App;
