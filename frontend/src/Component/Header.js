import './Header.css'
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import{Link, useNavigate }from 'react-router-dom'
import Profile from '../Component/Profile'
import Display from '../Component/Display' 
import 'aos/dist/aos.css'
import { BookForm } from '../Component/Display';
import Video from '../Component/vid/vid.mp4.webm'
import { Button } from 'semantic-ui-react';
 import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import io  from 'socket.io-client'
// import jwtDecode from 'jwt-decode';

const socket = io.connect("https://render-backend-28.onrender.com")




function  Header(responseBook) {

  
  
    //      value: "https://plus.unsplash.com/premium_photo-1682430910635-849075f57a63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D"
    
const[navBar, setNavBar]=useState(false)
const[solution, setSolution]=useState(false)
const[subMenu, setSubMenu]=useState(false)
const[link, setLink]=useState(false)
const[userId, setUserId]=useState("")
const[Online, setOnline]=useState(false)
 const[decodedEmail, setDecodeEmail]=useState("")
 const [imageUrl, setImageUrl] = useState('');
 const[decodedName, setDecodedName]=useState(" ")
 const[decodedId, setDecodedId]=useState(" ")
const[logo, setlogo]=useState(false)
const [token, setToken] = useState('')
const [isFormVisible, setIsFormVisible] = useState(true);;
const [isNotiVisible, setIsNotiVisible] = useState(true);;
 const [isProfileVisible1, setProfileVisible1] = useState()
const [isVisible, setIsVisible] = useState(false);
const [Elements, setElements] = useState([]);
const [dynamicElements, setDynamicElements] = useState([]);
const [display, setDisplay] =useState(false)
const [ isProfileVisible, setProfileVisible] = useState(false);

  const navigate = useNavigate()

  
  
// let decoded;
let storedToken =localStorage.getItem("token")


// const [token, setToken] = useState('');

  useEffect(() => {
    let storedToken = localStorage.getItem('token');
    if (storedToken) {
       const decoded= jwtDecode(storedToken)
       console.log(decoded)
       if (!decoded){
          alert("Admin Authentification invalid")
         }
         setDecodeEmail(decoded.findEmail)
         setDecodedName(decoded.findName)
         setDecodedId(decoded.userId)
         if(decodedId){
            
          socket.emit('setUserId', decodedId);
        }
        
        socket.on('connectedWithId', (userId) => {
          console.log(`Successfully connected with ID: ${userId}`);
          if(userId=== decodedId){
            console.log("online", decodedName)
            setOnline(true)
          
            setUserId((prevData)=>[...prevData, userId])
          }else{
          setOnline(false) }
        });
      
         
      }else{
        alert("Token not exist")
      }
      
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (decodedId) {
        console.log(decodedId);
        const picture = {
          userId: decodedId,
        };
        console.log(picture);
  
        try {
          // Send a POST request to fetch the profile picture
          const responsePic = await axios.post(`https://render-backend-28.onrender.com/api/pictures/getProfilePicture`, picture);
          console.log(responsePic);
  
          // Check if the request was successful (status code 200)
          if (responsePic.status === 200) {
          // console.log(responsePic.data.profilePicture.Picture)
            const base64String = responsePic.data.profilePicture.Picture;
           
            setImageUrl(base64String);
            // console.log(dataUrl)
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
          // Handle error, e.g., show an alert or set a default picture
        }
      }
    };
  
    // Fetch data when the component mounts or when decodedId changes
    fetchData();
  }, [decodedId]);
  
 

 
  
    // Call fetchData when the component mounts or when decodedId changes
    

  
useEffect(() => {
  // Retrieve data from localStorage
  const imgData = localStorage.getItem('img');

  // Check if the data is available (truthy) to determine visibility
  setProfileVisible(!!imgData);
}, []); //

const changeColor =()=>{
   if(window.scrollY >=100){
    setDisplay(true)
    setNavBar(true)
    setSubMenu(true)
   } else{
    setNavBar(false)
    setDisplay(false)
    setSubMenu(false)
}
if(window.scrollY >=100){
  setlogo(true)
  
 } else{
  setlogo(false)
  
}
}
const boxShadow=()=>{
  if(window.scrollY >=100){
    setSolution(true)
    setLink(true)
   } else{
    setSolution(false)
    setLink(false)
  }
}
window.addEventListener("scroll",changeColor)
window.addEventListener("scroll",boxShadow)





function LogOut(){
    localStorage.removeItem("token")
    // setProfileVisible(false);
}
function changeImg(){
navigate("/profilePicture")
setProfileVisible(true);
// setProfileVisible(falnpm update jsonwebtoken);
}
function ChangePassword(){
navigate("/resetPassword")
setProfileVisible(true);
// setProfileVisible(isProfileVisible);
}
    function Profile(){
        setProfileVisible(!isProfileVisible);
    }

    
  
    // Use useEffect to automatically change the slide
   
  
    
  function Start(){
    navigate("/login")
  }
    
  async function AdminAcc() {
    let adminUser = {
      email: decodedEmail,
    };
   console.log("Email",adminUser)
    try {
      const responseAdmin = await axios.post("https://render-backend-28.onrender.com/api/admin", adminUser);
  
      if (responseAdmin.status === 401) {
        // Handle unauthorized access
        
        alert( responseAdmin.data.msg);
        // You might want to use a notification system or display an error message to the user
      } else if (responseAdmin.status === 200) {
        // Handle successful response
        alert( responseAdmin.data.msg);
        // You might want to use a notification system or redirect the user
        navigate("/adminAcc");
      } else {
        // Handle other status codes
        console.log("Unexpected status code:", responseAdmin.status);
        // You might want to use a notification system or display an error message to the user
      }
    } catch (error) {
      // Handle network issues, timeouts, etc.
      alert("Unauthourized User:", error);
      // You might want to use a notification system or display an error message to the user
    }
  }
  

  function notification (){
    setIsNotiVisible(!isNotiVisible);
    let notiElement = localStorage.getItem('booking');
    console.log(notiElement);
    if (notiElement) {
      
      
      setDynamicElements(prevElements => [...prevElements, notiElement]);
    }
  }
 function  dropDown(){
setIsVisible(!isVisible);
 }
  function handleChange( booking_render){

  }
    return (  

      
        <>
            <nav className={navBar ? 'navBar change': 'navBar'}>
           
            <div className='ColMenu'>
          
        
           </div>
           
           <div className="list-items">
            <div  className={solution ? 'solution change1': 'solution'}>Services</div>
            
            <div className={solution ? 'solution change1': 'solution'}>Contact</div>
            {/* <div className={solution ? 'solution change1': 'solution'}>Helpdesk</div> */}
             </div>


            <div className='services'>

            
            <span id="dropServices" onClick={dropDown}>
        Services 
        
        
        <Icon className={`icon`} style={{ color: isVisible ? 'yellow' : 'grey' }} icon="gridicons:dropdown" />
      </span>
      
          
             {/* {isVisible &&(
             <div  data-aos="slide-down" className={`dropDownContent ${isVisible ? 'open' : ''}`}>

             <div className='rowMenu'>
              <div className='col col1'>
                <h5 id="h1">Humana Resource</h5>
                <hr id="line2"></hr>
                <ul>
                <li>Employees</li>
 <li>Recruitment</li>
<li>Time </li>

<li>Appraisals</li>
<li>Referrals
<li></li>Fleet</li>
              </ul>
              </div>
              <div className="col col2">
              <h5 id='h2'>Services</h5>
              <hr id="line2"></hr>
              <ul>
              <li>Discuss</li>
<li>Feild Services</li>
<li>Track </li>

<li>Helpdesk</li>
<li>Planning</li>
<li>Appointemnt</li>
              </ul>
              </div>

              
              <div className='col col1'>
              <h5 id="h3">Task Management</h5>
              <hr id="line2"></hr>
              
              <ul>
                <li>Task</li>
<li>Projects</li>
<li>Track </li>

<li>Feedbacks</li>
<li>Reports</li>
<li>Task Completed</li>
              </ul>
              </div>
              <div className='col col4'>
              <h5 id="h4">Marketing</h5>
              <hr id="line4"></hr>
              <ul>
                <li>Social Marketing</li>
<li>Email Marketing</li>
<li>SMS Marketing </li>

<li>Events</li>
<li>Surveys</li>
<li>Market Automation</li>
              </ul>
              </div>
             </div>

             <div className="rowMenu2"> 
             
             <div className='col col1'>
                <h5 id="h6">Finance</h5>
                <hr id="line6"></hr>
                <ul>
                <li>Accounting</li>
 <li>Invoicing</li>
<li>Expenses</li>

<li>SpreedSheets</li>
<li>Documents</li>
<li>Sign</li>
              </ul>
              </div>

<div className='col col1'>
                <h5>Productivity</h5>
                <hr id="line2"></hr>
                <ul>
                <li>Purchase</li>
 <li>Rental</li>
 <li>Maintainance</li>
<li>Invetory</li>

<li>Manufacturing</li>
<li id='list'>Knowledge  <span id="noti"><span id="noti_1">new!</span> </span></li>
              </ul>
              </div>
             
             <div className='col col1'>
                <h5  id="h7">Websites</h5>
                <hr id="line2"></hr>
                <ul>
                <li>eLearning</li>
 <li>Live Chat</li>
<li>Meeting</li>

<li>Forum</li>
<li>Blogs</li>

              </ul>
              </div>
             
             </div>
             </div>
             )} */}
            </div>
          
            
   
  
     

  {storedToken ? (
    
    <div className="Container-profile" >
<div className='bell'><Icon icon="bxs:bell" /></div>
    <Icon  id="threeDots" onClick={Profile} icon="ph:dots-three-outline-vertical-fill" /> 
     {isProfileVisible1 ?( 
      
     
      <img  className="avatar_img" src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png" alt="Avatar_img" />  

     ):(
        <img
          onClick={Profile}
          className="avatar_img"
          alt="Profile Image"
          src={imageUrl}
          className="avatar_img" 
          title={ decodedName}
        />
    )}
      
    {isProfileVisible && 
    (<div className="profile-menu">
      <ul>
        <li>{ decodedName }</li> 
        <li onClick={changeImg}>Change Picture</li>
        <li onClick={ChangePassword}>Change Password</li>
        <li>Manage Account</li>
        <li onClick={AdminAcc}>Admin Account</li>

        <li onClick={LogOut}>LogOut</li>
      </ul>
    </div>)}
    {/* <button className="logout"onClick={LogOut}>LogOut</button> */}
  </div>
    

) : (
  <div className='join'>
    <Link  className={link ? 'solution chang2': 'link'} to='/login'>Login</Link>
  </div>
)}
<div className={'subMenu'} style={{ display: display ? "none" :"fixed" }}><Icon icon="ion:menu" /></div>
  {!isNotiVisible &&(
<div className='noti'>
<div>
            {dynamicElements.map((element, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: element }} 
              />
            ))}
          </div>
</div>)}


{/* <video  id="vid" src={Vid} autoPlay loop muted/> */}

<div className={subMenu? 'subMenu changeMenu': ' subMenu'} ><Icon icon="ion:menu" /></div>

             <div id={"vid1"} style={{ display: display ? 'none' : 'flex' }}>
             <div className=" shape ">hhhhhhh</div>
              <div className='rowDisplay'> 

              {/* <div className=" shape ">hhhhhhh</div> */}
              <div className=' colDisplay col_D1'>
               {/* <div className={'subMenu'} style={{ display: display ? "flex" :"flex" }}><Icon icon="ion:menu" /></div>  */}
                <p> <h2 id="h2_header">ConnectBusiness most Trusted, Rate And <br></br>
                Easy to Connect ...</h2>
                <hr id="h2_line"></hr>
                  <span className="header_mgs">You can manage your team from anywhere</span><br></br> <span className="header_mgs">Simplifying day-to-day activities and saves  time</span> <br></br>
                 <span>.....WeConnneted! </span></p>
                
                          
                <Button id="start" onClick={Start}>Start <span data-aos="slide-right"><Icon data-aos="slide-right" data-aos-once="true" data-aos-easing="ease-in-out" id=" start_icon" icon="formkit:arrowright" /></span></Button>
              </div>
              <div className=' colDisplay col_D2'>
              {/* <div className="container curve"> */}
              {/* <div className="shadow "> */}
              {/* <div className="slider"> */}
      {/* <video className="img11"  type="vid/webm" src={Video} autoPlay/> */}
         {/* <img
          
          //  src="https://plus.unsplash.com/premium_photo-1682430910635-849075f57a63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D"
          // src="https://media.istockphoto.com/id/1128550916/vector/isometric-concept-of-social-media-network-digital-communication-chatting-online-chat-man-and.jpg?s=1024x1024&w=is&k=20&c=eKMzlZL2WpjOKXsDbRm718-SU0tgmmJ-nDPtJ7eme8E="
          className="img11"
        />  */}
       
    {/* </div> */}
               
              {/* </div> */}
              {/* <div className=" shape ">hhhhhhh</div> */}
              {/* </div> */}
              {/* <div className=" shape ">hhhhhhh</div> */}
              </div>
              <div className=' colDisplay col_D3'></div>
              
              </div>
             </div> 
             
              
             
            </nav>
            <div className="logo" style={{ color: logo ? 'blue' : 'white' }} >
            ConnectBusiness
              <span className='log1'>
              <Icon id="logo2" icon="carbon:circle-filled" />
              <Icon id="logo3" icon="carbon:circle-filled" />
              <Icon  id="logo4" icon="carbon:circle-filled" />
               
              </span>
              
              </div>
             
               
        </>
        
    );

}

export default Header ;
