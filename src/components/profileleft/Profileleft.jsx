import React from 'react'
import Followerscard from '../followersCard/Followerscard'
import Infocard from '../infocard/Infocard'
import Logosearch from '../logoSearch/Logosearch'
import "./Profileleft.css"
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Profileleft = () => {

  const {user} = useSelector((state)=>state.authReducer.authData)
  const params = useParams()
  return (


    <div className='Profileside' >
      <Logosearch place="homeside"/>
      <Infocard/>
      { params.id !== user._id &&
        <span>
        <Link style={{textDecoration:"none", color : "inherit"}} to={`/profile/${user._id}`} >
        Go to your Profile
        </Link>
      
    </span>
    }
      <Followerscard/>
    </div>
  )
}

export default Profileleft
