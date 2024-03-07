import './Display.css'
import './Admin.css'
import { useState,useEffect,useRef } from "react";
 import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import  Carousel  from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AOS from 'aos'
import { Icon } from '@iconify/react';
import io  from 'socket.io-client'
import 'aos/dist/aos.css'
import ChatBot from 'react-simple-chatbot'
import segment from 'semantic-ui-react'
// import {AdminAcc} from '../Component/AdminAcc'
import { useSelector,useDispatch } from 'react-redux'
import  fetchData  from './actions'; 
import axios from "axios";
import { Link, json } from 'react-router-dom';
import Login from '../Pages/Login'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOMServer from 'react-dom/server';
import Video from '../Component/vid/vid.mp4.webm'
import {jwtDecode} from 'jwt-decode';
const socket = io.connect("http://localhost:8700")
// import { useSelector } from 'react-redux';
// import { useData } from '../Component/DataContext';



 
 



function  Display() {
const [buttonClicked, setButtonClicked] = useState(false);
const [matchOccurred, setMatchOccurred] = useState(false);
// const { copiedArrayData, setCopiedArrayData } = useData();
// const { copiedArrayData } = useData();
const [isListVisible1, setIsListVisible1] = useState(false);
const [Online, setOnline] = useState(false);
const [isListVisible, setIsListVisible] = useState(false);
const[addEmployee, setAddEmployee]=useState(true)
const [ Employeelist1, setEmployeelist1] = useState([]);
const [ EmployeeList, setEmployeelistData]=useState([])
const [ allTaskAssigend, setAllTaskAssigned]=useState([])
const [message, setMessage]=useState("")
const [display, setDisplay ]=useState(false)
const [messageRev, setReceived]=useState("")
const [messages, setMessages] = useState([]);
const [getAllPictures, setAllPictures] = useState([]); 
const [taskAssigned, setTaskAssigned] = useState([]); 
const [receivedMessages, setReceivedMessages] = useState([])
const [timeData, setTimeData] = useState([])
const [typingUser, setTypingUser] = useState('');
const [name, setName]= useState("");
const [increase, setIncrease]= useState(0);
const [increaseData, setIncreaseData]= useState(0);
const [isLoading, setLoading] = useState(false);
const [filterItem, setFilterItem] = useState(false);
const [taskNumber, setTaskNuber] = useState(false);
const [isVisible, setVisible] = useState(false);
const [isVisibleBook, setVisibleBook] = useState(true);
const [isVisiblechat, setVisibleChat] = useState(false);
const [isVisibleTimeSheet, setIsListVisibleTimeSheet] = useState(false);
const [selectedDate, setSelectedDate] = useState(null)
const addEmployeeRef = useRef(null);
const [userId1, setUserId]= useState("");
const [search, setSearch]= useState("");
const [tel, setTel]= useState("");
const [booking, setBooking]= useState([])
const [picturesArray, setPictures]= useState([])
const[fileData, setFileData]=useState([])
const [dynamicElements, setDynamicElements] = useState([]);
const[decodedEmail, setDecodeEmail]=useState("")
 const [imageUrl, setImageUrl] = useState('');
 const[decodedName, setDecodedName]=useState(" ")
 const[decodedId, setDecodedId]=useState(" ")
// const [date, setSelectedDate]= useState("");
const [address, setAddress]= useState("");
const [option, setService]= useState("");
// let token = localStorage.getItem("token")
const navigate = useNavigate()
let  storedNum;
const dispatch = useDispatch();

  
const  data = useSelector((state) => state.data);

  


let token = localStorage.getItem("token")
if (token){
  console.log("token available")
}else{
  console.log("no token")
}

  function ChatDisplay(){
  setVisibleChat(!isVisiblechat)

  }

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

// [setDecodedId,decodedId,setUserId,setOnline,Online,userId1]
  
  useEffect(() => {
    if (data !== null) {
      console.log("Data has been updated:", data);
      const dataArray = Object.values(data);
      console.log("a", dataArray);
  
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        const match = dataArray.some((item) => item.email === decodedEmail);
  
        if (match) {
          console.log("match");
  setIncrease((prevIncrease) => {
    const newIncrease = prevIncrease + 1;
    localStorage.setItem("TaskNum", String(newIncrease));
    return newIncrease;
  });
        } else {
          console.log("No match");
        }
  
        console.log("increase", increase);
      } else {
        console.log("no data");
      }
  
      // Update local state using setTaskAssigned
      setTaskAssigned(data);
  
      // Use a setTimeout to log the state after the next render
      console.log("Task Assigned after the next render:", taskAssigned);
  
      // Check for a specific condition in taskAssigned
      if (Array.isArray(taskAssigned)) {
        taskAssigned.map((item) => {
          console.log("item", item.name);
        });
      }
    }
  }, [data, taskAssigned, decodedEmail, setIncrease, setTaskAssigned]);
  
  useEffect(() => {
    let storedNum = localStorage.getItem("TaskNum");
    const parsedNum = parseInt(storedNum, 10);
    // setIncreaseData(parsedNum);
    if( parsedNum ===null || isNaN(parsedNum) ){
      setTaskNuber(true)
    }else{
      setTaskNuber(!taskNumber)
      setIncreaseData(parsedNum);
    }

  }, [localStorage, setIncreaseData,increaseData]);
  
  // Add this state variable at the top of your component function
 
  
  
  async function GetList() {
    try {
      const response = await axios.get("http://localhost:9000/getEmployeeList");
      console.log("emplo",response);
  
      setButtonClicked(true);
  
      if (response.status === 200) {
        // Update EmployeeList
        setEmployeelistData((prevData) => [...prevData, ...response.data.uniqueArray]);
  
        const newEmployeeId = response.data[0].ID;
      
      
        const newRow =EmployeeList.map((item)=>({
          checked: <input type="checkbox" />,
          ID: newEmployeeId,
          FirstName: item.firstName, // Make sure you have appropriate values here
          LastName: item.lastName,
          Email:item.email,
          Contact: item.contact,
          Contract:item.contract,
          Position:item.position,
          Picture:item.picture,
        }))
  
      setEmployeelist1((prevData) => [...prevData, newRow]);

      } else if (response.status === 201) {
        alert("No Data");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      // Set the button clicked state to true
      setButtonClicked(true);
    }
  }
  



const steps = [
   {
     id: '0',
     message: 'Welcome to ConnectBusiness,How may I assist you?',
     trigger: '1',
   },
   {
      id: '1',
      message: 'Please, type your request below',
      trigger: '2',
    },
   {
     id: '2',
     user: true,
     trigger: 'waiting1',
   },
   
    {
      id: 'waiting1',
    message: 'hi {decodedName}, {previousValue}, Please select your options',
   trigger:'3'
    },
    {
      id: '3',
    options:[
      {value:"house keeping",label:"house keeping", trigger:'4'},
      {value:"Car Wash",label:"Car Wash", trigger:'5'},
      {value:"Personal Care",label:"Personal Care", trigger:'6'},
    ],
    
    },
    {
      id: '4',
      component: (
        <div className='component'  >
          <span>Thanks for selecting house keeping, kindly schedule an appointemnt for our service' <br></br>You need further assistant connect with customer Agent</span>
          <button onClick={Chat}>connect</button>
        </div>
      ),
   end:true
    },
    {
      id: '5',
      component: (
        <div className='component' >
          <p>Thanks for selecting Car Wash, kindly schedule an appointemnt for our service'</p>

          <div>You need further assistant connect with customer Agent</div>
          <button onClick={Chat}>connect</button>
        </div>
      ),
     end:true,
    },
    {
      id: '6',
      component: (
        <div className='component' >
          <p>Thanks for selecting personal care, kindly schedule an appointemnt for our service'</p>

          <div>You need further assistant connect with customer Agent</div>
          <button onClick={Chat}>connect</button>
        </div>
      ),
     end:true
    },
  
 ];
 
 const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,

  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  }
};

const doSpecialThing = () => {
  // Your custom logic here
  console.log('Carousel has moved! Do something special.');
};
const MyCarousel = () => {
  
}
 function Chat(){
  setVisibleChat(true)

 }
// function handleSubmit (event ){
//    event.preventDefault()

//    if (message) {
//     setLoading(true);
//      setMessages(prevMessages => [...prevMessages, message]);
//      socket.emit('send_message', { message });
//      setMessage('');
//      setTypingUser('')
//    }
   
//  }
  async function handleChange(event){
    event.preventDefault();

    let bookInfo = {
     address: address,
    tel: tel,
    option: option,
    selectedDate: selectedDate
    };
    
     try {
       let responseBook = await axios.post("http://localhost:8700/booking", bookInfo);
      console.log(responseBook)
      setBooking(responseBook.data.createBooking)
      
          
      const newElement1 = (
        <div className='render'>
        <>
         <p>Thank you for booking appointment for<span>{booking.option}</span>.<br></br>  
         Our works will be at door step on <span>{booking.selectedDate}</span> with <br></br>
         this <span> {booking.address}</span>.We wil contact you 20 mininutes on <span> {booking.tel}</span>
          Thank you</p>
        </>
        </div>
      );
      
         console.log(newElement1)
         alert("Thank for petronising our services.kindly check your notification")
         setVisibleBook(!isVisibleBook)
         const serializedElement = ReactDOMServer.renderToString(newElement1);

    localStorage.setItem("booking", serializedElement);

        

        
      
     } catch (error) {
       console.error("Error booking:", error);
      }
    
  }



   

//  useEffect(() => {
//   setLoading(false);
//   socket.on('received_message', data => {
//     setReceivedMessages(prevMessages => [...prevMessages, data.message]);
//   });
// }, []);

  useEffect(()=>{
AOS.init({duration:2000})


  },[])

  // socket.on('typing', data => {
  //   setTypingUser(data.username);
  // });

  // useEffect(() => {
  //   // Effect logic here
  
  //   // Cleanup function to remove event listeners when component unmounts
  //   return () => {
  //     socket.off('received_message');
  //     socket.off('typing');
  //   };
  // }, []);

  
// function handleTyping() {
//   socket.emit('typing', { username: 'User' }); 
// }
const handleDateChange = (date) => {
  setSelectedDate(date);
};

function Book (){
setVisibleBook(!isVisibleBook)
}

function startUp(){
  navigate("/login")
}
const Task = async () => {
  
  try {
    const response = await axios.post("http://localhost:9000/getAllTaskAsigned", {
      email: decodedEmail,
    });
 console.log(response)
    if (response.status === 200) {
const fileData= response.data.tasks
const copyFileData={...fileData}
  setFileData((prevData)=>[...prevData, copyFileData])


      const newTasks = fileData.flatMap((task) =>

    
      task.Employee.map((employee, i) => ({
        Title: task.Title,
        ID: task.id,
        Picture:employee.Picture,
        Name: task.Employee.map((employee) => employee.name).join(','),
        Priority: task.Priority,
        File: task.File,
        Message: task.Message,
        AdminName: task.AdminName,
      }))
    );
    //  handleDownload(response.data.tasks);
      setAllTaskAssigned(newTasks);
      console.log(allTaskAssigend)
    } else if (response.status === 201) {
      alert(response.data.msg);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    // Handle the error as needed, e.g., display an error message to the user
  }
  setIsListVisible1(true);
  setIsListVisible(!isListVisible);
  setIsListVisibleTimeSheet(true);
 
 };



 const handleDownload = (event, fileData) => {
  event.preventDefault(); // Prevent the default link behavior
  
  if (Array.isArray(fileData) && fileData.length > 0) {
    console.log("TAAS", fileData);
    fileData.forEach((task) => {
      const taskFileData = task.File;
      console.log( "hel",taskFileData);
      const blob = new Blob([taskFileData]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `file_${task.Title}.txt`;
      link.click();
    });
  }
};




useEffect(() => {
  
  
  localStorage.removeItem("TaskNum");
  setIncreaseData(0);
  // setIsListVisible1(true);
  // setIsListVisible(!isListVisible);
}, []); // Empty dependency array to execute only once on mount

const handleEdit=  ()=>{
 
}
const edit=  ()=>{
 
}
function List (){
  setIsListVisible(true)
  setIsListVisible1(!isListVisible1)
  setIsListVisibleTimeSheet(true)
}
useEffect(() => {
  const fetchData = async () => {
    
    try {
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, [decodedEmail, setAllTaskAssigned, allTaskAssigend]);

const fixedPosition = () => {
  if (addEmployeeRef.current && addEmployeeRef.current.scrollTop > 10) {
    setAddEmployee(false);
  } else {
    setAddEmployee(true);
  }
};

useEffect(() => {
  const element = document.querySelector('.addEmployeeTask'); // You can replace this with your actual selector or use addEmployeeRef.current if applicable

  if (element) {
    addEmployeeRef.current = element;
    element.addEventListener('scroll', fixedPosition);

    // Cleanup the event listener on component unmount
    return () => {
      element.removeEventListener('scroll', fixedPosition);
    };
  }
}, []);

// const taskHeaderClass = addEmployee ? 'task_header' : 'task_header change';
// const headerTitle  = addEmployee1 ? 'newTask' : 'newTask change1';
const taskHeaderClass = addEmployee ? 'task_header' : 'task_header change';
 const headerTitle  = addEmployee ? 'newTask' : 'newTask change1';
 const headerTitle1  = addEmployee ? 'newTask2' : 'newTask2 change2';

 const TimeSheet = ()=>{
  setIsListVisible1(true);
  setIsListVisible(true);
  setIsListVisibleTimeSheet(!isVisibleTimeSheet)
 }


  const Start= async () =>{
    
    try {
      const response = await axios.get("http://localhost:9000/getEmployeeList");
      console.log("use",response);
      if(response.status===200){
      const NewRow = response.data.uniqueArray.map((item)=>({
        Picture:item.Picture,
        Name:item.LastName,
      }))

      setTimeData((prevData)=>[...prevData, ...NewRow])
      console.log("data",timeData)
      setButtonClicked(true)
      

      }
    } catch (error) {
      
    }
  }
  
  useEffect(() => {
    console.log(search);
    console.log(timeData);
  
    if (Array.isArray(timeData) && timeData.length > 0) {
      const findElement = timeData.find((item) => item.Name === search);
      if (findElement) {
        setFilterItem(true)
        console.log("filter",filterItem)
        
        console.log("Found:", findElement);
      } else {
        console.log("Not found");
        setFilterItem(false)
        console.log("filter1",filterItem)
      }
    } else {
      console.log("No data");
    }
  }, [search, timeData,filterItem, setFilterItem]);
  
function Support(){
  // navigate("/AI_support")
 setDisplay(!display)
}








    return ( 
        <> 
        

        {token ?  (
          
<div className= "display_token">
<div className='col-token'>

<h5 style={{color:"white"}}>Field Services</h5>
 <ul>
  <li onClick={List}>Employee List</li>
  <li onClick={Task}>Task {!taskNumber && (<span className="TaskInc" > <span id="taskNum">{increaseData}</span></span>)}</li> 
  <li onClick={TimeSheet}>Time</li>
  <li>Projects</li>
  <li>SpreedSheets</li>
  <li>Discuss</li> 
  <li>Planning</li>
  <li>Purchase</li>
  
  <li>Report</li> 
  

 </ul>
<h5 style={{color:"white"}}>My Documents</h5>
<ul>
<li>Docs</li>
  <li>Submit Task</li>
  <li>Sign Docs</li>
  
</ul>
 </div>
 <div className='col-token1'>

 {!isListVisible && (
  <div >
  <div className='addEmployeeTask'>
    <h4 className={headerTitle} style={{ textAlign: "center" }}> New Task Assigned</h4>
    
    {allTaskAssigend.map((item, i) => (
        <div key={i}>
        
            
        
            <table className="table-img"  >
          <tr>
          <th >
           <span className="text-primary" >Assigned To:</span> 
            <img src={item.Picture} id='img1' alt={`Task Picture ${i}`} /> 
          </th>
      
            <th className="bg-light p-1 text-success">Task 1</th>
            <th><span style={{fontSize:"14px", }} > <span style={{fontSize:"20px", color:"lightcoral"}}>Names:</span>  {Array.isArray(item.Name)? item.Name.join(","):item.Name}</span></th>
          </tr>
        </table>
        

     
      
        <table  key={i} style={{ width: "97%" }} className="table table-bordered text-secondary tableTask" >
          <thead className="text-light">
            <tr>
              <th id="task0"><input className='input2' type='checkbox' /></th>
              <th id="task0">ID</th>
              <th id="task1">Title</th>
              <th>STATUS </th>
              <th>PRIORITY</th>
              <th id="estimate">ESTIMATE</th>
              <th id='startEnd'>START/END</th>
              <th id='startEnd'>PROGRESS, %</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th><input className='input2' type='checkbox' /></th>
              <th>{item.ID}</th>
              <td>{item.Title}</td>
              <td>
                <td>
                  <div className='p-2 mb-2 text-primary  status3' id="status1">
                    not Started
                  </div>
                </td>
              </td>
              <td>{item.Proirity}</td>
              <td id="estimate">6hrs</td>
              <td id='startEnd'>{item.DayTime}</td>
              <td id='startEnd'>
                <div className="Container">
                  <div className="progress-bar progress-bar-striped bg-warning shapeProgressNon" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
                  <span id="per"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>



        <div className="messageTask">
          <p className="p3 border border-primary messageDetails">
            <p style={{fontSize:"15px",fontFamily:"30px"}}>Note:</p><br></br>
            {item.Message}
          </p>
          <div>
  <span>File: {item.File}</span>
  <a href={item.File} onClick={(event) => handleDownload(event, [item])} download={`file_${item.File}.txt`}>Download File</a>
</div>
        </div>

        <div ><hr style={{height:"9px", backgroundColor:"grey", marginTop:"20px", borderRadius:"10px", }}></hr></div>
        </div>
         //
         
      ))}
    </div>
  </div>
)}

       

 {!isListVisible1 &&(
           <div className='addEmployee1'>

            <h4 id="EmployeeData" style={{ textAlign: "center" }}>Employee Data</h4>
            <div className='employee-menu'> 
            <input placeholder='Search' type='search' className='employee search'/>
           
            
            
            <button onClick={GetList} disabled={buttonClicked}   style={{ cursor: buttonClicked ? "not-allowed" : "pointer" }} type="button"  className="btn btn-outline-warning delete"> Get List</button>
            
            </div>
            
            <table>
  <tr>
  <th>Check</th>
    <th>ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Contact</th>
    <th>Contract</th>
    <th>Position</th>
    <th>Picture</th>
  </tr>
  
  <tr>
  <th><input id='input2' type='checkbox'/></th>
  <th>CT01</th>
    <td>Prisca</td>
    <td>Bakam</td>
    <td>zackyaroo31@gmail.com</td>
    <td>6788399020</td>
    <td>Fixed</td>
    <td>Sales Manager</td>
    <td><img style={{width:"50px", height:"30px"}} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"/></td>
  </tr>


  <tr>
  <th><input className='input2' type='checkbox'/></th>
    <td>CT02</td>
    <td>Prisca</td>
    <td>Bakam</td>
    <td>zackyaroo31@gmail.com</td>
    <td>6788399020</td>
    <td>Fixed</td>
    <td>Sales Manager</td>
    <td><img style={{width:"50px", height:"30px"}} src="https://media.istockphoto.com/id/1307791650/photo/headshot-portrait-of-smiling-caucasian-businessman-pose-at-workplace.jpg?s=612x612&w=0&k=20&c=Guj8f7rGyX4tsSszs3qR_NCYDOOvypB6T3eSPEB9GOQ="/></td>
  </tr>

  { EmployeeList.map((row) => (
  <tr key={row.ID}>
    <td>
      <input id='input2' type='checkbox' value={row.ID} data-value1={row.ID} />
    </td>
    <td>{row.ID}</td>
    <td>{row.FirstName}</td>
    <td>{row.LastName}</td>
    <td>{row.Email}</td>
    <td>{row.Contact}</td>
    <td>{row.Contract}</td>
    <td>{row.Position}</td>
    <td><img className='img_Online' style={{width:"50px", height:"30px"}} src={row.Picture}/>
     <span  style={{backgroundColor: Online  ? "green":" red"}}><Icon icon="carbon:dot-mark" /></span>
    </td>
  </tr>
))}


  
</table>



           </div>
           )}
           {/* Add More */}
           
          
         { !isVisibleTimeSheet &&(  <div  className='addEmployeeTask'> 
            <h4 className={headerTitle1} style={{ textAlign: "center" }}> Employee TimeSheet</h4>

            <table className="table-img"  >
          <tr>
          <th  style={{fontSize:"12px"}}>
           <span className="text" ><img src="https://www.qbuildsoftware.com/wp-content/uploads/TimeSheet-Logo-VRT-300x200-alpha-300x200.png"  style={{heigh:"40px",width:"50px"}}/>TimeSheet:</span> 
           <span className="text" >To Validate</span> 
           <span className="text" >Report:</span> 
           

          </th>
      
            <th className="bg-light p-1 text-success"> 
            <span></span></th>
            <th style={{fontSize:"15px"}}>
            
            <span className="text" ><Icon icon="tabler:message-circle-2-filled" /></span> 
            <span className="text" ><Icon icon="flat-color-icons:settings" /></span> </th>
          </tr>
          <div></div>
            
            
        </table>
        <hr></hr>

        <div style={{fontSize:"14px",  marginTop:"-25px", display:"flex",flexDirection:"row" ,backgroundColor:"white", width:"100%", height:"10vh"}}>
          
           <table   >
          <tr>
          <th  style={{fontSize:"14px"}}>
          <span> <Icon style={{height:"30px ", color:"lightcoral"}} icon="mingcute:settings-2-line" />MyTimeSheet</span> 
            <span></span>
            
          </th>
      <th><div>
              <span ><Icon style={{width:"30px"}} icon="mdi:arrow-left-bold" /></span>
              <span  style={{width:"300px"}}>Week<span style={{border:"2px solid lightblue", width:"auto"}}>1</span></span>
              <span><Icon style={{width:"30px"}} icon="mdi:arrow-right-bold" /> </span>
            </div></th>

            <th > 
            <span >
          <input className='  border' placeholder='Search...'   onChange={(e)=>setSearch(e.target.value)} type='search' style={{ height:"4vh",outlineStyle:"none",borderRadius:"10PX" ,textAlign:"center" ,padding:" 2px" }}/></span>
          </th>
          <th>
          <span className=" outline border border-danger " disabled={buttonClicked}   style={{ cursor: buttonClicked ? "not-allowed" : "pointer" }} style={{width:"150px",height:"50px",fontSize:"12px"}} onClick={Start}>  START</span> 
           </th>
          </tr>
       
            
      
        </table>
  
        <hr></hr>
          </div>

          <table className=' table  sm table-striped'>

          

          <thead className="thead-light">
            <tr>
            <th>  <span style={{width:"500px",padding:"4px", fontSize:"14px", height:"100px" ,backgroundColor:"lightgrey"}} >No.</span></th>
            <th><span>Names</span></th>
            <th  className="wide "  ><span style={{width:"500px",padding:"2px", fontSize:"14px", height:"100px" ,backgroundColor:"lightblue"}}>Activities</span>
          </th>
           <th>
            
           </th>
           <th>
          <span>Pic</span>
           </th>
       <th><span>Mon</span></th>
       <th><span>Tue</span></th>
       <th><span>Wed</span></th>
       <th><span>Thur</span></th>
       <th><span>Fr</span></th>
       <th><span>Sat</span></th>
       <th><span>Sun</span></th>
       <th className='wide2'> <span>Hours</span></th>
       
       
            </tr>
          </thead>
        <tbody>
          <tr>
          <td><span>1</span></td>
           <td><span>Zakaria</span></td>
 <td className="wide"  > <span  style={{width:"100px",borderStyle:"1px solid blue"}}>f</span><span>Service meetings</span></td>
 <td></td> 
 <td><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" style={{ width:"40px",height:"40px", borderRadius:"50%"}}/></td>
<td><span>0:00</span></td>
<td><span>20:00</span></td>
<td><span>0:40</span></td>
<td><span>05:00</span></td>
<td><span>0:00</span></td>
<td><span>0:00</span></td>
<td><span>57:00</span></td>

<th className='wide2'> <span>40:00</span></th>

          </tr>

          <tr>
          <th><span>2</span></th>
          <th><span>John</span></th>
 <td className="wide"  > <span  style={{width:"100px",borderStyle:"1px solid blue"}}>f</span><span>Financial Report meeting</span></td>
 <td></td> 
 <td><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" style={{ width:"40px",height:"40px", borderRadius:"50%"}}/></td>
<td><span>10:00</span></td>
<td><span>0:00</span></td>
<td><span>03:40</span></td>
<td><span>05:00</span></td>
<td><span>1:00</span></td>
<td><span>0:00</span></td>
<td><span>7:00</span></td>

<th className='wide2'> <span>20:00</span></th>

          </tr>

      {timeData.map((elem,p)=>(

        <tr
    key={p}
    className={filterItem && elem.Name === search  ? 'selected-row' : ''}
    style={{ backgroundColor: filterItem ? "blue" : "none" }}
  >
          <td><span>1</span></td>
           <td><span>{elem.Name}</span></td>
 <td className="wide"  > <span  style={{width:"100px",borderStyle:"1px solid blue"}}>f</span><span>Service meetings</span></td>
 <td></td> 
 <td><img src={elem.Picture} style={{ width:"40px",height:"40px", borderRadius:"50%"}}/></td>
<td><span>0:00</span></td>
<td><span>20:00</span></td>
<td><span>0:40</span></td>
<td><span>05:00</span></td>
<td><span>0:00</span></td>
<td><span>0:00</span></td>
<td><span>57:00</span></td>

<th className='wide2'> <span>40:00</span></th>

          </tr>
        ))}
        </tbody>
        </table>
            </div>

          )}

 </div>



</div>


          

     
    

        
        ):(
        
         <div className="display" data-aos="zoom-right">
        
            <div className='col-team  team1' >
          
           <div className='collarate'>
           <img id="img-cola" src="https://assets-global.website-files.com/64ad6f1aef87635bd23449f1/64df37ea45605ec049c3f465_life-sciences-value-prop-03-retention-p-800.jpg"/>
           

           </div>
            
            </div>
            <div className='col-team team2' >
            <h1 >Collaborate with your team</h1>
           <p> Performance management, minus the stress<br></br>
ConnectTeam template library makes it easy for people teams to build, launch, and track task that employees and managers look forward to completing.</p>
      
            <button onClick={startUp}  id="start1">Get Started</button>
            </div>
         </div>
         
         )}
         <Link to="/zoom"><button id="elearning" >Meeting...</button></Link> 
            
            
             
        
      
       {token ? ( <div className='row_token'>
       <div className='col-token2 token-liveChat' >
    
       <img  id ="live" src="https://www.isitwp.com/wp-content/uploads/2020/06/live-chat-new-logo.png"/>
       <p>ClickUp is how our teams <br></br>centralizework, stay on track, <br></br>and easily collaborate.</p>
       <button id="elearning1">Chat...</button>
       <div><hr hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
       </div>
      
       <div className='col-token2 token-eLearning' >
      
       <img  id ="live" src="https://tse1.mm.bing.net/th?id=OIP.FSmSdnFcdLkRAlZeGgy8FgHaCe&pid=Api&P=0&h=220"/> 

       <p>With ClickUp we've seen a <br></br> 40% improvement in our total<br></br> go-to-market efficiency!”</p>
     <Link to="/zoom"><button id="elearning" >Meeting...</button></Link> 
      <div><hr hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
       </div>
       
    { display ? ( <div className='col-token2 token-Meetings'>
      
      <img  id ="live" src="https://i.pinimg.com/474x/23/39/7e/23397e66056aa499bcd29359fd7fe322.jpg"/>
      
      <p>ClickUp has helped us 3x <br></br>our productivity without having<br></br> to scale our team.”</p>

      <button id="elearning2" onClick={Support} >eLearning...</button>
      <div><hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
      
       </div>
      ):(
       <diV className=" AI_support1">
        
      </diV>
      )}
       </div>



       ):(  <div className='row' data-aos="zoom-in">
           
            <div className='col-team team2a' >
            <h1 >Connect your Docs to workflows.
</h1>
           <p> Document your business processes, then connect them to workflows with total context. Assign comments with action items, chat in real-time, share attachments, and never miss a beat with notifications that bring everything in one place.</p>
      
            <button onClick={startUp}  id="start2a">Try for Free</button>
            </div>
            <div className='col-team  team1a' >
          
          <div className='collarate'>
          <img id="img-cola" src="https://images.ctfassets.net/w8fc6tgspyjz/5rJSLwm9yolcDZoAbYYAM9/ed937a11385107fb576955578180aa9c/Software_Teams_LP_Tab_IMage_1__Plan__Docs.png?fm=avif&q=50&w=800"/>
          

          </div>
           
           </div>
         </div>
       )}

{token ? (
  <div className='row4-token'>
    <div className="token4">
      <h4 id="event">Events</h4>
    </div>
    <div className="token4 row4Token4 ">
    <h4 id="b">Activities</h4>
    <hr></hr>
 <ul>
  <li>Announcement <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="nimbus:marketing" /></span></li>
  <li>Appointemnts <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="icon-park:appointment" /></span></li> 
  <li>EMS Marketing                 <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="fa-solid:sms" /></span></li>
  <li>Social Marketing <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="zondicons:news-paper" /></span></li>
 </ul>
    </div>
  </div>
):(
         <div className='row4' >
           
           <div className='team4 ' >
           
           <Carousel className="corousel" 
           swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={true}
  slidesToSlide={1}
  autoPlaySpeed={7000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={100}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
  //  deviceType={this.props.deviceType}
dotListClass={false}
   itemClass="carousel-item-padding-0-px"
   
   afterChange={(previousSlide, { currentSlide, onMove }) => {
        doSpecialThing();
      }}
      onMove={({ index, onMove }) => {
        // You can perform custom logic here before the move
        console.log(`About to move to slide ${index}`);
        // You can prevent the move by calling onMove(false);
        // onMove(true) allows the move to proceed
        onMove(true);
      }}
      
  
    >
  <div><img className='display-img' src='https://tse1.mm.bing.net/th?id=OIP.9K0TEi9mdqQuiOCWHEQPlAHaDc&pid=Api&P=0&h=220'/></div>
  <div><img className='display-img' src="https://tse1.mm.bing.net/th?id=OIP.VFyC4NIVUDb0tCXB6Pu1OgHaCe&pid=Api&P=0&h=220"/></div>
  <div><img  className='display-img' src="https://tse2.mm.bing.net/th?id=OIP.BYEEwaj177S0HkfwO12SKAHaFj&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse4.mm.bing.net/th?id=OIP.ChoKuKS3HJbUcDtJ8a0jpgHaEL&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.U8Qsga_hn-UdqO6PuzNPSAHaEK&pid=Api&P=0&h=220"/></div>


  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.VkxFtdfRLPIbksmAIF75pwHaE8&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.xkh7I4BdD1Ecf6nWsMTx2QHaHa&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse2.mm.bing.net/th?id=OIP.zSvVisjWsE4yYtGaqQwXsgHaF7&pid=Api&P=0&h=220"/></div>


  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.VkxFtdfRLPIbksmAIF75pwHaE8&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.xkh7I4BdD1Ecf6nWsMTx2QHaHa&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse2.mm.bing.net/th?id=OIP.zSvVisjWsE4yYtGaqQwXsgHaF7&pid=Api&P=0&h=220"/></div>

</Carousel>;
         
       
     
         

         </div>
          
          </div>
          )}
          
        {token ?(
          <div className="rowDisplay2">
          
            <div className="rowDis_token" >
            
            
            <div className='col-5 first' data-aos="flip-right" >
            <div><span><Icon id='icon-2' icon="mdi:computer" /></span></div>
             <div style={{color:"#ff6666"}}>Get more from your Endpoints</div></div>
            <div className="media">
             <div><span><Icon  id="icon-3" icon="material-symbols:cleaning-bucket" /></span></div>
            <p>Customize cleaning to your business needs</p>
            </div>
            
            <div className="media" >
            
  <div className='col-5 last'>
    
    <div><span><Icon onClick={ChatDisplay} style={{ color:"#1d1160" ,fontSize:"75px",margin:"0px 100px "}} icon="jam:messages-f" /></span></div>
  
  </div>


  {!isVisiblechat &&( 
    <div className='CHAT'>
    <segment> 
    <p  style={{margin:"10px 0px", position:"absolute", zIndex:"10"}}>hellosd</p>
      <ChatBot id="chabotz" steps={steps}  />
    </segment>
  </div>
)}

        
            </div>

           
            </div>
      

        
          </div>
        ):(
          <div className="rowDisplay2" >
        
        <div className='col-team  rowDis1' data-aos="flip-right" >
      
       
       <h1 >Stay ahead of what’s next</h1>
       <p> Organize your work, reminders, and <br></br>calendar events all from your  personalized Home.</p>
       <img id='imgDis' src="https://clickup.com/assets/home-test/stay-ahead.png"/>
       

       
        </div>
        <div className='col-team rowDis2' data-aos="flip-left" >
        
        <video id="video" src={Video} type="video/webm" autoPlay/>
        
        </div>
     </div>


         
        )}
         
         {/* <div className='row4' daa-aos="slide-left">
            

            <div className='col-4'>
               <img id='img' src='https://media.istockphoto.com/id/1410957558/photo/young-housekeeper-woman-holding-bucket-of-cleaning-products-ready-for-cleaning-home-on.jpg?s=1024x1024&w=is&k=20&c=0pjbg-dbjV_lRlSHPtrqs3S0k1XKqbp2VCf193rD_sw='/>
            </div>
            <div className='col-4'>
            <p>The comfort of home can't be beat.Home Care services let people flourish in the everyday life they already known and love-while getting  a little help to stay independent 
            and mobile.Local Home insted Office seek to provide personalized care plans that can offer support to family memberrs and help keep those strong family bonds intact</p>
            
            { token ?  <button  className='book' onClick={Book} >Book appointemnt</button>: navigate("/login")}
              
              {!isVisibleBook && (
                
              <form className="book_file" onSubmit={handleChange}>
              <div className='input_el'>
               <label htmlFor="input-1">Address: 
                <input type="text" autoComplete="on"  className= "input_2" onChange={(event)=>setAddress(event.target.value)} required/>
                </label>
                <label htmlFor="input-1">Tel: 
                <input type="tel" autoComplete="on"  className= "input_2" onChange={(event)=>setTel(event.target.value)} required/>
                </label>
                <label>
                
          Select Service:
          <select onChange={(event)=>setService(event.target.value)}>
            <option value="House Keeping">House Keeping</option>
            <option value="Car warsh">Car Wash</option>
            <option value="Personal Care">Personal Care</option>
            
          </select>
        </label>

        <h2>Select a Date</h2>
        <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)} // Directly pass the date to setSelectedDate
  dateFormat="MM/dd/yyyy"
  placeholderText="Select a date"
/>
{selectedDate && <p>Selected date</p>}

      <button type='submit' className="Book-file" onClick={BookForm} >Book</button>
                </div>
                
              </form>)}
            </div>


            <div className='col-4'>
            {token ? (null):(
<div className='show'> <img id='img' src='https://media.istockphoto.com/id/1343501473/photo/shot-of-a-father-and-his-daughter-washing-their-car-outside.jpg?s=612x612&w=0&k=20&c=geYWSjjL_TndmERVCOOfXaN_IscHVSX93pet3t50TWs='/></div>

)}
{token &&  (
  <>
{!isVisible ?(
            <segment > 
    <ChatBot id="chabotz" steps={steps} />
  </segment>

):(
        <div className='chatBox' floated='right'>
          <div className='message'>
            <p>Messages..</p>
          </div>
          <div className='rowChat'>
            <div className='col_chat message1'>
              <ul >
              
                {messages.map((message, index) => (
                
                  <li key={index}>
    {message} <img
          
          id="icon-img"
          alt="Profile Image"
          src={localStorage.getItem('img')}
          className="avatar_img" 
        /></li>
                ))}
                <div id="space"></div>
              </ul>
              {typingUser && (
          <p>
            {typingUser} is typing<span className='dots'>...</span>
          </p>
        )}
            </div>
            <div className='col_chat received'>
              <ul>

              <div id="space"></div>
                {receivedMessages.map((messageRev, index) => (
                  <li key={index}>{messageRev}<img
          
          id="icon-img"
          alt="Profile Image"
          src={localStorage.getItem('img')}
          className="avatar_img" 
        /> </li>
                ))}
                <div id="space"></div>
              </ul>
            </div>
          </div>
          <div className='messBox'>
            <input
              id='msg_input'
              onChange={event => setMessage(event.target.value)}
              type='text'
              aria-rowspan={10}
              aria-colspan={10}
              maxLength={100}
              value={message}
              placeholder='Type your message....'
            onFocus={handleTyping}
            onBlur={() => setTypingUser('')}
            
          />
            
            <button onClick={handleSubmit} id='msg_btn'>
              Send
            </button>
          </div>
        </div>
        )}
        </> )}
     
      </div>

      <div >
      
      {dynamicElements.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
      </div> */}
    
     
    {/* </div> */}
{token? (null):(
    <div className='row20 ' >
    {/* <p>The comfort of home can't be beat.Home Care services let people flourish in the everyday life they already known and love-while getting  a little help to stay independent 
            and mobile.Local Home insted Office seek to provide personalized care plans that can offer support to family memberrs and help keep those strong family bonds intact</p> */}
    </div>
    )}
        
         
         

        </>
     );
}

export default Display;