import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import toast from 'react-hot-toast'
import "./ResetPassword.css";
import Logo from "../../img/logonew.png";

import { useDispatch, useSelector} from "react-redux"
import { logIn} from "../../actions/AuthAction";
import { reset } from "../../api/Authrequest";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const PasswordReset = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
      
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setUsername(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (username === "") {
            // toast.error("email is required!", {
            //     position: "top-center"
            // });
        // }
        //  else if (!email.includes("@")) {
        //     toast.warning("includes @ in your email!", {
        //         position: "top-center"
        //     });
        } else {
            // const res = await fetch("/sendpasswordlink", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ email })
            // });
//             const usersName = JSON.stringify({ name: 'John Doe' });
// customConfig = {
//     headers: {
//     'Content-Type': 'application/json'
//     }
// };
console.log(username,"before")
const res=await reset(username)
console.log(username,"after")
console.log(res,"frontenf")
          
            // const res = await axios.post("/sendpasswordlink", { username }, {
            //  customConfig
            // });
            const data = await res.data;
            // console.log(data,"reset data")

            if (data.status == 201) {
                setUsername("");
                setMessage(true)
                toast.success(data.message)
            } else {
                // toast.error("Invalid User",{
                //     position: "top-center"
                // })
            }
        }
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
            <form className="infoForm authForm" autoComplete=''>
              <h3>ForgotPassword? You can Reset now</h3>
              {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Successfully in Your Email</p> : ""}
    
           
    
              <div>
                <input
                  type="text"
                  placeholder="User Name"
                  className="infoInput"
                  name="username"
                value={username}
                onChange={setVal}
                />
              </div>
              
              {/* {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>} */}
             
              <button
                className="button infoButton"
                onClick={sendLink}
                 disabled={loading}
              >
                submit
              </button>
            </form>
            
          </div>
    
          {/* <Login/> */}
        </div>
      );
}

export default PasswordReset