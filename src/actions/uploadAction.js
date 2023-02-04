
import * as UploadApi from "../api/UploadRequest"



export const uploadImage=(data)=>async(dispatch)=>{
    try {
      const checi=  await UploadApi.uploadImage(data)
      //console.log(checi,"inamge daaaaaaaata")
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost=(data)=>async(dispatch)=>{
   // console.log(data,'dataaaaa');
    dispatch({type:"UPLOAD_START"})
    try {
        const newPost= await UploadApi.uploadPost(data)
       console.log(newPost,"dataaaaaaaaaaaaas")
    //    if (newPost.data.image){

    //    }
     
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type:"UPLOAD_FAIL"})
    }
}