import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { followUser, getUser, unfollowUser } from '../../actions/userAction'
import { getAllUser } from '../../api/UserRequest'
import blueTick from '../../img/patch-check-fill.svg'
import {MdVerifiedUser} from 'react-icons'


const User = ({person,followercount}) => {
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.authReducer.authData)
    // console.log(user,"what is there in user")
    // console.log(user.followers.length,"how many")
    const [following,setFollowing]=useState(person.followers.includes(user._id))
//   const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
const serverPublic="http://localhost:5000/images/"
  const handleFollow=()=>{
        following?
        dispatch(unfollowUser(person._id,user)):
        dispatch(followUser(person._id,user))
        setFollowing((prev)=>!prev)
  }
  
  
  const setUser = ()=>{
    dispatch(getUser(person._id))
    
  }
  return (
    
      <div className='follower'>
                <div>
                    <img src={serverPublic + person.profilePicture?serverPublic+person.profilePicture:serverPublic+"defaultProfile.jpeg"} alt="" className="Followerimg" />
                    <div className="name">
                <Link onClick={setUser} style={{textDecoration:"none", color : "inherit"}} to={`/profile/${person._id}`}>
               <div style={{display:"flex", justifyContent:"space-between"}}>{person.firstname}
                {followercount>=2 && <img src={blueTick}  style={{ width: "18px", height: "18px", display: "flex",marginLeft:"4px", color:"red" }} alt="" />}
                {/* {followercount>=2 && <MdVerifiedUser/>} */}
                </div>
                </Link>
                        <span>{person.username.split("@",1)}</span>
                    </div>
                    
                    
                </div>
                <button className={following? "button fc-button unfollowButton" : 'button fc-button'} onClick={handleFollow}>
                    {following?"unfollow":"Follow"}
                </button>
            </div>
    
  )
}

export default User
