import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/postAction';


const DeleteComment = ({showModal,setShowModal,postId,commentId}) => {
    const dispatch = useDispatch()
    const theme = useMantineTheme();
    const handleCommentDelete =(e)=>{
      e.preventDefault()
      dispatch(deleteComment(postId,commentId))
      setShowModal(false)
    }
  return (
    <Modal
    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.01}
    // overlayBlur={0.0}
    size='20%'
    opened = {showModal}
    onClose = {()=>setShowModal(false)}
    
  >
   <span style={{display:"flex",flexDirection:"row",gap:"10px"}}>Delete Comment? <button className='button' onClick={handleCommentDelete}>Yes</button></span>
  </Modal>
  )
}

export default DeleteComment