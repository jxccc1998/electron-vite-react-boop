import './index.less';

export type messageType = {
    type: 'ERROR' | 'INFO' | 'SUCCESS';
    content: string;
}

const MenuBar = (props: { message: messageType }) => {
    const { message  } = props;

    return (
        <div className="menu-bar">
            <div className="message">
                <span className={message.type.toLowerCase()}>{ message.content }</span>
            </div>
        </div>
    );
};

export default MenuBar;