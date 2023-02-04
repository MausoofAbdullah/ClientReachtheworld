import React from "react";
import "./ForgotPassword.css";
import Logo from "../../img/logonew.png";
import { useState,useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { logIn} from "../../actions/AuthAction";
import { signup } from "../../api/Authrequest";
import { newpassword ,changepassword} from "../../api/Authrequest";
import toast from 'react-hot-toast'




import { useNavigate, useParams, NavLink } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';




const ForgotPassword = () => {
  

  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  


  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
    
  const navigate = useNavigate();

 // console.log(loading)

  const handleChange = (e) => {
    setPassword(e.target.value)
  };


  const uservalid=async()=>{
    const res=await newpassword(id,token)
    const data=await res.json()
    
    if (data.status == 201) {
      console.log("user valid")
  } else {
      history("*")
  }
  }
  


  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
        toast.error("password is required!", {
            position: "top-center"
        });
    } 
    //else if (password.length < 6) {
    //     toast.error("password must be 6 char!", {
    //         position: "top-center"
    //     });
   // } else
     
        // const res = await fetch(`/${id}/${token}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ password })
        // });
        else{
const res=await changepassword(id,token,password)
        // const data = await res.json()
        // console.log(data,"data in response")
        console.log(res,"rrrrrewesdfdsfdsfsdfd")

        if (res.status == 201) {
            setPassword("")
            setMessage(true)
        } }
}



  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" className="" />
        <div className="webName">
          <h1>Reach the World</h1>
          <h6>Invent the new world of friends</h6>
        </div>
      </div>

      {/* righside */}

      <div className="a-right">
        <form className="infoForm authForm" >
          <h3>Enter your new password</h3>

       

          <div>
            <input
              type="password"
              placeholder="New password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          {message && <p>new password set ,go to home and login again</p>}
          
          {/* {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>} */}
          {/* <button
            className="button buttonleft"
            onClick={send}
             disabled={loading}
          >
            send
          </button> */}
         <div style={{display:"flex",justifyContent:"space-between"}} >
         <p><NavLink to="/">Home</NavLink></p>
        
          <button
            className="button infoButton"
            onClick={sendpassword}
             disabled={loading}
          >
            send
          </button>
          </div>
        </form>
      </div>

      {/* <Login/> */}
    </div>
  );
              }
export default ForgotPassword;