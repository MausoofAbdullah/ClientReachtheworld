import React, { useState } from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import ReportedList from '../../../components/Admin/reporterlist/ReportedList'
import ReportedPosts from '../../../components/ReportedPosts/ReportedPosts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'




import { getReportedPosts } from '../../../actions/postAction'



const ReportList = () => {
  const dispatch = useDispatch()


  const [allReportedPosts,setAllReportedPosts] = useState([])
  const [reportedPostsUseEffect,setReportedPostsUseEffect] = useState(false)


  useEffect(()=>{
    const fetchPostData = async() =>{
      console.log("vilicho");
      const posts = await dispatch(getReportedPosts()) 
      console.log(posts,'maindash fetchpostdata');
      setAllReportedPosts(posts.data)
      console.log(allReportedPosts,'maindash fetchpostdata thanne');
    }
    fetchPostData()
    
  },[reportedPostsUseEffect])

  return (
    <div>
      <Navbar />
      <div className='adminUser-main'>
        <div className='adminUser-sidebar'>
          <Sidebar />
        </div>
        {/* <div className='adminhome-graph'>
          <ReportedList />
        </div> */}
        <div>
        <ReportedPosts allReportedPosts={allReportedPosts} setReportedPostsUseEffect={setReportedPostsUseEffect} />
        </div>
      </div>
    </div>
  )
}

export default ReportList