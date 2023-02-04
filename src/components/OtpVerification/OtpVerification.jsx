import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { verifyotp } from '../../actions/AuthAction'
import './OtpVerification.css'
const OtpVerification = () => {
 const[otpOne,setOtpOne] = useState('')
 const[otpTwo,setOtpTwo] = useState('')
 const[otpThree,setOtpThree] = useState('')
 const[otpFour,setOtpFour] = useState('')
 const [otp,setOtp] = useState('')
 const location = useLocation()
 const dispatch = useDispatch()
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

    //verify Otp
    const verifyOtp=async(e)=>{
       e.preventDefault()
       
       console.log(otp.length)
       console.log(typeof(otp));
       dispatch(verifyotp(registerationDetails.userId,otp))
    //    
      
    }
    return (
        <div className="OtpVerification">
            <div className='otpChild'>


                <div className='Heading'>

                    <h2>Verify your account</h2>
                </div>
                <div className='mySpan'>
                    <span>
                        We emailed you the six digit code to person@gmail.com <br />
                        Enter the code below to confirm your email address
                    </span>

                </div>
                <div className="code-container">
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpOne(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpTwo(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpThree(e.target.value)}  required />
                    <input type="text" className='code' placeholder="0" min="0" max="9" onChange={(e)=>setOtpFour(e.target.value)}  required />
                </div>
                <div>
                    <button type='button' className='button fc-button verifyBtn' onClick={(e)=>{verifyOtp(e)}}>Verify</button>
                </div>
                <small>
                    If you didn't receive a code !! <strong>RESEND</strong>
                </small>
            </div>
        </div>
    )
}

export default OtpVerification
