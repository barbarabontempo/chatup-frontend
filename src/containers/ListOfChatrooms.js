import React from "react";
import Chatrooms from "../components/Chatrooms";

export default function ListOfChatrooms(props) {
  let handleIncomingChats = () => {
    return props.chats.map((chat) => (
      <Chatrooms
        key={chat.id}
        renderChatroom={props.renderChatroom}
        chatObj={chat}
        removeChatroom = {props.removeChatroom}
      />
    ));
  };

  return (
    <div className="chatroom-list column">
      <h1>CHATROOMS AVAILABLE</h1>
      {handleIncomingChats()}
    </div>
  );
}
