import React, { useState } from 'react'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import './Rightside.css'
import Trendcard from '../trendcard/Trendcard'
import Sharemodal from '../sharemodal/Sharemodal'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client";
import { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useRef } from "react";



const Rightside = () => {
 // const [socket,setSocket]=useState(null)
 const [notifications,setNotifications]=useState([])
  const { user } = useSelector((state) => state.authReducer.authData);
  const [open,setOpen]=useState(false)
 // console.log(user,"user in righht side")
  const socket = useRef();
console.log("anyting")
console.log(socket,"what is sicket")

  useEffect(()=>{
    socket.current = io("http://localhost:8800")

  },[])

  useEffect(()=>{
    console.log("daaaaaaaaaaaaaaaaaata")
    socket?.current.on("getNotification",(data)=>{
      
      // setNotifications((prev)=>[...prev,data])
    })
  },[socket])

  console.log(notifications,"notifications bannra")
  const displayNotifications=(senderName)=>{
    return (
      // <span className='notification'>{`${senderName} liked your post`}</span>
      <span className='notification'><h1>jfdjfdfdkfjdfkj</h1></span>
    )
  }
  // useEffect(()=>{
  //   socket.current.emit("newUser",user.username)
  // },[socket,user.username])
  
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className='Rightside'>
        <div className="navIcons" onClick={()=>setOpen(!open)}>
           <Link to="../home">
            <img src={Home} alt="" className="" />
           </Link>
            <UilSetting/>
            

            <p className='counter'>2</p>
           <img src={Noti} alt="" className="" />

            {open &&(
            <div className="notifications">{notifications.map((n)=>{
              displayNotifications(n)
            })}</div>
            )}
            
            <Link to="../chat">

            <img src={Comment} alt="" className="" />
            </Link>
        </div>
        <Trendcard/>
        <button className='button r-button'  onClick={() => {
              setModalOpened(true);
            }}
          >
            share
        </button>
          <Sharemodal modalOpened={modalOpened}
          setModalOpened={setModalOpened} />
    </div>
  )
}

export default Rightside
