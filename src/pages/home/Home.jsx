import "./Home.css"
import React from 'react'
import Profileside from "../../components/profileSide/Profileside"
import Postside from "../../components/postSide/Postside"
import Rightside from "../../components/right/Rightside"

const Home = () => {
  return (
    <div className="Home">
    <Profileside/> 
      <Postside/>
      <Rightside/>
    </div>
  )
}

export default Home
