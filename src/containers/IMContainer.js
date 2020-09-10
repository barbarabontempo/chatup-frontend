import React from "react";
import axios from "axios";
import ListOfChatrooms from "./ListOfChatrooms";
import ChatroomPage from "./ChatroomPage";
import NewChatroomForm from "../components/NewChatroomForm";
import { Button, Modal } from "semantic-ui-react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import consumer from '../cable'

consumer.subscriptions.create({
  channel: "UsersChatroomsChannel",
  // chatroom_id: 18,
  user_id: 7
},{
  connected: () => console.log("IMCON connected"),
  received: (data) => console.log("recieved line 18", data),
  disconnected: () => console.log("IM CON disconnected")
}
)

export default class Imcontainer extends React.Component {
  state = {
    chatrooms: [],
    chatroom_id: "",
    currentChatroom: "",
  };

  handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("log out error", error);
      });
  };

  handleAllChats = () => {
    axios.get("http://localhost:3000/chatrooms").then((resp) => {
      this.setState({
        chatrooms: resp.data,
      });
    });
  };

  componentDidMount() {
    this.handleAllChats();
  }

  handleNewChat = (newchat) => {
    this.setState((prevState) => ({
      chatrooms: [...prevState.chatrooms, newchat.data],
    }));
  };

  renderChatroom = (id) => {
    let foundChat = this.state.chatrooms.find((chatroom) => chatroom.id === id);
    this.setState({
      currentChatroom: foundChat,
      chatroom_id: id,
    });
  };

  removeFromChatrooms = (id) => {
    this.setState(prevState => ({
      chatrooms: prevState.chatrooms.filter((room) => room.id !== id)
    })
    )
  }
  

  render() {
    const {name, username, email} = this.props.user
    console.log("object")
    return (
      <>
     
          {/* <div className=""> */}
            <div className="sidebar">
            <div className="profile_info">
              <img src="https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&w=1000&q=80" class="profile_image" alt="child"/>
              <h4> welcome {username}</h4>
                <small><p> {name}</p></small>
            </div>
                
                <div className="sidebar-things"> 

                <a>CodeChisme</a>
              
          <a>Status: {this.props.loggedInStatus}</a>
               
                <a><Modal
                  trigger={<Button>NEW CHATROOM</Button>}
                  header="Create a new chatroom!"
                  content={<NewChatroomForm handleNewChat={this.handleNewChat} />}
                  actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
                  // actions={[{ key: "done", content: "HUH", positive: false }]}
                  /></a>
                <a href="#"><i class="fas fa-sliders-h"></i><span>Settings</span></a>
                <Link to="/">
                  <button onClick={this.handleLogoutClick}>L❤️GOUT </button>
                </Link
                >
              
                  </div>
            </div>
          {/* </div> */}

          <div className="chatroom-list-container">
            <ListOfChatrooms
              renderChatroom={this.renderChatroom}
              chats={this.state.chatrooms}
              removeChatroom = {this.removeFromChatrooms}
            />
          </div>
          <div className="chatroom-page-container">
            <ChatroomPage
              chatroomId={this.state.chatroom_id}
              user={this.props.user}
              currentChatroom={this.state.currentChatroom}
            />
          </div>
       
      </>
    );
  }
}
