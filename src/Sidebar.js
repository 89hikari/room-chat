import React, {useState, useEffect} from 'react'
import "./Sidebar.css"
import ForumIcon from '@material-ui/icons/Forum';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import db, { auth } from './firebase'
import { animateScroll } from 'react-scroll';

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        db.collection("chats").onSnapshot(snapshot =>{
            setChats(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })
            ))
        })
    }, [])

    const addChat = () => {
        const chatName = prompt('Enter a chat name');
        if (chatName) {
            db.collection("chats").add({
                chatName: chatName
            })
        }
    }
    
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__header-avatar"/>
                <div className="sidebar__headerRight">
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Поиск"/>
                </div>
                <IconButton>
                    <AddCircleTwoToneIcon onClick={addChat}/>
                </IconButton>
            </div>
            <div className="sidebar__chats">
                {chats.map(({ id, data: { chatName }}) => (
                    <SidebarChat key={id} id={id} chatName={chatName}/>
                    ))}
            </div>
        </div>
    )
}

export default Sidebar
