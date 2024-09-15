import {useState,useEffect } from 'react';
import {AiOutlineExclamationCircle} from "react-icons/ai";
import axios from 'axios';
import { be_url } from '/config';
import { useNavigate} from 'react-router-dom';
import '../CSS/Auth.css';

function Signup() {

    let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let [isFilled , setIsFilled] = useState(true);
    let [validEmail , setValidEmail] = useState(true);
    let [validPassword , setValidPassword] = useState(true);
    let [validConfirmPassword , setValidConfirmPassword] = useState(true);
    let [firstName , setFirstName] = useState("");
    let [lastName , setLastName] = useState("");
    let [emailId , setEmailId] = useState("");
    let [password , setPassword] = useState("");
    let [phoneNumber , setPhoneNumber] = useState("");
    let [emailTaken , setEmailTaken] = useState(false);
    let [confirmPassword , setConfirmPassword] = useState("");
    let [validPhoneNumber, setValidPhoneNumber] = useState(true);
    let phoneNumberRegex = /[0-9]{10}/ ;

    let navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    function handleEmailValidity(n,e){

        if(n==1){
            if(e.target.value == ""){
                setValidEmail(true);
            }
            else{
                setValidEmail( emailRegex.test(e.target.value));
            }
        }
        else{
            setValidEmail(false);
        }

    }

    useEffect(()=>{

        console.log(password);

            if(password == ""){
                setValidPassword(true);
            }
            else{
                setValidPassword( passwordRegex.test(password));
            }
        
    },[password])

    function handleConfirmPassword(e){

        if(e.target.value == ""){
            setValidConfirmPassword(true);
        }
        else{
            setValidConfirmPassword(password == e.target.value);
        }
    }

    function handleSubmit(e){

        e.preventDefault();

        if(!(firstName == "" || lastName == "" || emailId =="" || password == "" || confirmPassword == "" || phoneNumber == "") && validEmail && validPassword && validConfirmPassword && validPhoneNumber){

            axios.post(be_url + "/doctor-signup" , {firstName , lastName , emailId , password , phoneNumber } , { withCredentials : true})
                  .then((res)=>{

                    if(res.data.code == 1){
                        setEmailTaken(true);
                        handleEmailValidity(2) ;
                    }
                    else if( res.data.code == 2){

                        console.log(JSON.stringify(res.data.user)) ;
                        window.localStorage.setItem("user" , JSON.stringify(res.data.user)) ;
                        navigate('/doctor-dashboard');
                    }
                  })
                  .catch((err)=>{
                    console.log(err);
                  })  
        }
        else{

            if(firstName == "" || lastName == "" || emailId =="" || password == "" || confirmPassword == "" || phoneNumber == ""){
                setIsFilled(false) ;
            }
        }
    }

    return(

        <div className="auth-wrap">

            <form className="auth-form" onChange={()=>{setIsFilled(true)}}>

                <h2 className='ConsultMe auth-ConsultMe' >ConsultMe</h2>

                {/* <div className="logo-div-auth">
                <img src="./public/logo.jpg"></img>
                </div> */}

                <p className='error-box' style={{ display : isFilled ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    please fill the fields
                </p>

                <div id="username-wrap">
                    <label htmlFor='first-name'>first name
                        <input id="first-name" 
                            className="auth-input" 
                            type='text' 
                            autoComplete='on'
                            required
                            onChange={(e)=>{ setFirstName(e.target.value); }}></input>
                    </label>
                    <label htmlFor='last-name'>last name
                        <input  id="last-name"
                                className="auth-input" 
                                type='text' 
                                required
                                onChange={(e)=>{ setLastName(e.target.value) ; }}></input>
                    </label>
                </div>

                <label htmlFor='email'>email-Id</label>
                <input id="email" 
                       className="auth-input" 
                       type='email'
                       required
                       onChange={(e)=> { handleEmailValidity(1,e); setEmailId(e.target.value); }}></input>
                <p className='error-box' style={{ display : validEmail ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    email is invalid or already taken 
                </p>

                <label htmlFor='phone-number'>Phone No.</label>
                <input id="phone-number" 
                       className="auth-input" 
                       type="tel"
                       pattern='[0-9]{10}'
                       required
                       onChange={(e)=> { ((e.target.value.length == 10) && ((phoneNumberRegex).test(e.target.value))) ? setValidPhoneNumber(true) : setValidPhoneNumber(false) ; setPhoneNumber(e.target.value); }}></input>
                <p className='error-box' style={{ display : validPhoneNumber ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    please enter valid phone number 
                </p>

                <label htmlFor='pwd' type="password">password</label>
                <input id="pwd" 
                       className="auth-input" 
                       required
                       type='password'
                       autoComplete='off'
                       onChange={(e)=>{setPassword(e.target.value); }}></input>
                <p className='error-box' 
                   style={{ display : validPassword ? "none" : "block"}}
                   >
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    password must be atleast 8 characters long<br/>
                    password must contain atleast 1 uppercase character,1 numeric and 1 special character
                </p>       

                <label htmlFor='c-pwd' type="password">confirm-password</label>
                <input id="c-pwd" 
                       className="auth-input" 
                       required
                       type="password"
                       autoComplete='off'
                       onChange={(e)=> {handleConfirmPassword(e) ; setConfirmPassword(e.target.value) ; }}></input>

                <p className='error-box' 
                   style={{ display : validConfirmPassword ? "none" : "block"}}
                   >
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    should match the above field<br/>
                </p>

                <button type="submit" 
                        id="signup-btn"
                        onClick={handleSubmit}>Create account</button>

                <div className='or-wrap'>
                    <div className='line'></div>
                    <div className='or'>or</div>
                    <div className='line'></div>
                </div>

                <button id="signup-w-google-btn">signup with google</button>

                <p className='auth-extra'>already have an account? <a href="/login">login</a></p>

            </form>



        </div>

    )
}

export default Signup

// import { useEffect, useState } from "react"
// import axios from 'axios';
// import {be_url} from "/config"
// import {Navigate, useNavigate} from "react-router-dom";
// import "../CSS/SubmitDoctorDetails.css";
// import {AiOutlineExclamationCircle} from "react-icons/ai";

// function SubmitDoctorDetails(){

//     let [address , setAddress] = useState("");
//     let [city , setCity] = useState("");
//     let [birthdate , setBirthdate] = useState("");
//     let [state , setState] = useState("");
//     let [age , setAge] = useState("");
//     let [gender , setGender] = useState("");
//     let [education, setEducation] = useState("");
//     let [personalID, setPersonalID] = useState("");
//     let [specialization, setSpecialization] = useState("");
//     let [experience, setExperience] = useState("");
//     let [profilePic, setProfilePic] = useState("");
//     let [isFilled , setIsFilled] = useState(true) ;
//     const lastVisitedPage = localStorage.getItem('lastVisitedPage');

//     let navigate = useNavigate() ;

//     useEffect(()=>{
//         window.addEventListener('beforeunload', () => {
//           localStorage.setItem('lastVisitedPage', window.location.pathname);
//         });
//       })

//     useEffect(()=>{

//         axios.get(be_url + "/submit-doctor-details" , {withCredentials : true} )
//              .then((res)=>{
//                 if(res.data.code == 2 ){

//                     if(res.data.role){
//                         if (lastVisitedPage) {
//                             navigate(lastVisitedPage);
//                         } else {
//                             navigate("/");
//                         }
//                     }
//                     else{
//                         console.log(res.data) ;
//                     }
//                 }
    
//              })
//              .catch((err)=>{
//                 console.log(err) ;

//                 navigate("/");
//              })

//     }, [])

//     useEffect(()=>{

//         calculateAge() ;

//     }, [birthdate])

//     function calculateAge() {
//         var today = new Date();
//         var birthdateObj = new Date(birthdate) ;

//         var ageTemp = today.getFullYear() - birthdateObj.getFullYear();
//         var monthDiff = today.getMonth() - birthdateObj.getMonth();
    
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
//             ageTemp--;
//         }

//         setAge(ageTemp) ;

//     }

//     function uploadimage(){

//         let image = new FormData();
//         console.log("pp[0]" , profilePic[0])
//         image.append('file', profilePic[0]);
//         image.append('upload_preset','expense-tracker')
//         image.append('cloud_name','dgqba5trl')

//         return axios.post("https://api.cloudinary.com/v1_1/dgqba5trl/image/upload",image)
//     }

//     async function handleSubmit(e){

//         e.preventDefault() ;

//         if(address !== "" && city !== "" && state !== "" && birthdate !== "" && gender !== "" && education !== "" && personalID !== "" && specialization !== "" && profilePic !== "" && experience !== ""){ // change

//             let profilePicURL ;

//             await uploadimage()
//             .then((res)=>{
//                 console.log(res.data.url) ;
//                 profilePicURL = res.data.url ;
//             })
//             .catch((err)=>{
//                 console.error(err) ;
//             })

//             axios.post(be_url + "/submit-doctor-details" , { address , city , state , birthdate , age , gender , education , personalID , specialization , experience , profilePicURL} , {withCredentials : true})
//             .then((res)=>{

//                 console.log("res.data" , res.data) ;
//                 navigate("/doctor-dashboard") ;

//             })
//             .catch((err)=>{
//                 console.log(err) ;
//             })

//         }
//         else{
//             console.log("false") ;
//             setIsFilled(false) ;
//         }

//         console.log("address : " , address , typeof(address));
//         console.log("city : " , city , typeof(city));
//         console.log("state : " , state , typeof(state));
//         console.log("birthdate : " , birthdate , typeof(birthdate));
//         console.log("age : " , age , typeof(age));
//         console.log("gender : " , gender , typeof(gender));
//         console.log("education : " , education , typeof(education));
//         console.log("specializaion : " , specialization , typeof(specialization));
//         console.log("experience : " , experience , typeof(experience));
//         console.log("personalID : " , personalID , typeof(personalID));
//         console.log("url : " , profilePic , typeof(profilePic));



//     }

//     return(
//         <div id="submit-doctor-details">
//             <h1 id="submit-doctor-details-h1">Doctor Data Input</h1>
//     <hr/>
//     <form id="doctor-form" onChange={()=>{setIsFilled(true)}}>

//     <p className='error-box' style={{ display : isFilled ? "none" : "block"}}>
//                     <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
//                     please fill the fields
//     </p>
    
//         <label htmlFor="address">Street Address:</label>
//         <input type="text" id="address" name="address" onChange={(e)=>{setAddress(e.target.value)}} required=""/><br/>

//         <label htmlFor="city">City:</label>
//         <input type="text" id="city" name="city" onChange={(e)=>{setCity(e.target.value)}} required=""/><br/>

//         <label htmlFor="state">State:</label>
//         <select id="doctor-form-state" name="state" onChange={(e)=>{setState(e.target.value)}}>
//         <option value="">Select State</option>
//         <option value="Andhra Pradesh">Andhra Pradesh</option>
//         <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//         <option value="Assam">Assam</option>
//         <option value="Bihar">Bihar</option>
//         <option value="Chhattisgarh">Chhattisgarh</option>
//         <option value="Goa">Goa</option>
//         <option value="Gujarat">Gujarat</option>
//         <option value="Haryana">Haryana</option>
//         <option value="Himachal Pradesh">Himachal Pradesh</option>
//         <option value="Jharkhand">Jharkhand</option>
//         <option value="Karnataka">Karnataka</option>
//         <option value="Kerala">Kerala</option>
//         <option value="Madhya Pradesh">Madhya Pradesh</option>
//         <option value="Maharashtra">Maharashtra</option>
//         <option value="Manipur">Manipur</option>
//         <option value="Meghalaya">Meghalaya</option>
//         <option value="Mizoram">Mizoram</option>
//         <option value="Nagaland">Nagaland</option>
//         <option value="Odisha">Odisha</option>
//         <option value="Punjab">Punjab</option>
//         <option value="Rajasthan">Rajasthan</option>
//         <option value="Sikkim">Sikkim</option>
//         <option value="Tamil Nadu">Tamil Nadu</option>
//         <option value="Telangana">Telangana</option>
//         <option value="Tripura">Tripura</option>
//         <option value="Uttar Pradesh">Uttar Pradesh</option>
//         <option value="Uttarakhand">Uttarakhand</option>
//         <option value="West Bengal">West Bengal</option>
//         <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
//         <option value="Chandigarh">Chandigarh</option>
//         <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
//         <option value="Daman and Diu">Daman and Diu</option>
//         <option value="Lakshadweep">Lakshadweep</option>
//         <option value="Delhi">Delhi</option>
//         <option value="Puducherry">Puducherry</option>
//         </select>

//         <label htmlFor="birthdate">Birthdate:</label>
//         <input type="date" id="birthdate" name="birthdate" required onChange={(e)=>{setBirthdate(e.target.value) ; calculateAge()}}/><br />

//         <label htmlFor="age">Age:</label>
//         <input type="text" id="age" name="age" value={age}/><br/>
    
//         <label htmlFor="gender">Gender:</label>
//         <select id="doctor-form-gender" name="gender"  onChange={(e)=>{setGender(e.target.value)}}>
//             <option value="" >Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Transgender</option>
//         </select><br/>

//         <label htmlFor="education">Education:</label>
//         <input type="text" id="education" name="education"  onChange={(e)=>{setEducation(e.target.value)}}/><br/>

//         <label htmlFor="specialization">Specialization:</label>

//         <select id="specialization" onChange={(e)=>{setSpecialization(e.target.value)}}>
//             <option value="">choose specialization</option>
//             <option value="">Select Specialization</option>
//             <option value="Cardiology">Cardiology</option>
//             <option value="Dermatology">Dermatology</option>
//             <option value="Endocrinology">Endocrinology</option>
//             <option value="Gastroenterology">Gastroenterology</option>
//             <option value="Hematology">Hematology</option>
//             <option value="Nephrology">Nephrology</option>
//             <option value="Neurology">Neurology</option>
//             <option value="Oncology">Oncology</option>
//             <option value="Ophthalmology">Ophthalmology</option>
//             <option value="Orthopedics">Orthopedics</option>
//             <option value="Otolaryngology">Otolaryngology (ENT)</option>
//             <option value="Pediatrics">Pediatrics</option>
//             <option value="Psychiatry">Psychiatry</option>
//             <option value="Pulmonology">Pulmonology</option>
//             <option value="Rheumatology">Rheumatology</option>
//             <option value="Urology">Urology</option>
//             <option value="Obstetrics and Gynecology">Obstetrics and Gynecology (OB/GYN)</option>
//             <option value="Anesthesiology">Anesthesiology</option>
//             <option value="Dentistry">Dentistry</option>
//             <option value="Radiology">Radiology</option>

//           </select>

//         <label htmlFor="experience">Experience:</label>
//         <input type="text" id="experience" name="experience"  onChange={(e)=>{setExperience(e.target.value)}}/><br/>
        
//         <label htmlFor="personalID">Personal ID:</label>
//         <input type="text" id="personalID" name="personalID" required=""  onChange={(e)=>{setPersonalID(e.target.value)}}/><br/>
    
//         <label htmlFor="profilePicInput">Profile Pic:</label>
//         <input type="file" id="profilePicInput" name="profilePicInput"  onChange={(e)=>{setProfilePic(e.target.files)}}/><br/>
//         <input type="submit" value="Submit" onClick={handleSubmit}/>
//     </form>

//         </div>

//     )
// }

// export default SubmitDoctorDetails
