import './Display.css'
import { Icon } from '@iconify/react';

// import { dropdown } from '../Component/Header';
import { useState } from 'react';
 





function  Footer() {
  const[footer, setfooter]=useState("false")
  const[footer1, setfooter1]=useState("false")

  const boxShadow=()=>{
    if(window.scrollY >=100){
      setfooter(true)
     } else{
      setfooter(false)
    }
  }
  const ShowFooter=()=>{
    if(window.scrollY >=1120){
      setfooter1(true)
     } else{
      setfooter1(false)
    }
  }
  window.addEventListener("scroll",boxShadow)
  window.addEventListener("scroll",ShowFooter)
  console.log(window.scrollY)
    return ( 
      <>
        <div className={footer || footer1 ? 'footer changeFooter, footerShow': 'footer'} >
           
            <div className='rowMenu'>

              <div className='col col1'>
                <h5 id="h1">Humana Resource</h5>
                <hr id="line2"></hr>
                <ul>
                <li>Employees</li>
 <li>Recruitment</li>
<li>Time </li>

<li>Appraisals</li>


              </ul>
              </div>
              <div className="col col2">
              <h5 id='h2'>Services</h5>
              <hr id="line2"></hr>
              <ul>
              <li>Discuss</li>
<li>Feild Services</li>


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
<li>Invetory</li>

<li>Manufacturing</li>
<li id='list'>Knowledge  <span className="new"><span id="noti_1">new!</span> </span></li>
              </ul>
              </div>
             
             <div className='col col2'>
                <h5  style={{color:"green"}} id="h7">Websites</h5>
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
             
    
          
         </>
     );
}

export default Footer;