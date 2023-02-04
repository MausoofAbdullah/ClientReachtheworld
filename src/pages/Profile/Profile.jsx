import React from 'react'
import Postside from '../../components/postSide/Postside'
import Profilecard from '../../components/profileCard/Profilecard'
import Profileleft from '../../components/profileleft/Profileleft'
import Rightside from '../../components/right/Rightside'
import { getUser } from '../../actions/userAction'
import "./Profile.css"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {user} = useSelector((state)=>state.authReducer.authData)
  const person = useSelector((state)=>state.userReducer.userData)

  const params = useParams()
  const id = params.id
  return (
    <div className='Profile'>
      <Profileleft />
      <div className="profile-center">
        <Profilecard location="profilePage"  person = {id===user._id?user:person}/>
        <Postside/>
      </div>
        <div>
        <Rightside/>
        </div>
    </div>
  )
}

export default Profile
