import react from 'react'
import { useState } from "react";
import '../Pages/Book.css'
import axios from 'axios';
import { Icon } from '@iconify/react';
import {  useNavigate } from "react-router-dom";

function EmailPassReset() {
    const [resetEmail1, setResetEmail]=  useState("");
    
    
    const SubmitEmail=async(event)=>{
        event.preventDefault()
        let reset = {
            email: resetEmail1,
            
          };
      
          const resetEmail = await axios.post("https://render-backend-28.onrender.com/api/password/passwordResetReqest", reset);
      
    }
    return (  

        <>
            <form className="resetForm" onSubmit={SubmitEmail}>
            <label htmlFor="input-3">Email</label>
                <input type="text"  placeholder='Enter Email' className="input_reset" autoComplete="on" required onChange={(event)=>setResetEmail(event.target.value)}
                />
                 <button className='submit'>Submit</button>
            </form>
        </>
    );
}

export default EmailPassReset;