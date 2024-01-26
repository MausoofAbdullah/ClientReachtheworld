import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Link, useLocation } from 'react-router-dom'
import { createChats, getThisChat,userChats } from '../../api/ChatRequest'
import Conversation from "../../components/conversation/Conversation";
import Logosearch from "../../components/logoSearch/Logosearch";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";

import "./Chat.css";
import ChatBox from "../../components/chatBox/ChatBox";
import NavIcons from "../../components/navIcons/NavIcons";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const location = useLocation()
  const newUserfromProfileMessageButton = location?.state?.data
  console.log(newUserfromProfileMessageButton,'checking weathre it is coming')

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newUser,setNewUser] = useState(null)
  const [messages, setMessages] = useState([]);
  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [changeChat,setChangeChat] = useState(false) 
  const socket = useRef();

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  },[sendMessage]);

  
  useEffect(() => {
      socket.current = io(process.env.REACT_APP_SOCKETURL);
     // socket.current = io("https://socket.reachtheworld.tech");
      console.log("conne")
      socket.current.emit("new-user-add", user._id);
      socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
    }, []);

    useEffect(()=>{
      const createCht=async()=>{
      if(newUser !== null && user._id !== newUser._id){
        await createChats(user._id,newUser._id)
        
        
      }
      }
      createCht()
  },[newUser])

    
    //recieve message from the socket server
    useEffect(() => {
      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
        // setMessages([...messages, data]);
      });
    }, []);
    // useEffect(() => {
    //   setMessages(messages.sort((a, b) => a.timestamp - b.timestamp));
    // }, [messages]);
    
    
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
       
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user,newUserfromProfileMessageButton,newUser,changeChat]);

  //   create new chat when clicked message from profile page of another user
  useEffect(()=>{
    const changeNewUser = async() =>{
     setNewUser(newUserfromProfileMessageButton)
     console.log(newUserfromProfileMessageButton,'hai from changenew user chat.jsx')
     const setThisAscurrentChat = await getThisChat(newUserfromProfileMessageButton._id,user._id)
     setCurrentChat(setThisAscurrentChat.data)
     if(setThisAscurrentChat){setChangeChat(true)}
     console.log(setThisAscurrentChat,'from chat.jsx setthisas current chat');
    }
    changeNewUser() 
 },[newUserfromProfileMessageButton,chats])

  const checkOnlineStatus=(chat)=>{
   
    const chatMember=chat.members.find((member)=>member!==user._id);
    const online= onlineUsers.find((user)=>user.userId===chatMember)
    return online?true:false;
  }
  return (
    <div className="Chat">
      {/* leftsids chat */}
      <div className="Left-side-chat">
        <Logosearch setNewUser={setNewUser} place="chatPage" />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat,i) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* rightside chats */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
           <Link to="../home">
            <img src={Home} alt="" className="" />
           </Link>
            <UilSetting/>
            <img src={Noti}     alt="" className="" />
            <Link to="../chat">

            <img src={Comment} alt="" className="" />
            </Link>
        </div>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
