import React from "react"

type MessageBaseUserInfoProps = {
    src: string,
    date: string
}

const MessageBaseUserInfo: React.FC<MessageBaseUserInfoProps> = ({src, date}) => {
    const formattedDate = new Date(date);
    const hour = formattedDate.getHours() < 10 ? "0" + formattedDate.getHours().toString() : formattedDate.getHours().toString();
    const minutes = formattedDate.getMinutes() < 10 ? "0" + formattedDate.getMinutes().toString() : formattedDate.getMinutes().toString();

    return (
        <div className="message-base__user-info">
            <div className="message-user__photo">
                <img src={src} alt="" />
            </div>
            <div className="message-time">{hour}:{minutes}</div>
        </div>
    )
}

export default MessageBaseUserInfo;