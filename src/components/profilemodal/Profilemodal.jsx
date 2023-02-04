import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//import { uploadImage } from "../../actions/uploadAction";
import { uploadImage } from "../../api/UploadRequest";
import { updateUser,getUser } from "../../actions/userAction";


function Profilemodal({ modalOpened, setModalOpened,data }) {
  const theme = useMantineTheme();
  const {password,...other}=data
  const [formData,setFormData]=useState(other)
  const [profilePicture,setProfilePicture] = useState(null)
  const [coverPicture, setCoverPicture] = useState(null)
  const dispatch=useDispatch()
  const param=useParams()
  const {user}=useSelector((state)=>state.authReducer.authData)

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
      let img=event.target.files[0]
      event.target.name === "profilePicture" ? setProfilePicture(img) : setCoverPicture(img);
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let UserData=formData
    if(profilePicture){
      const data=new FormData()
      const fileName=Date.now()+profilePicture.name
      data.append("name",fileName)
      data.append("file",profilePicture)
      UserData.profilePicture=fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if(coverPicture){
      const data=new FormData()
      const fileName=Date.now()+coverPicture.name
      data.append("name",fileName)
      data.append("file",coverPicture)
      UserData.coverPicture=fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id,UserData))
    console.log(UserData,"check")
    
    setModalOpened(false)
    dispatch(getUser(user._id))
  }


  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form action="" className="infoForm">
        <h3>Your info</h3>
        <div>
          <input type="text" className="infoInput"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstname}

           />
          <input type="text" className="infoInput"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastname}
           />
        </div>
        <div>
        <input type="text" className="infoInput"
          name="worksAt"
          placeholder="Works at"
          onChange={handleChange}
          value={formData.worksAt}
           />
        </div>
        <div>
        <input type="text" className="infoInput"
          name="livesin"
          placeholder="Lives In"
          onChange={handleChange}
          value={formData.livesin}
           />
             <input type="text" className="infoInput"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={formData.country}
           />
        </div>
        <div>
        <input type="text" className="infoInput"
          name="relationship"
          placeholder="Relationship Status"
          onChange={handleChange}
          value={formData.relationship}
           />
        </div>
        <div>
            Profile Image
            <input type="file" name="profilePicture" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverPicture" onChange={onImageChange}/>

        </div>
        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default Profilemodal;
