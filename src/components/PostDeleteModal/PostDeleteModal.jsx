import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/postAction';


const PostDeleteModal = ({modalOpen,setModalOpen,id,currentUser}) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const handleDelete = (e)=>{
        e.preventDefault()
        dispatch(deletePost(id,currentUser))
        console.log(currentUser,'deletmodal.jsx')
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
     <span style={{display:"flex",flexDirection:"row",gap:"10px"}}>Are you sure you want to delete this post? <button className='button' onClick={handleDelete}>Yes</button></span>
    </Modal>
  )
}

export default PostDeleteModal