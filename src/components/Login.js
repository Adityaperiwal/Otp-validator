import { useState, useEffect } from "react"
import './Login.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { setAccessToken } from "../store/actions";
import { useHistory } from "react-router-dom";


function Login({setAccessToken})
{
 const history = useHistory();
 const [mobileNo, setMobileNo] = useState("");
 const [otp, setOtp] = useState("");
 const [isMobileValid, setIsMobileValid] = useState(true);
 const [isOtpValid, setIsOtpValid] = useState(true);

 const otpApi = "https://stage-services.truemeds.in/CustomerService/";

 
 const handleSubmit = (e)=>{
   e.preventDefault();
   if(!otp || !mobileNo || !isMobileValid || !isOtpValid){
     return;
   }
   verifyOtp();
   history.push("/articles");
 }
 const getOtp = (e)=>{
  const headers = {
    transactionId: 'react_interview'
  }
  const getOtpUrl = `sendOtp?mobileNo=${mobileNo}`;
    axios.post(otpApi + getOtpUrl, {}, {
      headers
    }).then(data=>console.log(data))
    .catch(error=>console.log(error));
 }

 const verifyOtp = ()=>{
  const verifyUrl = `verifyOtp?mobileNo=${mobileNo}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`;
  const headers = {
    transactionId: 'react_interview'
  }
  axios.post(otpApi + verifyUrl, {}, {
    headers
  }).then(data=>{
    console.log(data.data.Response.access_token);
    setAccessToken(data.data.Response.access_token);
  }).catch(error=>console.log(error));
}

 const handleMobileValidation = (mobileNo)=>{
   setIsMobileValid(isValidMobile(mobileNo));
 }

 const handleOtpValidation =(otp)=>{
  setIsOtpValid(isValidOtp(otp));
 }

 const isValidMobile = (value) => {
  const mobileRegex = /^[6789]\d{9}$/g;
  return mobileRegex.test(value);
 }

 const isValidOtp = (value) => {
  const otpRegex = /^([0-9]){4}$/g;
  return otpRegex.test(value);
 }
    return(
        <>
        <form onSubmit= {(e) => {handleSubmit(e)}}>
          <div>
          <input required class ={`input-xs ${!isMobileValid? "invalid-input": ""}`} type="text" value = {mobileNo} 
          onChange={(e)=>{setMobileNo(e.target.value); handleMobileValidation(e.target.value)}}  required placeholder= "Mobile No" />
          <button onClick={(e)=>{getOtp(e)}}>Get OTP</button>
          <div>
          <input required class ={`input-sm ${!isOtpValid? "invalid-input": ""}`} type="text" value = {otp} 
          onChange={(e)=>{setOtp(e.target.value); handleOtpValidation(e.target.value)}}  required placeholder= "Enter OTP" />          
          </div>
         </div>
         <input class ="task-button" value="Submit" type = "submit"/> 
      </form>
        </>
    )
}

const mapStateToProps = (state)=>{
  return({accessToken:state.accessTokenReducer.accessToken});
}
const mapDispatchToProps = {
  setAccessToken
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
