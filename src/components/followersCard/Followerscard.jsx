import React, { useState } from 'react'
import './Followerscard.css'
// import { Followers } from '../../data/Followersdata'
import User from '../user/User'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'
import Pagination from '../pagination/Pagination'

import "./../../App.css"
const Followerscard = () => {
  const [persons,setPersons]=useState([])
  const {user}=useSelector((state)=>state.authReducer.authData)

  //for pagination
  const [currentPage,setCurrentPage]=useState(1)
  const [personPerPage,setPersonPage]=useState(5)

  useEffect(()=>{
    const fetchPersons=async()=>{
      const {data}=await getAllUser()
      setPersons(data)
      console.log(data,"friends")
    }
    fetchPersons()
  },[])

  //for pagination
  const indexOfLastPerson=currentPage*personPerPage
  const indexOfFirstPerson=indexOfLastPerson-personPerPage
  const currentPersons=persons.slice(indexOfFirstPerson,indexOfLastPerson)

  //change page
  const paginate=(pageNumber)=>setCurrentPage(pageNumber)
  return (
    <div className='Followerscard' >
      <h3>People you may know</h3>
      {currentPersons.map((person,id)=>{
        console.log(person,"person inside object")
        if(person._id !==user._id && !person.isAdmin){
          
          return(
            
              <User person={person} followercount={person.followers.length} key={id}/>
           
              
          )
        }
      })}
         <Pagination personPerPage={personPerPage} totalPersons={persons.length} paginate={paginate} />
    </div>
  )
}

export default Followerscard
