import "./index.less";
import React, { useMemo, useState } from "react";
import { useKeyPress } from "ahooks";
import { funcItemType } from "@/App";
import { GET_SCRIPT_CONTENT, SETUP_DIRECTORY } from "../../../constant/event";
import { Icon } from "@rsuite/icons";
import {
  ColorTransIcon,
  CountTextIcon,
  FolderIcon,
  JsonFormatIcon,
  Md5Icon,
  ScriptIcon,
} from "../../../public/icons";

const icons = [
  CountTextIcon,
  FolderIcon,
  JsonFormatIcon,
  ColorTransIcon,
  Md5Icon,
];

const renderTabContent = (component?: React.FunctionComponent<any>) => {
  if (component) {
    return component;
  }
  return ScriptIcon;
};

type SearchListProps = {
  value: funcItemType[];
  close: () => void;
  onChange: (func: Function) => void;
};

const SearchList = (props: SearchListProps) => {
  const { value = [], close, onChange } = props;
  const [search, setSearch] = useState("");
  const filteredValues = useMemo(
    () =>
      search
        ? value.filter((v) =>
            v.name.toLowerCase().includes(search.toLowerCase())
          )
        : value,
    [search, value]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchEleAndScrollToItem = (id?: number) => {
    if (id) {
      const element = document.getElementById(id.toString());
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useKeyPress("uparrow", () => {
    const index =
      selectedIndex > 0 ? selectedIndex - 1 : filteredValues.length - 1;
    if (filteredValues[index] && filteredValues[index].id) {
      fetchEleAndScrollToItem(filteredValues[index].id);
    }
    setSelectedIndex(index);
  });

  useKeyPress("downarrow", () => {
    const index =
      selectedIndex < filteredValues.length - 1 ? selectedIndex + 1 : 0;
    if (filteredValues[index] && filteredValues[index].id) {
      fetchEleAndScrollToItem(filteredValues[index].id);
    }
    setSelectedIndex((prevIndex) =>
      prevIndex < filteredValues.length - 1 ? prevIndex + 1 : 0
    );
  });

  useKeyPress("enter", () => {
    run(filteredValues[selectedIndex]);
    close();
  });

  useKeyPress("esc", () => {
    close();
  });

  const run = async (val: { fileName: string; type: "customize" | "base" }) => {
    const scriptFileContent = await window.ipcRenderer.invoke(
      GET_SCRIPT_CONTENT,
      {
        name: val.fileName,
        type: val.type,
      }
    );
    let mainFunction: Function = () => {};
    eval(`${scriptFileContent}; mainFunction = main;`);
    onChange(mainFunction);
    close();
  };

  const handleChooseFolder = () => {
    window.ipcRenderer.send(SETUP_DIRECTORY, []);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          autoFocus={true}
          placeholder="在此搜索需要的功能"
        />
        <div className="folder" onClick={handleChooseFolder}>
          <Icon as={FolderIcon} />
        </div>
      </div>

      {filteredValues.length > 0 && (
        <div className="search-results">
          {filteredValues.map((v, i) => (
            <div
              id={v.id.toString()}
              className="search-result"
              style={{
                color: i === selectedIndex ? "#fff" : "#000",
                background: i === selectedIndex ? "#4093ff" : "",
              }}
              key={v.id}
              onClick={() => run(v)}
            >
              <div className="search-result-tag">
                <Icon
                  as={renderTabContent(
                    icons.find((icon) => icon.displayName === v.tag)
                  )}
                />
              </div>
              <div className="search-result-info">
                <span className="name">{v.name}</span>
                <span className="desc">{v.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchList;
