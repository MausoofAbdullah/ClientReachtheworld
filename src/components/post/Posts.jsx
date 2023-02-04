import React, { useEffect } from 'react'
import './Posts.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import {   useDispatch, useSelector } from 'react-redux' 
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'
import { getUser } from '../../api/UserRequest'
import InputEmoji from "react-input-emoji"
import deletButton from '../../img/deleteButton.png'
import reportButton from '../../img/file-earmark-excel.svg'
import PostDeleteModal from '../PostDeleteModal/PostDeleteModal.jsx'
//import PostReportModal from "../postReportModal/PostReportModal.jsx"
import ReportPostModal from "../ReportPostModal/ReportPostModal"

import { useRef } from "react";
import { io } from "socket.io-client";


//import Report from "../ReportModal/Report.jsx"

import { format } from "timeago.js"
import DeleteComment from '../DeleteComment/DeleteComment.jsx'
import commentDelete from "../../img/commentDelete.png"
import { addComment } from '../../actions/postAction'


const Posts = ({data}) => {
   //console.log(data,"what is data for time")

 const dispatch=useDispatch()
 const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER

 const {user}=useSelector((state)=>state.authReducer.authData)

  const [liked,setLiked]=useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)
  const [postMan, setPostMan] = useState()
  const [postmanImage,setPostmanImage]=useState()
  const [postUsername,setPostUsername]=useState()

  const [reportPostModalOpen,setReportPostModalOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [commentString, setCommentString] = useState("")

  //fetching user to get username of posts

  useEffect(() => {
    const fetchUser = async () => {
       const postedUser = await getUser(data.userId)
      // console.log(postedUser,"who is he")
       setPostMan(postedUser.data.firstname + " " + postedUser.data.lastname)
       setPostUsername(postedUser.data.username)
       
       setPostmanImage(postedUser.data.profilePicture)
    }
    fetchUser()
 }, [])
 //console.log(postUsername,"whos post is theis")



 //everything about sockets
 const socket = useRef();


 useEffect(()=>{
   socket.current = io("http://localhost:8800")

 },[])
 useEffect(()=>{
   socket?.current.emit("newUser",user.username)
 },[socket,user.username])

  //everything about comments

  // const [showComment, setShowComment] = useState(false)
  // const [comment, setComment] = useState('')
  // let newComment = data.comments

  const handleLike=()=>{
    likePost(data._id,user._id)
    setLiked((prev)=>!prev)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
 
  }
  const handleNotification=()=>{
      //all about notifications and socket i
      socket.current.emit("sendNotification",{
         senderName:user.username,
         receiverName:postUsername
       })
  }

  const handleCommentBox = () => {
    setOpen((prev) => !prev)
 }

 const handleCommentChange = (commentString) => {
    setCommentString(commentString)

 }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
       comment: commentString,
       commentedUser: user.firstname + ' ' + user.lastname,
       time: Date(),
       user:user._id
    }

    dispatch(addComment(data._id, comment))
    setOpen(false)

 }

 const reportPostFn =()=>{
   setReportPostModalOpen(true)
}
  return (
    <div className='Posts'>
<div  className='postmanImage'>
<img src={process.env.REACT_APP_PUBLIC_FOLDER+postmanImage}   />
<b><h3 style={{color:"firebrick"}}>{postMan} </h3></b> </div>
  <img  src={data.image?process.env.REACT_APP_PUBLIC_FOLDER+data.image:""} alt="" className='' /> 
  <div className="detail">
     

     <div> <span> {data.desc}</span></div>
     <div> <span> {format(data.createdAt)}</span></div>
    </div>
      

      <div className="postsReact">
        <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} className="" onClick={()=>{handleLike(); handleNotification()}} />
        <img src={Comment}  onClick={handleCommentBox} alt=""  className="" />
        <img src={Share} alt="" className="" />
        
        {/* {data.userId === user._id &&
               <>
                  <img src={deletButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>
            } */}
             {data.userId === user._id ?
               <>
                  <img src={deletButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>:
               <>
                {/* <img src={reportButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" /> */}
                <img src={reportButton}  onClick={reportPostFn}  style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                {/* <img src={reportPost} alt="" onClick={reportPostFn} style={{width:"15px",cursor:"pointer"}} /> */}
                  {/* <PostReportModal modalOpen={modalOpen} setModalOpen={setModalOpen} postId={data._id} currentUser={user._id} /> */}
                  {
            <ReportPostModal reportPostModalOpen={reportPostModalOpen} setReportPostModalOpen={setReportPostModalOpen} userId={user._id} postId={data._id}/>
         }
               </>
            }
      </div>
      <span style={{color:"var(--gray)",fontsize:'12px'}}>{likes} likes</span>
     
      {open &&
            data.comments?.map((com) => {

               return (
                  <div className="commentDiv">
                     <span><b>{com.commentedUser}</b></span>

                     <span> {com.comment}</span>
                     {com.user===user._id  ?
                     <>
                     <img src={commentDelete} style={{width:"20px",height:"20px",marginLeft:"20px",cursor:"pointer"}}  onClick={()=>setShowModal((prev)=>!prev)} alt="" />
                     
                     <DeleteComment showModal={showModal} setShowModal={setShowModal} postId={data._id} commentId={com._id}  />
                     </>:""
                     }
                     <div>
                        <span style={{paddingRight:"10px"}}>{format(com.time)}</span>
                     </div>
                        
                  </div>
               )
            })
         }

         {open &&
            <div className='addComment' >
               {/* <span><b>username</b></span> */}
            
               <InputEmoji className="InpEmo" value={commentString} onChange={handleCommentChange} />
               {commentString?  <button className="button commentBtn" onClick={handleSubmit}>comment</button>:""}
             
            </div>
         }

    </div>
  )
}

export default Posts
