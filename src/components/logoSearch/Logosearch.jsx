import React, { useState,useEffect } from 'react'
import Logo from '../../img/logonew.png'
import {UilSearch} from "@iconscout/react-unicons"
import "./Logosearch.css"
//import Search from "../Search/Search";
import { getUserData } from '../../api/UserRequest'
import { Link } from 'react-router-dom'
import { getUser } from '../../actions/userAction'
import { useDispatch } from 'react-redux'

const Logosearch = ({setNewUser,place}) => {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch()


    
  const setUser = (person)=>{
    dispatch(getUser(person._id))
    
  }


  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getUserData(query);  
      console.log(data,'kitti')
      setData(data);
    };
    if ( query.length >=1) fetchData();
    
  }, [query]);
  //const [searchKey, setSearchKey] = useState("");
  return (
    <div className='Logosearch dropdown'>
      <img src={Logo} alt="" />
      <div className="Search">
        <input type="text" placeholder='#search'
       
        onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        <div className="S-icon">
            {/* <UilSearch/> */}
        </div>
        {/* {searchKey.trim().length > 0 && <Search searchKey={searchKey} />} */}
      </div>
      <div class="dropdown-content">
      {
      place === "chatPage" ?data.map((person)=>(
        <>
      <p onClick={()=>setNewUser(person)} style={{cursor:"pointer"}}>{person.firstname}</p>
      <hr />
      </>
      )):
        
      data.map((person)=>(
        <>
      <Link key={person._id} onClick={()=>setUser(person)} style={{textDecoration:"none", color : "inherit"}} to={`/profile/${person._id}`}>
                {person.firstname}
                </Link>
      <hr />
      </>
      )) 

      }
    
    
  </div>
    </div>
  )
}

export default Logosearch
