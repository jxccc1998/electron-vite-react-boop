import {useEffect, useState} from 'react'
import './App.css'
import SearchList from "@/components/search-list";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import 'ace-builds/src-noconflict/theme-monokai';
import Header, {messageType} from "@/components/header";
import {useKeyPress} from "ahooks";

let editor: any
function App() {
    const [files, setFiles ] = useState<string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<messageType>({
        type: 'INFO', content: '按下ctrl+x搜索并使用功能'
    })

    useEffect(() => {
        editor = ace.edit("editor")
        editor.setFontSize(20)
        editor.setOption("wrap", "free")
        editor.getSession().setMode("ace/mode/javascript");
        editor.setTheme("ace/theme/monokai");
        loadScripts()
    },[])

    useKeyPress(['ctrl.x'], () => {
        setOpen(true);
    });

    const loadScripts = async () => {
        const scriptFiles: string[] = await window.ipcRenderer.invoke('get-script-files');
        setFiles(scriptFiles);
    }

    const close = () => {
        setOpen(false);
        setTimeout(() => {
            editor.focus();
        }, 100)
    }

    const changeMessage = (message: messageType) => {
        setMessage(message)
    }

    const isMessageType = (obj: any): obj is messageType => {
        return obj && typeof obj === 'object' && 'type' in obj && 'content' in obj;
    }

    const afterFunc = (res: messageType | string) => {
        if(isMessageType(res)) {
            changeMessage(res)
            return res.type
        } else {
            changeMessage({type: 'INFO', content: '按下ctrl+x搜索并使用功能'})
        }
        return res
    }

    const changeText = (func: Function) => {
        const selection = editor.getSelection();
        const ranges = selection.getAllRanges();
        const selectedTexts = ranges.map((range: string) => editor.session.getTextRange(range));
        // 有多项（多光标选中）， 单项（单光标选中）， 单项空（全文本）
        if(selectedTexts.length > 1 && selectedTexts[0] !== '') {
            // 多光标情况
            ranges.forEach((range: string, i: number) => {
                const res = afterFunc(func(selectedTexts[i]))
                if(res === 'ERROR' || res === 'INFO' || res === 'SUCCESS') {
                    return
                }
                editor.session.replace(range, res);
            })
        } else if(selectedTexts.length === 1 && selectedTexts[0] !== '') {
            const res = afterFunc(func(selectedTexts[0]))
            if(res === 'ERROR' || res === 'INFO' || res === 'SUCCESS') {
                return
            }
            const range = selection.getRange();
            editor.session.replace(range, res);
        } else if(selectedTexts[0] === '') {
            const res = afterFunc(func(editor.getValue()))
            if(res === 'ERROR' || res === 'INFO' || res === 'SUCCESS') {
                return
            }
            editor.setValue(res)
        }
        console.log("选中的文本数组: ", selectedTexts);
    }

    return (
        <div className='drag-wrapper'>
            <div className='main'>
                <Header message={message} />
                {
                    open && <>
                        <div onClick={close} className="overlay"/>
                        <SearchList value={files} onChange={changeText} close={close} />
                    </>
                }
                <div id="editor"></div>
            </div>
        </div>
    )
}

export default App