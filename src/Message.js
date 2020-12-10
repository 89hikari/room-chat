import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import {useSelector} from 'react-redux'
import { selectUser } from './features/counter/userSlice'
import './Message.css'

const Message = forwardRef(( { id, contents: { timestamp, displayName, email, message, photo, uid } }, ref) => {
    const user = useSelector(selectUser);

    return (
        <div id="message" className={`message ${user.email === email && "message__sender"}`}>
            <Avatar src={photo} className="message__photo"/>
            <p>{message} <small>{new Date(timestamp?.toDate()).toLocaleString()}</small> </p>
        </div>
    )
})

export default Message
