import React from 'react'
import Postshare from '../postShare/Postshare'
import Post from '../posts/Post'
import './Postside.css'

const Postside = () => {
  return (
    <div className='Postside'>
      <Postshare/>
      <Post/>
    </div>
  )
}

export default Postside
