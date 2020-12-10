import { Avatar, IconButton } from '@material-ui/core'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import Message from './Message.js'
import "./Chat.css"
import { useSelector} from 'react-redux'
import { selectChatId, selectChatName } from './features/counter/chatSlice'
import db from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/counter/userSlice'
import FlipMove from 'react-flip-move'
import moduleName from 'module'
import { animateScroll } from "react-scroll";
import { scrollToBottom } from 'react-scroll/modules/mixins/animate-scroll';

function Chat() {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId= useSelector(selectChatId)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(chatId) {
            db.collection("chats")
                .doc(chatId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerInfo">
                    <h2>{chatName}</h2>
                </div>
            </div>
            <div id="messages" className="chat__body">
            <script>element.scrollTop = element.scrollHeight</script>
                <FlipMove>
                <p className="chat__messages">
                    {messages.map(({ id, data }) =>(
                        <Message key={id} contents={data} />
                    ))}
                </p>
                </FlipMove>
            </div>
            <div className="chat__input">
                    <form>
                        <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type something"
                        type="text"/>
                        <button onClick={sendMessage}>Send</button>
                    </form>
                </div>
        </div>
    )
}

export default Chat
