import axios from "axios"

const API= axios.create({baseURL:"https://reachtheworld.tech"})
//const API= axios.create({baseURL:process.env.REACT_API_CALL})


// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }
  
//     return req;
//   });
export const uploadImage=(data)=>API.post('/upload',data)
export const uploadPost=(data)=>API.post('/post',data)