import './index.less'
import React, { useMemo, useState} from "react";
import {useKeyPress} from "ahooks";
import {funcItemType} from "@/App";
import {GET_SCRIPT_CONTENT, SETUP_DIRECTORY} from "../../../constant/event";
import {Icon} from '@rsuite/icons';
import {CountTextIcon, FolderIcon, JsonFormatIcon} from "../../../public/icons";

const iconTagMap: any = {
    CountText: CountTextIcon,
    JsonFormat: JsonFormatIcon,
}

type SearchListProps = {
    value: funcItemType[];
    close: () => void
    onChange: (func: Function) => void
}

const parseFileContent = (content: string) => {
    // 解析文件内容,提取 main 函数
    const funcRegex = /\/\*\*\n \{(.*?)\n \*\*\/\n\n(.*)/s;
    const funcMatch = content.match(funcRegex);

    if (funcMatch) {
        return funcMatch[2].trim().replace('const main = ', '')
    } else {
        throw new Error('Failed to parse file content');
    }
}

const SearchList = (props: SearchListProps) => {
    const {value = [], close, onChange} = props
    const [search, setSearch] = useState('');
    const filteredValues = useMemo(
        () =>
        search ? value.filter(v => v.name.toLowerCase().includes(search.toLowerCase())) : value,
        [search, value]
    )

    const [selectedIndex, setSelectedIndex] = useState(0);

    const fetchEleAndScrollToItem = (id?: number) => {
        if(id) {
            const element = document.getElementById(id.toString())
            if(element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    useKeyPress('uparrow', () => {
        const index = selectedIndex > 0 ? selectedIndex - 1 : filteredValues.length - 1
        if(filteredValues[index] && filteredValues[index].id) {
            fetchEleAndScrollToItem(filteredValues[index].id)
        }
        setSelectedIndex(index);
    });

    useKeyPress('downarrow', () => {
        const index = selectedIndex < filteredValues.length - 1 ? selectedIndex + 1 : 0
        if(filteredValues[index] && filteredValues[index].id) {
            fetchEleAndScrollToItem(filteredValues[index].id)
        }
        setSelectedIndex((prevIndex) => (prevIndex < filteredValues.length - 1 ? prevIndex + 1 : 0));
    });

    useKeyPress('enter', () => {
        run(filteredValues[selectedIndex]);
        close();
    });

    useKeyPress('esc', () => {
        close()
    })

    const run = async (val: { name: string, type: 'customize' | 'base' }) => {
            const scriptFileContent = await window.ipcRenderer.invoke(GET_SCRIPT_CONTENT, {
                name: val.name,
                type: val.type,
            });
            const main = parseFileContent(scriptFileContent);
            const func = eval(main)
            onChange(func)
            close()
    }

    const handleChooseFolder = () => {
        window.ipcRenderer.send(SETUP_DIRECTORY, []);
    }

    return <div className="search-container">
        <div className="search-bar">
            <input value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   type="text"
                   autoFocus={true}
                   placeholder="在此搜索需要的功能"/>
            <div className="folder" onClick={handleChooseFolder}>
                <Icon as={FolderIcon} />
            </div>
        </div>

        {filteredValues.length > 0 && (
            <div className="search-results">
                {filteredValues.map((v, i) => (
                    <div id={v.id.toString()} className="search-result" style={{
                            color: i === selectedIndex ? '#fff' : '#000',
                            background: i === selectedIndex ? '#4093ff' : ''
                        }} key={v.id} onClick={() => run(v)}>
                        <div className="search-result-tag">
                            <Icon as={iconTagMap[v.tag] || FolderIcon}/>
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
}

export default SearchList