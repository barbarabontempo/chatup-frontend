import React, { Component } from 'react'
import Chatroom from "../components/Chatroom";


export class ChatroomPage extends Component {
    render() {
        return (
            <div className="chatroom-page">
                <h1>CHATROOM PAGE</h1>
                <Chatroom />
            </div>
        )
    }
}

export default ChatroomPage