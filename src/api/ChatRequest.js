import axios from "axios";

const API= axios.create({baseURL:"https://reachtheworld.tech"})

export const userChats=(id)=>API.get(`/chat/${id}`)

export const createChats = (userId,followingId) => API.post('/chat',{senderId:userId,receiverId:followingId})

export const getThisChat = (newUserfromProfileMessageButton,currentUserId) => API.get(`/chat/find/${newUserfromProfileMessageButton}/${currentUserId}`)