import React from "react";
import ProfileImg from "../../img/profileImg.jpg";
import "./Postshare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import toast from 'react-hot-toast'

const Postshare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
 
  const imageRef = useRef();
  const [inputValue,setInputValue]=useState('')
  const [msssg,setMsssg]=useState("")
 
  const dispatch = useDispatch();

  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic="http://localhost:5000/images/"

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const reader = new FileReader();
      if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)){
        setMsssg("only .png, .jpg, .jpeg format allowed!*")
      setTimeout(()=>{
        setMsssg('')
      },3000) 
      }
      
      else{    setImage(img);}
  
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
    setInputValue('')
  };
  const handleSubmit = (e) => {
    document.getElementById('postInput').placeholder='Select Image or Type Somthing*'
    // setViewMsg(true)
    setTimeout(()=>{
      // setViewMsg('')
      document.getElementById('postInput').placeholder='whats happening?'
    },3000)
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(image){
      console.log(image,"what is image  name");
    }
    
    if (image) {
      
      
      const data = new FormData();
      const filename = Date.now() + image.name;
      // const reader = new FileReader();
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)){
      //   setMsssg("enter valid file")
      // }
      console.log(filename, "fiind");

      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
       console.log(newPost,'fileeeee');
      console.log(data, "yes");
      try {
        dispatch(uploadImage(data));
      
        
        dispatch(uploadPost(newPost));
      } catch (error) {
        console.log(error);
      }
    }else if(inputValue){

      dispatch(uploadPost(newPost));

    }else if(inputValue == ''){
     
    }
    reset();
  };
  return (
    <div className="Postshare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.jpeg"
        }
        alt=""
      />
      <div className="post-container">
      {/* {viewMsg ? <p className="errorMsg">Select Image or Type Somthing*</p> : null} */}
        <input id="postInput" ref={desc}  type="text" placeholder="whats happening?" onChange={(e)=> setInputValue(e.target.value)}/>
        {msssg && <p style={{color:"red", fontWeight: 'bold'}}>{msssg}</p>}
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            {/* <UilPlayCircle />
            video */}
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            {/* <UilLocationPoint />
            Location */}
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            {/* <UilSchedule />
            Schedule */}
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="priewImage">
            <UilTimes
              onClick={() => {
                setImage(null);
              }}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Postshare;
