import React, { useState } from 'react'
import { useEffect } from 'react'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button'
import "./UserList.css"
import { adminGettingUser,adminBlockUser,adminUnBlockUser} from '../../../api/AdminRequest.js'

const UserList = () => {


    const [user,setUser]=useState([])
    
    useEffect(()=>{
        const fetchUsersList=async()=>{
            const  userData =await adminGettingUser()
            console.log(userData,"new users")
           // console.log(user.formattedFriends,"userlist")
          if(userData.status===200){

            setUser(userData.data.users)
          }else{
            alert('something went wrong')
          }

            
            
        }
        fetchUsersList()
    },[])
  console.log(user,"fetchuser")
  //const activeUser=user.map((active)=>{return active.Active})
 //console.log(activeUser,"active userlist")
  //const blockedUser=blockUser()
  const blockUser=async(userId)=>{
    const blockedUser=await adminBlockUser(userId)
    console.log(blockUser,"1");
    if (blockedUser.data.blockstatus === true){
      setUser((user) => {
        user.map((val) => {
          if (val._id === userId) {
            return { ...val, Active: false }
          }
          return val
        })
      })
    }
    console.log(blockedUser,"blockeduser")
    // if(blockedUser.data.success){
    //   console.log("user blocked")
    // }
        
  }
    
  const unBlockUser=async(userId)=>{
   const unblockedUser= await adminUnBlockUser(userId)
    console.log(unblockedUser,"unblockUser")
    if (unblockedUser.data.blockstatus === false){
      setUser((user) => {
        user.map((val) => {
          if (val._id === userId) {
            return { ...val, Active: true }
          }
          return val
        })
      })
    }
  }

  


  return (
    <React.Fragment>
      <div className="userTable-main">
        <div className="usersList">
            <Table striped bordered hover >
            <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th></th>
                        <th></th> 
                        <th></th> 

                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    { user?.map((obj,index,id)=>{
                      if(!obj.isAdmin){
                        return (

                <tr key={id} >
                                <td>{index+1}</td>
                                <td></td>
                                <td>{obj.firstname}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{obj.username}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> {obj.Active?'Active':'Blocked'}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <button onClick={obj.Active?(()=>{
                                    if (window.confirm("Do you want to block this user?"))
                                   { blockUser(obj._id)}
                                  }):(()=>{
                                    if (window.confirm("Do you want to unblock this user?"))
                                   { unBlockUser(obj._id)}
                                  })} className={obj.Active? "commentButton" : "unblockbutton" }>{obj.Active?"Block":"Unblock"}</button>
                                  {/* <button className={obj.Active? "null" : "unblockbutton" }>Unblock</button> */}

                            </tr>
                        )}
                    })}
                </tbody>
            </Table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserList
