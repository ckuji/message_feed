import React, { useState } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { setMessageFavorites } from "../store/slices/messagesSlice";
import { useDispatch } from "react-redux";
import Btn from "./Btn";

type MessageHeaderProps = {
    enterIconSrc: string,
    hideIconSrc: string,
    settingsIconSrc: string,
    name: string,
    starActive: boolean | undefined,
    uniqueId: string | number
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
    enterIconSrc, hideIconSrc, settingsIconSrc, name, starActive, uniqueId
}) => {
    const dispatch = useDispatch();
    const setStarActiveHandler = () => {
        dispatch(setMessageFavorites(uniqueId))
    }

    return (
        <div className="message-header">
            <div className="message-header__user">
                <div className="message-header__user-name">{name}</div>
                <div className="message-header__user-text">Текст поста в соц. сетях если это комментарий</div>
            </div>
            <div className="message-header__buttons">
                <div className="message-buttons__sides">
                    <Btn text="Левый" style="message-buttons__sides_btn" />
                    <Btn text="Центр" style="message-buttons__sides_btn" />
                    <Btn text="Правый" style="message-buttons__sides_btn" />
                </div>
                <div className="message-buttons__icons">
                    <div className="message-buttons__icons-item">
                        <img src={enterIconSrc} alt="" />
                    </div>
                    <div className="message-buttons__icons-item">
                        <img src={hideIconSrc} alt="" />    
                    </div>
                    <div className="message-buttons__icons-item">
                        <img src={settingsIconSrc} alt="" />
                    </div>
                    <div
                        className="message-buttons__icons-item"
                        onClick={setStarActiveHandler}
                    >
                        {!starActive ?
                            <StarBorderIcon
                                className="message-star"
                                sx={{fontSize: '29px'}}
                                htmlColor="#CDCDCD"
                            /> :
                            <StarIcon
                                className="message-star"
                                sx={{fontSize: '29px'}}
                                htmlColor="#0088EE"
                            />

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageHeader;