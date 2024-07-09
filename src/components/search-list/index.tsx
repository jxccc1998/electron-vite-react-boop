import './index.less'
import {useMemo, useState} from "react";
import {useKeyPress} from "ahooks";

type SearchListProps = {
    value: string[];
    close: () => void
    onChange: (func: Function) => void
}

const SearchList = (props: SearchListProps) => {
    const {value = [], close, onChange} = props
    const [search, setSearch] = useState('');
    const filteredValues = useMemo(
        () =>
        search ? value.filter(v => v.toLowerCase().includes(search.toLowerCase())) : [],
        [search, value]
    )

    const [selectedIndex, setSelectedIndex] = useState(0);

    useKeyPress('uparrow', () => {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredValues.length - 1));
    });

    useKeyPress('downarrow', () => {
        setSelectedIndex((prevIndex) => (prevIndex < filteredValues.length - 1 ? prevIndex + 1 : 0));
    });

    useKeyPress('enter', () => {
        run(filteredValues[selectedIndex]);
        close();
    });

    useKeyPress('esc', () => {
        close()
    })

    const run = async (name: string) => {
        const scriptFilePath: string = await window.ipcRenderer.invoke('get-script-file', {
            name
        });
        const script = await import(scriptFilePath) as any
        const { main } = script
        onChange(main)
        close()
    }

    return <div className="search-container">
            <input value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   type="text"
                   autoFocus={true}
                   placeholder="在此搜索需要的功能"/>
            {filteredValues.length > 0 && (
                <div className="search-results">
                    {filteredValues.map((v, i) => (
                        <p style={{
                            color: i === selectedIndex ? 'red' : '',
                            background: i === selectedIndex ? '#eee' : ''
                        }} key={i} onClick={() => run(v)}>{v}</p>
                    ))}
                </div>
            )}
        </div>
}

export default SearchList