import React from "react";
import UserPhoto from "../images/user_photo.png";
import enterIcon from "../images/enter.svg";
import hideIcon from "../images/hide.svg";
import settingsIcon from "../images/settings.svg";
import favoritesIcon from "../images/favorites.svg";
import MessageAdditionalItem from "./MessageAdditionalItem";
import MessageBaseUserInfo from "./MessageBaseUserInfo";
import MessageHeader from "./MessageHeader";
import { IMessageExtended } from "../types";
import MessageMediaItem from "./MessageMediaItem";

type MessageProps = {
    item: IMessageExtended
}

const Message: React.FC<MessageProps> = ({item}) => {

    return (
        <div className="message">
            <div className="message-base">
                <MessageBaseUserInfo src={UserPhoto} date={item.date} />
                <div className="message-base__content">
                    <MessageHeader
                        enterIconSrc={enterIcon}
                        hideIconSrc={hideIcon}
                        settingsIconSrc={settingsIcon}
                        name={item.author}
                        starActive={item.active}
                        uniqueId={item.uniqueId}
                    />
                    {item.content ? 
                        <>
                            <p className="message-text">{item.content}</p>
                            <button className="message-further">Далее</button> 
                        </> : <div className="message-text__empty-content"></div>
                    }
                    {item.attachments.length ?
                        <div className="message-media">
                            {item.attachments.map((item, index) =>
                                <MessageMediaItem media={item} key={`${item}_${index}`} />
                            )}
                        </div>
                        : ""
                    }
                </div>
            </div>
            <div className="message-additional">
                <MessageAdditionalItem text="Новое" type="active" />
                <MessageAdditionalItem text="Эксперт" />
            </div>
        </div>
    )
}

export default Message;