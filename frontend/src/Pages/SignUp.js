
import { useState,useEffect } from "react";
  import axios from "axios";

  import { Link } from "react-router-dom";
  import './SignUp.css'
  import Login from "../Component/Login";


function SignUp() {
     const [name, setName]= useState("");
     const [password, setPassword]= useState("");
    const [confirmPass, setConfirmPass]= useState("");
    const [email, setEmail]= useState("");

    function submit(event) {
     event.preventDefault();
     let register={
      name:name,
      email:email,
      password:password,
      confirmPass:confirmPass,

     }
     
     

     if( password !== confirmPass){
      console.log("sorry password do not match")

     } else{ 
      
      axios.post("http://localhost:9000/signUp",register).then((res)=>console.log(res)).catch(err=>console.log("userName error"))
     
    
    }
     console.log(register)
  

     
    }

    return ( 
 <div>
 
  <form  className='register' onSubmit={submit}>
               <div className='input_el'>
               <label htmlFor="input-1">UserName
                <input type="text"  className="input_1" required onChange={(event)=>setName(event.target.value)}/>
                </label>
                <label htmlFor="input_1">Email*
                <input type="email"   className="input_2" onChange={(event)=>setEmail(event.target.value)} match required/>
                </label>
                 <label htmlFor="input_1"> Password
                <input type="password"   className="input_2" onChange={(event)=>setPassword(event.target.value)}  match required/></label> 
                <label htmlFor="input_1"> Confirm Password
                <input type="password"   className="input_2" onChange={(event)=>setConfirmPass(event.target.value)}  match required/></label>
                
                

                </div>
                <button className="submit" 
                type='submit'>Create</button>
                
               </form>   

               <form  className='register' onSubmit={submit}>
               <div className='input_el'>
               <label htmlFor="input-1">UserName</label>
                <input type="text"  className="input_1" required onChange={(event)=>setName(event.target.value)}/>
                <label htmlFor="input_1">Email*</label>
                <input type="email"   className="input_2" onChange={(event)=>setEmail(event.target.value)} match required/>
                 <label htmlFor="input_1"> Password</label>
                <input type="password"   className="input_2" onChange={(event)=>setPassword(event.target.value)}  match required/> 
                <label htmlFor="input_1"> Confirm Password</label>
                <input type="password"   className="input_2" onChange={(event)=>setConfirmPass(event.target.value)}  match required/>
                {}
                <p></p> 

                </div>
                <button className="submit" 
                type='submit'>Create</button>
                
               </form>   */}

               <input>kdkkd</inpu
               </div>


     )
}

export default SignUp;