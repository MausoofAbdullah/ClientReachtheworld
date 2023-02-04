import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ReportedPosts.css'
import { borderRadius } from '@mui/system';
import { toast } from 'react-hot-toast';
import deleteButton from '../../img/deleteButton.png';
import switcher from '../../img/unblock.png'
import { reportedPostRemove } from '../../actions/postAction';
import { useDispatch } from 'react-redux';





function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const makeStyles=(active)=>{
    if(active){
        return{
            background:"rgb(145 254 159/ 47%)",
            color:"green",
            borderRadius:"5px",
            cursor:"pointer",
            padding:"4px"
                    
        }
    }else{
        return{
            background:'#ffadad8f',
            color:'red',
            borderRadius:"5px",
            cursor:"pointer",
            padding:"4px"
        }
    }
}



export default function BasicTable({allReportedPosts,setReportedPostsUseEffect,reportedPostsUseEffect}) {
    
    const dispatch = useDispatch()

 const handlePostRemove=async(postId)=>{
      const response = await dispatch(reportedPostRemove(postId)) 
      setReportedPostsUseEffect((prev)=>!prev)
      
 }

 


    return (
        <div className="ReportedPosts">
            
            <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029', width: "80%" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Post ID</TableCell>
                            <TableCell align="left">Reports</TableCell>
                            <TableCell align="left">Actions</TableCell>
                            {/* <TableCell align="left"></TableCell>
                            <TableCell align="left">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody className='tableBody'>
                        {allReportedPosts.map((post)=>(
                            <TableRow
                            
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell component="th" scope="row">
                                    {post._id}
                                </TableCell>
                                
                                <TableCell align="left" >{post.reports.map((report,index)=><>{index >=1 && <hr />}<span>{report.reason}</span></>)}</TableCell>
                                <TableCell align="left" >{!post.removed?<span>Block<img src={deleteButton} style={{width:'20px',marginLeft:"15px",cursor:"pointer"}} alt=""  onClick={()=>handlePostRemove(post._id)}/></span>:<span>unBlock<img src={switcher} style={{width:'20px',marginLeft:"15px",cursor:"pointer"}} alt=""  onClick={()=>handlePostRemove(post._id)}/></span>}</TableCell>
                                {/* <TableCell align="left">{row.carbs}</TableCell> */}
                                {/* <TableCell align="left"></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}