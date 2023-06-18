import React from "react";
import { IAttachment } from "../types";

type MessageMediaItemProps = {
    media: IAttachment
}

const MessageMediaItem: React.FC<MessageMediaItemProps> = ({media}) => {
    return (
        <div className="message-media__item">
            {
                media.type === "image" ?
                    <img src={media.url} alt="" />
                : ""
            }
            {
                media.type === "video" ?
                    <video src={media.url} height={259} controls />
                : ""
            }
        </div>
    )
}

export default MessageMediaItem;