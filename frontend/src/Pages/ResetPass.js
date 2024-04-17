
import react from 'react'
import { useState } from "react";
import '../Pages/Book.css'
import axios from 'axios';
import { Icon } from '@iconify/react';
import {  useNavigate } from "react-router-dom";

function ResetPass () {
    const [resetEmail, setResetEmail]= useState("");
     const [resetPassword, setResetPassword]= useState("");
     const [isMarkVisible, setIsMarkVisible] =useState("false")
     const [isMarkVisible1, setIsMarkVisible1] =useState("false")
     const [isForm, setIsForm] =useState("false")
     const [isFormVisible, setIsFormVisible]=useState("false")
    const [reset, setReset]= useState("Next")
     const navigate = useNavigate()

 

  // const handlekey = async (event)=>{
  //   event.preventDefault()
  //   let reset = {
  //     email: resetEmail,
    
  //   };

  //     const resetData = await axios.put("http://localhost:9000/updatePassword", reset);

  // }

     const SubmitReset = async (event) => {
        event.preventDefault();
      
        try {

          let reset = {
            email: resetEmail,
            newPassword: resetPassword,
          };
      
          const resetData = await axios.put("https://render-backend-28.onrender.com/api/password/updatePassword", reset);
      
          console.log(resetData);
      
          if (resetData.status === 401) {
            setIsMarkVisible1(!isMarkVisible1)
            setIsMarkVisible("true");
            // setIsFormVisible(isMarkVisible)
            
          } else  if(resetData.status===204){
            setIsMarkVisible(!isMarkVisible);
            setIsForm(!isForm)
            setIsMarkVisible1(true)
            setReset("Reset")
          } else if (resetData.status=== 200){
            setIsMarkVisible1(!isMarkVisible1)
            setIsMarkVisible1(true)
            setIsForm(!isForm)
           alert("Password updated Successfully")
            navigate("/login")
            
            console.log("pass")
            }
          } 
         catch (error) {
          // Handle any errors that occurred during the request
          setIsMarkVisible1(!isMarkVisible1)
          console.error("Error during password reset:", error);
          // Optionally, you can update the state or show an error message to the user
        }
      };

    return ( 
        <div>
        
        <form className="resetForm" onSubmit={SubmitReset}>
        
                 <h5 id='reset_header'>Reset Password</h5> 
                 {/* <input id="checkbox1" type="checkbox" required/> */}
                 {!isMarkVisible &&(
                 <Icon  id="checkbox1" icon="game-icons:check-mark" />
                 )}
                 {!isMarkVisible1 && (
                 <Icon  id="checkbox1" icon="fluent-emoji-flat:cross-mark" />
                 )}

        <label htmlFor="input-3">Email</label>
                <input type="text"  placeholder='Enter Email' className="input_reset" autoComplete="on" required onChange={(event)=>setResetEmail(event.target.value)}/>
            
            
       
       {!isForm ?( <div>
  
   <label htmlFor="input-3">Password</label>
    <input
      type="password"
      className="input_1"
      autoComplete="on"
      required
      onChange={(event) => setResetPassword(event.target.value)}
    />
    </div>):(null)}
  
<button className='submit'  >{reset}</button>


    <p></p>
  

               </form>
        </div>
    )
     
}

export default ResetPass;