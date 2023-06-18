import React, { useEffect, useRef, useState } from "react"
import Message from "../components/Message";
import axios from "axios";
import { BASE_URL } from "../constants";
import { IMessage, IMessageExtended } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addMessages, clearMessages } from "../store/slices/messagesSlice";

const Messages: React.FC = () => {
    const messages = useSelector((state: RootState) => state.messages);
    const sortInOrder = useSelector((state: RootState) => state.sortInOrder);
    const dispatch = useDispatch();
    const messagesRef = useRef(messages);
    messagesRef.current = messages;
    const [messagestoShow, setMessagestoShow] = useState<IMessageExtended[]>([]);

    useEffect(() => {
        if(sortInOrder) {
            setMessagestoShow(messages);
        }
        if(!sortInOrder) {
            let mesagesCopy = [...messages];
            setMessagestoShow(mesagesCopy.reverse());
        }
    }, [sortInOrder, messages])

    let parametersFetchMessages = new FormData();
    parametersFetchMessages.append('actionName', 'MessagesLoad');
    parametersFetchMessages.append('messageId', '0');

    let parametersFetchNewMessages = new FormData();
    const newParametersForNewMessages = (id: string | number) => {
        parametersFetchNewMessages.set('actionName', 'MessagesLoad');
        parametersFetchNewMessages.set('messageId', String(id));
    }

    const setMessagesHandler = (items: IMessageExtended[]) => {
        dispatch(addMessages(items));
        newParametersForNewMessages(items[items.length - 1].id);
    }

    const fetchMessages = async () => {
        let uniqueIdLocal = 0;
        if(messagesRef.current.length) {
            newParametersForNewMessages(messagesRef.current[messagesRef.current.length - 1].id)
            return;
        }

        const fetchData = await axios.post(
            BASE_URL,
            parametersFetchMessages,
            {
                headers: {
                    'Content-Type': `multipart/form-data;`
                }
            }
        )
        if(fetchData.data.Messages?.length) {
            let messagesNew = fetchData.data.Messages.map((item: IMessage) => {
                uniqueIdLocal += 1;
                let newItem = {...item, active: false, uniqueId: uniqueIdLocal};
                return newItem;
            });
            setMessagesHandler(messagesNew);  
        }
    }

    const fetchNewMessages = async () => {
        let uniqueIdLocal = 0;
        if(messagesRef.current.length) {
            uniqueIdLocal = messagesRef.current[messagesRef.current.length - 1].uniqueId;
        }

        const fetchData = await axios.post(
            BASE_URL,
            parametersFetchNewMessages,
            {
                headers: {
                    'Content-Type': `multipart/form-data;`
                }
            }
        )

        if(fetchData.data.Messages?.length) {
            let messagesNew = fetchData.data.Messages.map((item: IMessage) => {
                uniqueIdLocal += 1;
                let newItem = {...item, active: false, uniqueId: uniqueIdLocal};
                return newItem;
            });
            setMessagesHandler([...messagesRef.current, ...messagesNew]);  
        }
    }

    useEffect(() => {
        fetchMessages();
        setInterval(fetchNewMessages, 5000);
    }, []);

    return (
        <div className="messages">
            <div className="container">
                {messagestoShow.length ? messagestoShow.map((item, index) => 
                    <Message item={item} key={`${item.id}_${index}`} />
                ) : ""}
            </div>
        </div>
    )
}

export default Messages;