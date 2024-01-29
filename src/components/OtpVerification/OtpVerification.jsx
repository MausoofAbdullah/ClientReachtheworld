import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { resendotp} from "../../api/Authrequest";
import { useNavigate, useParams, NavLink } from 'react-router-dom';

import { verifyotp } from '../../actions/AuthAction'
import './OtpVerification.css'
const OtpVerification = () => {
 const[otpOne,setOtpOne] = useState('')
 const[otpTwo,setOtpTwo] = useState('')
 const[otpThree,setOtpThree] = useState('')
 const[otpFour,setOtpFour] = useState('')
 const [otp,setOtp] = useState('')
 const [seconds, setSeconds] = useState(30);
 const [expire,setExpire]=useState(false)
 const [resendot,setResendot]=useState(false)
 const [resendCount, setResendCount] = useState(0);
 const [countr,setCountr]=useState(false)
 const location = useLocation()
 const dispatch = useDispatch()

 const navigate = useNavigate();
 let registerationDetails = location?.state?.registerationData
console.log(location?.state?.registerationData,'heiksdfg');

 // to change the selected input filed
    useEffect(() => {
        const codes = document.querySelectorAll('.code')

        codes[0]?.focus()

        codes.forEach((code, idx) => {
            code.addEventListener('keydown', (e) => {
                // console.log(e)
                // console.log(idx);
                if (e.key >= 0 && e.key <= 9) {
                    codes[idx].value = ''
                    setTimeout(() => codes[idx + 1]?.focus(), 10)
                    // console.log(codes[idx],'hei')
                }
                else if (e.key === 'Backspace') {
                    // codes[idx].value = ''
                    setTimeout(() => codes[idx - 1]?.focus(), 10)
                }
            })
        })

    },[])
     

    // to update the otp varible
    useEffect(()=>{
        setOtp(otpOne+otpTwo+otpThree+otpFour)
         console.log(otp,'vendum otp')
    },[otpOne,otpTwo,otpThree,otpFour])

    
    useEffect(() => {
        if (resendot) {
          setSeconds(30);
          setExpire(false);
          setResendot(false);
          setResendCount(resendCount + 1);
        }
      }, [resendot]);

useEffect(() => {
    if (!expire) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          setExpire(true);
          clearInterval(interval);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, expire]);
  

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (seconds === 0) {
    //             setExpire(true)
    //             setResendot(true)
    //             clearInterval(interval);
                
                
    //           } else{
    //       setSeconds(seconds - 1);}
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, [seconds]);
    //   if (seconds === 0) {
    //     return null;
    //   }

    //verify Otp
    const verifyOtp=async(e)=>{
       e.preventDefault()
       
       console.log(otp.length)
       console.log(typeof(otp));
      
       dispatch(verifyotp(registerationDetails.userId,otp))
    //    resend otp

      
    }

    
   const handleresendotp=()=>{
    // resendotp(registerationDetails.username)
    // console.log(registerationDetails.username,"dfdfdfdfdfdf")
    if(resendCount>=2){
        setCountr(true)
    }
    resendotp(registerationDetails)
    setResendot(true)
    // setSeconds(30)
  }

  const gotohome=()=>{

  }
    return (
        
        <div className="OtpVerification">
            {!countr?
            <div className='otpChild'>


                <div className='Heading'>

                    <h2>Verify your account</h2>
                </div>
                
                <div className='mySpan'>
                    <span>
                        We emailed you the six digit code to your emailId <br />
                        Enter the code below to confirm your email address
                    </span>

                </div>
               {!expire||resendot ? <div className="code-container">
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpOne(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpTwo(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpThree(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpFour(e.target.value)}  required />
                </div>:""}
                {!expire||resendot?<p>Enter Otp you before 30seconds</p>:<p style={{color:"red"}}>your otp expired , pls resend otp to signup</p>}
                
          {!expire||resendot?  <div >{seconds} seconds remaining</div>:""}
                {!expire||resendot?<div>
                    
                    <button type='button' className='button fc-button verifyBtn' onClick={(e)=>{verifyOtp(e)}}>Verify</button>
                </div>:
                <small >
                If you didn't receive a code or time expired!! <strong onClick={handleresendotp} >RESEND</strong>
                </small>}
                
                
               
            </div>:<div className='otpChild'>
            <div className='Heading'>

<h2 style={{color:"red"}}>Maximum attempts reached</h2>
</div>
<div className='mySpan'>
<small >
                Pls try to signup with new account!! <strong onClick={gotohome} >  <p><NavLink to="/">Home</NavLink></p></strong>
                </small>

                </div></div>}
          
        </div>
    )
}

// sim?

export default OtpVerification
