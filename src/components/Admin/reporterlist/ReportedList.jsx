//import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getReport} from '../../../api/AdminRequest.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PostDeleteModal from '../../PostDeleteModal/PostDeleteModal.jsx'
import commentDelete from "../../../img/commentDelete.png"


const Reporterlist = () => {

  let {posts,loading}=useSelector((state)=>state.postReducer)
  const rPost=posts.map((post)=>{return post})
  console.log(rPost,"lets know")
  const admin=useSelector((state)=>state.authReducer.authData)
 // console.log(admin,"who is the admin ?")
  console.log(admin.user._id, "lets plaly")



  const [modalOpen, setModalOpen] = useState(false)

  // const handleDelete = async (postid) => {
  //   console.log(postid);
  //   let arr=user
  //   console.log(arr,'arrray in admin');
  //   const response= await removePost(postid)
  //   // const response = await axios.delete(
  //   //   'http://localhost:3001/admin/remove-post',{
  //   //     postid

  //   //   }
      
  //   //   );
  //   console.log(response,"response in delete post")
  //    // console.log(user,'post report section')
  //     arr=arr.filter((val)=>val._id !== postid)
  //     console.log(arr,'after deletion ');
  //     setUser(arr)
  //   if (response) {
  //     // setRemove(true);
  //     console.log(response);
  //     // setAnchorEl(null);
  //   }
  //   // console.log(response,'responseresponse');
  // };
    

    const [user,setUser]=useState([])
  
     
    useEffect(()=>{
      async function getReports(){
        const Reports= await getReport()
        // const Reports= await axios.get('http://localhost:3001/admin/reports'
          // withCredentials: true
        // )
        console.log(Reports,"reeeeeports")
        if(Reports?.status===201){
          console.log(Reports.data.reports,'jhgfydfgku');
          setUser( Reports.data.reports)
           console.log(Reports.data.reports,"data .reports");
        }else{
          // alert('error')
        }
      }
      getReports()
    },[])
    



  return (<React.Fragment>
    <div className='userTable-main'>
        <div className="usersList">
            <Table striped bordered hover style={{width:'100%'}}>
                <thead>
                    <tr>
                       
                        <th>PostId</th>
                        <th>ReportCount</th>
                       <th>reportreason</th>
                        
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:'center'}}>

                   {user? user.map((reports,index) => {
                  console.log(reports,'reportsresult');
                      return (
                        
                            <tr >
                              
                                <td>{reports._id}</td>
                                <td>{reports.reports.length}</td>
                                <td>{reports.reports[index]?.reason}</td>
                                {/* <td> <button onClick={()=>handleDelete(reports._id)}>Delete</button></td> */}
                                <td>  <img src={commentDelete} style={{width:"20px",height:"20px",marginLeft:"20px",cursor:"pointer"}}  onClick={()=>setModalOpen((prev)=>!prev)} alt="" />
                     
                                <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={reports._id} currentUser={admin.user._id} />
                                </td>
                                <>
                
                  
               </>
                               
                                 <td>{}</td> 
                                

                            </tr>
                      )
                    }):'null'}

                </tbody>
            </Table>
        </div>
    </div>

</React.Fragment>
);
}
 

export default Reporterlist