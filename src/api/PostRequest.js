import axios from "axios"

// const API= axios.create({baseURL:"https://reachtheworld.tech"})
const API= axios.create({baseURL:process.env.REACT_API_CALL})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const getTimelinePosts=(id)=> API.get(`/post/${id}/timeline`)
export const likePost=(id,userId)=>API.put(`post/${id}/like`,{userId: userId})

export const addComment = (id,comment) => API.put(`/post/${id}/comment-post`,comment)
export const deleteComment =(id,commentId) => API.post(`/post/${id}/deleteComment`,{commentId:commentId})

export const deletePost = (id,currentUser) => API.post(`/post/${id}/post-delete`,{currentUser:currentUser})
//export const reportPost = (id,currentUser) => API.post(`/post/${id}/post-report`,{currentUser:currentUser})
export const ReportPost = (reportData,postId) => API.post(`/post/reportpost/${postId}`,reportData)
export const getReportedPosts = () => API.post(`/admin/getreportedposts`)
export const reportedPostRemove =(postId) => API.post(`/admin/reportedpostremove/${postId}`)


