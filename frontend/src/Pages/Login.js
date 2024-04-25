
import React from "react";
import { useState } from "react";
import './Book.css'
import $ from 'jquery'
import axios from "axios";
import Display from "../Component/Display";
import {  useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";


function Login() {
    
    const[email2, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [isInputDisabled, setIsInputDisabled] = useState(true);
     const [name, setName]= useState("");
     const [password1, setPassword1]= useState("");
    
     const [isResetFormVisible, setIsResetFormVisible] = useState(false);
    const [confirmPass, setConfirmPass]= useState("");
    const [email1, setEmailSignUp]= useState("");
    const [loginMs, setLogin] = useState("")
    const [signUpMs, setSignUp] = useState("")
     let token= localStorage.getItem("token")
     const [isVisible, setIsVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
     const [isShaking, setIsShaking] = useState(false);
     const [message, setMessage] = useState(false);
     const [failAttempts, setAttempts] = useState(0);
   const navigate = useNavigate()

   
const Submit = async (event) => {
    event.preventDefault();
    let user={
      email:email2,
      password:password
    } // Assuming email2 is defined somewhere
  // Assuming password is defined somewhere

    try {
        const response = await axios.post("https://render-backend-28.onrender.com/api/login", user);

        if (response.status === 2004 ) {
            // User successfully logged in
            
            setLogin(response.data.msg || "Invalid credentials. Please try again.");
            setIsShaking(true);
            setAttempts(failAttempts + 1);
            if (failAttempts + 1 >= 3) {
                setLogin("Not registered, Sign Up");
                alert("It seems you don't have an account. Please sign up.");
                setIsInputDisabled(!isInputDisabled); // This line seems dubious. You might want to clarify its purpose.
            }
        } else if (response.status === 200 && response.data.token) {
            // Incorrect credentials or user not found
            const newToken = response.data.token;
            localStorage.setItem("token", newToken);
            navigate("/");
        } else {
          setLogin(response.data.msg || "Invalid credentials. Please try again.");
          setIsShaking(true);
          setAttempts(failAttempts + 1);
          if (failAttempts + 1 >= 3) {
              setLogin("Not registered, Sign Up");
              alert("It seems you don't have an account. Please sign up.");
              setIsInputDisabled(!isInputDisabled); // This line seems dubious. You might want to clarify its purpose.
          }
            // setLogin("Server error, please try again later.");
        }
    } catch (error) {
        // Handle network errors or other exceptions
        setLogin("Server error, please try again later.");
    }
};

    

const handleSignUp = async (event) => {
  event.preventDefault();

  let register = {
    name: name,
    email: email1,
    password: password1,
    // confirmPass: confirmPass,
  };

  try {
    const responseSignUp = await axios.post("https://render-backend-28.onrender.com/api/signUp", register);
        console.log(responseSignUp)
    // Check the HTTP status codes
    if (responseSignUp.status === 200) {
      // Successful sign-up
      setIsFormVisible(!isFormVisible);
      navigate("/welcomeMessage")
      // alert("Check your Email to verify your Account");
      // window.location.reload()
      setSignUp("");
    } else if (responseSignUp.status === 409) {
      // Email already exists
      
      // Handle other status codes if needed
      setSignUp("Sign-up Failed");
    }
  } catch (error) {
    
    setSignUp("Email Already taken!");
    setEmailSignUp("");
    
    
  
  }
};
 const toggleReset= async()=>{
  navigate("/emailSubmit")
  // navigate("/resetPassword")
 }

    
    const toggleForm = () => {
      setIsFormVisible(!isFormVisible);
      setEmailSignUp("");
    };
    
  

    

    return ( 
        
        <div>
        <div className="bg">
        
        { !isFormVisible ? (
            <form  className='register1' onSubmit={Submit}>
               
            <div className="login_Header">
        <h2 style={{fontSize:"25px",color:"grey", justifyContent:"center"}}> Login</h2> 
    
        
        </div>
               
               <div className='input_el'>
               <label>Email*</label>
               <input
  type="email"
  className="form-control" aria-label="With textarea"
  className={`input_2 ${isShaking ? 'shake' : ''}`}
  style={{ borderColor: isShaking ? 'red' : ''}}
  
  onChange={(event) => setEmail(event.target.value)}
  required
/>

      
                </div>

                <div className='input_el2'>
                 <label>Password*</label>
                <input
                className="form-control" aria-label="With textarea"
  type="password"
  className={`input_2 ${isShaking ? 'shake' : ''}`}
  style={{ borderColor: isShaking ? 'red' : '' }}
  onChange={(event) => setPassword(event.target.value)}
  required autocomplete="current-password"
/>

              
                </div>

                <div  className ={`input_4 ${isShaking ? 'shake'  : ''}`} style={{color:"red", margin:" 10", }}>{loginMs}</div>

                <div>
                <button className="submit"  
              
                type='submit' >login</button>
                </div>
               
                <div className="reset">
                    <a  onClick={toggleReset} style={{color:"blueviolet"}} target='_blank' >Forget Password/Reset Password</a>
                    
                </div>
              
        
               </form>  

        ): (
          
        <form  className="SignUp_Form" onSubmit={handleSignUp}>
         <h2 id="id_signUp" style={{fontSize:"21px"}}> SignUp Account</h2> 
               <div className='input_el'>
               <label htmlFor="input-3">Full Name</label>
                <input className="form-control" aria-label="With textarea" type="text"  className="input_1" autoComplete="on" required onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="input_3">Email*</label>
                <input  className="form-control" aria-label="With textarea"type="email"   className="input_2" onChange={(e)=>setEmailSignUp(e.target.value)}  required/>
                 <label htmlFor="input_3"> Password*</label>
                <input  className="form-control" aria-label="With textarea"type="password"   className="input_2" onChange={(e)=>setPassword1(e.target.value)} required/> 
              
                
                <p></p> 

                <div style={{color:"red", margin:"4"}}>{signUpMs}</div>
                <div>
                  <div className="terms" style={{color:"grey"}}>
                <input id="checkbox" type="checkbox" required/> <a  > <span id="span1" style={{color:"grey"}}>Terms</span> & Conditions</a>
          </div>
                    <button className="submit2" 
                type='submit'>Sign Up</button>
                </div>
*
                </div>
                
                
               </form>    
            
        )}
        
      
               
               <div className="createAcc">
                <b className="bottom1"> {!isFormVisible ?(<span>No account?</span>):(<span>Have account ?</span>)}
              <a onClick={toggleForm} className="sign_up">
              {!isFormVisible ?(<span style={{fontSize:"15px"}} id="id_create" >Create One</span>):(<span id="id_create" >SignIn</span>)} </a></b><br></br>
                <span className="bottom2"><span className="bottom4">Manage cookies</span> & <span className="bottom3">opt out</span></span>
               </div> 

         <div className="login_footer">
               <div className="col-1"><b id="b1">@copyRight||ConnectBusiness.com</b></div>
                <div className="col-2"><b id="b2">
                <Icon icon="ic:baseline-facebook" />
                <Icon id="b3" icon="teenyicons:instagram-solid" />
                <Icon  id="b4"icon="teenyicons:twitter-solid" />
                </b>
                </div> 
                </div> 
                  
               
        
      
            

                 

         
               

</div>
     </div>
      
        
     );
}

export default Login;
