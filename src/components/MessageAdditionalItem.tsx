import React from "react"

type MessageAdditionalItemProps = {
    text: string,
    type?: string
}

const MessageAdditionalItem: React.FC<MessageAdditionalItemProps> = ({text, type}) => {
    return (
        <div className={`message-additional__item ${type && type === "active" ? "active" : ""}`}>
            #{text}
        </div>
    )
}

export default MessageAdditionalItem;