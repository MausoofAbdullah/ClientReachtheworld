import React from "react";
import "./Infocard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import Profilemodal from "../profilemodal/Profilemodal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from '../../img/comment.png'
import { useEffect } from "react";
import * as UserApi from "../../api/UserRequest.js"
import { logout } from "../../actions/AuthAction";

const Infocard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch=useDispatch()
  const params=useParams()

  const profileUserId=params.id
  

  const navigate = useNavigate()
  // const [profileUser,setProfileUser]=useState({})
  const profileUser = useSelector((state)=>state.userReducer.userData)

  const{user}=useSelector((state)=>state.authReducer.authData)

  const goToChat = (e) =>{
    e.preventDefault()
    navigate('/chat',
        {state:{data:profileUser}}
     )
    console.log('inside goto chat in infocard')
}


  // useEffect(()=>{
  //   const fetchProfileUser=async()=>{
  //     if(profileUserId===user._id)
  //     {
  //       setProfileUser(user)
       
  //     }else{
  //       const profileUser=await UserApi.getUser(profileUserId)
  //       setProfileUser(profileUser)
        
      
  //     }
  //   }
  //   fetchProfileUser()
  // },[user])

  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <div className="Infocard">
      <div className="infoHead">
        <h1>Profile Info</h1>
        {user._id===params.id?( <div>
          <UilPen
            width="2rem"
            height="1rem"
            onClick={() => {
              setModalOpened(true);
            }}
          />
          <Profilemodal modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user} />
        </div>):(
                <img onClick={(e)=>goToChat(e)} src={Comment} alt="" />
            )}
       
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      {params.id === user._id &&
      <button className="button logout-button" onClick={handleLogout}>logout</button>}
    </div>
  );
};

export default Infocard;
