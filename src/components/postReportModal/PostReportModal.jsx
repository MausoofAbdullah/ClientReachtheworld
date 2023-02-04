import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react'
import { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { reportPost } from '../../actions/postAction';
import axios from 'axios';


const PostDeleteModal = ({modalOpen,setModalOpen,postId,currentUser}) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const reporterId=useSelector((state)=>state.authReducer.authData)
    const [reason,setReason]=useState("")
    // const handleReport = (e)=>{
    //     e.preventDefault()
    //     dispatch(reportPost(id,currentUser))
    //     console.log(currentUser,id,'reporttmodal.jsx')
    // }
    // const handleSubmit = (e)=>{
    //     e.preventDefault()
    //     dispatch(reportPost(id,currentUser))
    //     console.log(currentUser,id,'reporttmodal.jsx')
    // }
    const handleChange = e => {
      const target = e.target;
      if (target.checked) {
        setReason(target.value);
      }
    };

    const Submit=async (e,postId) => {
      e.preventDefault()
      const obj={
        reason,
        reporterId:reporterId.user._id,
      }
      console.log(postId,"postid")
      
      //console.log(obj,"object")
      try{
        const response= await axios.post(`process.env.REACT_API_CALL/post/${postId}/report-post`,obj)
      //  console.log(response,'response');
        
        if(response.status){
         // toast.success("Report Submitted");
         setModalOpen(false);
          //console.log(response,'response');
        }else{
          //toast.error(response.data.message)
          console.log(response,'erro');
        }
      }catch(error){
        console.log(error);
      }
    }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.02}
      overlayBlur={3}
      size='55%'
      opened = {modalOpen}
      onClose = {()=>setModalOpen(false)}
      
    >
      <form onSubmit={(e) =>  (Submit(e,postId)) }>
      <div>
        <label>
          <input type="radio" value="spam" checked={reason == 'spam'} onChange={handleChange} />
          <span>spam</span>
        </label>
        <label>
          <input type="radio" value="inappropriate" checked={reason == 'inappropriate'} onChange={handleChange} />
          <span>inapproprate</span>
        </label>
        <label>
          <input type="radio" value="other" checked={reason == 'other'} onChange={handleChange} />
          <span>other</span>
        </label>
      </div>
    <span style={{display:"flex",flexDirection:"row",gap:"10px"}}>Are you sure you want to report this post? </span>
      <button className='button' type="submit">Submit</button>
    </form>
      {/* <form >
        <div className="radio">
          <label>
            <input
              type="radio"
              value="spam"
              checked=""
              onChange=""
            />
            spam
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="inapproprate"
              checked=""
              onChange=""
            />
            inapproprate
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Other"
              checked=""
              onChange=""
            />
            Other
          </label>
        </div>
        <div>
          Selected option is : ''
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form> */}
    </Modal>
  )
}

export default PostDeleteModal