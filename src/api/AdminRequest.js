import axios from 'axios';

const API=axios.create({baseURL: "https://reachtheworld.tech"})

export const adminGettingUser=()=>API.get("/admin/user-list")
export const adminBlockUser=(userId)=>API.post("/admin/block-user",{userId:userId})
export const adminUnBlockUser=(userId)=>API.post("/admin/unblock-user",{userId:userId})

export const getReport =()=>API.get("/admin/reports")
//export const removePost=(postid)=>API.delete("/admin/remove-post",postid)
export const deletePost = (id,currentUser) => API.post(`/post/${id}/post-delete`,{currentUser:currentUser})

