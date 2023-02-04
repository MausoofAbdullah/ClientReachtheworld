import React from 'react'
// import { Postdata } from '../../data/Postdata'
import Posts from '../post/Posts'
import './Post.css'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const Post = () => {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.authReducer.authData)
  let {posts,loading}=useSelector((state)=>state.postReducer)
  posts = posts.filter((post)=>post.removed===false)

  const params=useParams()
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])

 // console.log(params,"params")

  if(!posts) return "no posts"
  if(params.id) posts=posts.filter((post)=>post.userId===params.id)
  
  return (
    
    <div className='Post'>
      {loading?"Fetching Posts...":posts.map((post,id)=>{
       // console.log(post,id,"ahat is i n id")
        return <Posts data={post} id={id} />
      })}
    </div>
  )
}

export default Post
