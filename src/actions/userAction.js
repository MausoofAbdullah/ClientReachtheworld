import * as UserApi from "../api/UserRequest"

export const updateUser=(id,formData)=>async(dispatch)=>{
    dispatch({type:"UPDATING_START"})
    
    try {
        const {data}=await UserApi.updateUser(id,formData)
        dispatch({type:"UPDATING_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"UPLOADING_FAIL"})
    }
}

export const followUser=(id,data)=>async(dispatch)=>{
    dispatch({type:"FOLLOW_USER"})
    UserApi.followUser(id,data)

}
export const unfollowUser=(id,data)=>async(dispatch)=>{
    dispatch({type:"UNFOLLOW_USER"})
    UserApi.unfollowUser(id,data)

}

export const getUser = (id) => async(dispatch)=>{
    dispatch({type:"FETCH_USER_DETAILS"})
     
     try {
        const {data} = await UserApi.getUser(id)
        
        dispatch({type:"USER_DETAILS_FETCHED",data:data})
    } catch (error) {
         dispatch({type:"USER_DETAILS_FETCHING_FAIL"})
        
     }
}