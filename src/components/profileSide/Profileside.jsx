import React from 'react'
import { useSelector } from 'react-redux'
import Followerscard from '../followersCard/Followerscard'
import Logosearch from '../logoSearch/Logosearch'
import Profilecard from '../profileCard/Profilecard'
import "./Profileside.css"

const Profileside = () => {
//  const {user} = useSelector((state)=>state.authReducer.authData)
  return (
    <div className='Profileside'>
      <Logosearch/>
      <Profilecard location="homepage" />
      <Followerscard/>
    </div>
  )
}

export default Profileside
