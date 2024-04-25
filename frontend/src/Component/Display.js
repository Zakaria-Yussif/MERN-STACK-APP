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
// import ChatBot from 'react-simple-chatbot'
import segment from 'semantic-ui-react'
// import {BarGraph} from './BarGraph';
// import {AdminAcc} from '../Component/AdminAcc'
// import DatePicker from 'react-datepicker';
import { useSelector,useDispatch } from 'react-redux'
import { Bar } from 'react-chartjs-2';
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
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts';
// import { BarChart } from '@mui/x-charts/BarChart';
// import SignaturePad from 'react-signature-pad-wrapper';

const socket = io.connect("https://render-backend-28.onrender.com")




 
 



function  Display() {
const [buttonClicked, setButtonClicked] = useState(false);
const [matchOccurred, setMatchOccurred] = useState(false);
// const { copiedArrayData, setCopiedArrayData } = useData();
// const { copiedArrayData } = useData();
const [isListVisible1, setIsListVisible1] = useState("false");
const [Online, setOnline] = useState(false);
const [isListVisible, setIsListVisible] = useState("false");
const[addEmployee, setAddEmployee]=useState(true)
const [ Employeelist1, setEmployeelist1] = useState([]);
const [ EmployeeList, setEmployeelistData]=useState([])
const [ allTaskAssigend, setAllTaskAssigned]=useState([])
    const[sendingMsg,setSendingMsg]= useState("");
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
const [signature,setSignature]=useState("true")
const [increase, setIncrease]= useState(0);
const [increaseData, setIncreaseData]= useState(0);
const [isLoading, setLoading] = useState(false);
const [filterItem, setFilterItem] = useState(false);
const [taskNumber, setTaskNuber] = useState(false);
const [isVisible, setVisible] = useState(false);
const [isVisibleBook, setVisibleBook] = useState(true);
const [isVisiblechat, setVisibleChat] = useState(false);
const [isVisibleTimeSheet, setIsListVisibleTimeSheet] = useState("false");
const [selectedDate, setSelectedDate] = useState(null)
const addEmployeeRef = useRef(null);
const[event, setEvent]=useState(false)
const [coursel, setCoursel]=useState(false)
const [userId1, setUserId]= useState("");
const [search, setSearch]= useState("");
const [handleAIData, sethandleAIData]= useState("false")
const [tel, setTel]= useState("");
const [Events, setEvents]=useState("Events")
const [booking, setBooking]= useState([])
const [renderMessage, setRenderMessage]=useState([])
const [picturesArray, setPictures]= useState([])
const[fileData, setFileData]=useState([])
const [dynamicElements, setDynamicElements] = useState([]);
const[decodedEmail, setDecodeEmail]=useState("")
 const [imageUrl, setImageUrl] = useState('');
 const[decodedName, setDecodedName]=useState(" ")
 const[decodedId, setDecodedId]=useState(" ")
 const [emsMarketing, setEmsMarketing] = useState(false)
 const [isAppointment,setIsAppointment]=useState(false)
const [social,setSocial]=useState(false)
const [address, setAddress]= useState("");
const [option, setService]= useState("");
const [isReport, setIsReport]= useState("false")
const [submitTask, setSumbitTask]= useState("false")
// let token = localStorage.getItem("token")
const navigate = useNavigate()
let  storedNum;
const dispatch = useDispatch();
const signaturePadRef = useRef(null);
  
const  data = useSelector((state) => state.data);

  


 let token = localStorage.getItem("token")
// let token ="helo"
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
        // alert("Token not exist")
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
      const response = await axios.get("https://render-backend-28.onrender.com/api/employee/getEmployeeList");
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



   


  useEffect(()=>{
AOS.init({duration:2000})


  },[])

  

  

const handleDateChange = (date) => {
  setSelectedDate(date);
};



function startUp(){
  navigate("/login")
}
const Task = async () => {
  
  try {
    const response = await axios.post("https://render-backend-28.onrender.com/api/task/getAllTaskAsigned", {
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
  setSumbitTask(true)
 
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
  setIsReport(true)
  setSumbitTask(true)
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
  setIsReport(true)
  setIsListVisibleTimeSheet(!isVisibleTimeSheet)
  setSumbitTask(true)
 }


  const Start= async () =>{
    
    try {
      const response = await axios.get("https://render-backend-28.onrender.com/api/timSheet");
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

const appoint = ()=>{
  setCoursel(true)
  setIsAppointment(!isAppointment)
  setEmsMarketing(false)
  setSocial(false)
  setEvents("Book Appointment")
}

const marketing = ()=>{
  setCoursel(true)
  setEmsMarketing(!emsMarketing)
  setSocial(false)
  setIsAppointment(false)
}

const socialMedia = ()=>{
  setCoursel(true)
  setSocial(!social)
  setIsAppointment(false)
  setEmsMarketing(false)
}

const report =()=>{
  setIsReport(!isReport)
  setIsListVisible(true)
  setIsListVisible1(true)
  setIsListVisibleTimeSheet(true)
  
}


  // Call the Book function here or place your code here


function Book() {
  setCoursel(!coursel)
  // Create a new div element
  const newElement1 = document.createElement('div');
  newElement1.className = 'render';

  // Create the inner HTML content
  newElement1.innerHTML = `
    <p> On <span>${selectedDate}</span> <span>${sendingMsg}</span> <br>
    with <br>
    the service provider.<br>
    Thank you.</p>
  `;

  // Append the new element to an existing element in the DOM
  const element = document.getElementById('counsel'); // Replace 'counsel' with the actual ID
  if (element) {
    element.appendChild(newElement1);
  } else {
    console.error("Element with ID 'counsel' not found.");
  }

  // Serialize the new element and store it in local storage
  const serializedElement = newElement1.outerHTML;
  localStorage.setItem("booking", serializedElement);

  // Perform any other actions needed
  alert("Thank you for patronizing our services. Kindly check your notifications.");
  
  // Assuming these functions are defined elsewhere in your code
  setEvents("Events");
  setIsAppointment(false);
  
}

 
function submitTaskData (){
  setIsListVisible(true)
  setIsListVisible1(true)
  setIsListVisibleTimeSheet(true)
  setIsReport(true)
  setSumbitTask(!submitTask)
}
 
// Example usage:


const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value: number | null) => `${value}mm`;

const clearSignature = () => {
  signaturePadRef.current.clear();
};

const saveSignature = () => {
  const signatureData = signaturePadRef.current.toDataURL();
  // Here you can do something with the signature data like saving it to a database
  console.log('Signature Data:', signatureData);
  setSignature(false)
};
 

function submitIncident(){
  setSignature(true)
}

function handleAI (){
  sethandleAIData(!handleAIData)
}


const SendMessageData = (e) => {
 console.log("hello")
  e.preventDefault();
  setSendingMsg(e.target.value); 
  console.log(sendingMsg)
  if (sendingMsg.length === 0) {
    console.log("Sorry, message cannot be empty");
  } else {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const Time = hours + ':' + minutes;

    const DataSend = { 
      
      senderId:decodedId, 
      Message: "You"+":" +" " + sendingMsg, 
      
      Time: Time,
      Name: decodedName
    };
    

    
    setRenderMessage(prevState => [...prevState, DataSend]);
  setSendingMsg("")
  }
};




    return ( 
        <> 
        

        {token ?  (
          
<div className= "display_token">
<div className='colToken col-token'>

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
  
  <li onClick={report}>Report</li> 
  

 </ul>
<h5 style={{color:"white"}}>My Documents</h5>
<ul>
<li>Docs</li>
  <li onClick={submitTaskData}>Submit Task</li>
  <li>Sign Docs</li>
  
</ul>
 </div>

 <div className=' colToken col-token1'>

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
    
    </td>
  </tr>
))}


  
</table>



           </div>
           )}
           {/* Add More */}
           
          
         { !isVisibleTimeSheet &&
         (  <div  className='addEmployeeTask'> 
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



          
{!isReport && (
  <div  className='addEmployeeTask' style={{height:"20vh"}}> 
            <h4 className={headerTitle1} id="report" style={{ textAlign: "center", justifyContent:"center" , margin:" 0px 0px"}}> Employee  Report</h4>

            <table className="table"  style={{margin:"30px 0px", fontSize:"20px"}} >
          <tr>
          <th >
           <span className="text-success"  >Name:
             <span style={{borderBottom:"2px solid green"}}>James</span>


             </span> 
          </th>
      
            
            <th><span className="text-success" style={{fontSize:"14px", color:"green" }} > Date of Report: <span  style={{fontSize:"17px",borderBottom:"2px solid green"}}>24/06/2024</span></span></th>
            
          </tr>
          <tr>
            
          </tr>
        </table>

        <table className="table"  style={{margin:"-20px 0px", fontSize:"20px"}} >
          <tr>
          <th >
           <span className="text-success"  >Title/Position:
             <span style={{borderBottom:"2px solid green"}}>General Manager</span>
             </span> 
          </th>
      
            
            <th><span className="text-success" style={{fontSize:"17px", }} > Report Incident Number:<span  style={{fontSize:"17px", borderBottom:"2px solid green"}}>IN063737</span> </span></th>
            
          </tr>
          <tr>
            
          </tr>
        </table>
<div className="incident">
<span className=' bg-success text-white gg ' style={{width:"70%", height:"4vh", color:"white"}}>
  <span style={{color:"white", fontSize:"18PX"}}>EMPLOYEE INCIDENT INFORMATION</span></span>
  <div className='incident_info'>
    <div style={{width:"70%", height:"4vh", color:"green", margin:"20px 0px 20px"}}>
    <span >Employee Explanation of Event </span><br></br>
    <span><textarea 
    rows="4"
    id="incident_input"
        cols="40"
    style={{width:"70%", height:"10vh", outline:"none", borderRadius:"10PX"}} /></span>
  
    </div>
    <div style={{width:"70%", height:"4vh", color:"green", margin:"40px 0px 40px"}}>
    <span >Result of Action Executed, Plannned oR Recommended </span><br></br>
    <span><textarea 
    rows="4"
    id="incident_input"
        cols="40"
    style={{width:"70%", height:"10vh", outline:"none", borderRadius:"10PX"}} /></span>
  
    </div>
    
    <div style={{width:"70%", height:"4vh", color:"green", margin:"40px 0px 20px"}}>
    <span >Any Events Leading to Immediately Following  </span><br></br>
    <span><textarea 
    rows="4"
    id="incident_input"
        cols="40"
    style={{width:"70%", height:"10vh", outline:"none", borderRadius:"10PX"}} /></span>
  
    </div>
  </div>
</div>

<div className="incident_footer">
{/* 
 <div >Signature:<SignaturePad style={{borderBottom:"2px solid green", width:"300px"}} ref={signaturePadRef} />
 {signature ? (<span style={{height:"2vh",  margin:"-100px -100px", position:"absolute"}} > <button style={{margin:" 0px 30px"}} onClick={clearSignature}>Clear</button>
      <button onClick={saveSignature}>Save</button></span>):(null)}
      
      
   </div> */}
<div><input type="checkbox"/> Immediate Following </div>
<div style={{width:"100px", height:"6vh"}} onClick={submitIncident} className='btn btn-outline-danger'>Submit</div>
 </div>


</div>

)}




{submitTask && (
  <div  className='addEmployeeTask' id="sumbitSS" style={{height:"20vh" }}> 
            <h4 className={headerTitle1} id="report2" style={{ textAlign: "center", justifyContent:"center" , margin:" 0px 0px"}}>Submit Task</h4>

            <table className="yu"  style={{margin:"40px 10px"}} >
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
        
        <table className="yu"  style={{margin:"-40px 10px"}} >
          <tr>
          <th  style={{fontSize:"12px"}}>
           {/* <span className="text" ><img src="https://www.qbuildsoftware.com/wp-content/uploads/TimeSheet-Logo-VRT-300x200-alpha-300x200.png"  style={{heigh:"40px",width:"50px"}}/>TimeSheet:</span> 
           <span className="text" ></span> 
           <span className="text" >Report:</span>  */}
           

          </th>
      
            <th className="bg-light p-1 text-success"> 
            <span></span></th>
            <th style={{fontSize:"15px"}}>
{/*             
            <span className="text" ><Icon icon="tabler:message-circle-2-filled" /></span> 
            <span className="text" ><Icon icon="flat-color-icons:settings" /></span> </th> */}
            </th>
          </tr>
          <div></div>
            
            
        </table>

        <div style={{display:"grid",  height:"7vh",gridTemplateColumns:"40% 30% 20%", margin:" 60px 0px", background:"white", borderRadius:"10px"}}>
        <div className="outline-primary">  <input placeholder='Title' style={{ width:"200px", margin:"4px 8px", display:"flex", height:"5vh"}} className="form-control" aria-label="With textarea" /></div>
        <div className="outline-primary">
        <select className="form-select"  style={{ width:"200px", height:"6vh"}} aria-label="Default select example">
  <option selected>Status</option>
  <option value="1">Priority</option>
  <option value="2">Normal</option>
  <option value="3">OverDue</option>
</select>
        </div>
        <div   style={{ width:"200px", margin:"3px 0px", height:"6vh"}} >
        
      <span  onClick={handleAI} className="btn btn-outline-danger" style={{ width:"200px", margin:"0px 0px", height:"6vh"}} >  AI Support</span>


    {!handleAIData && (
      <div  style={{margin:"20px  -90px", width:"400px", display:"flex",  flexDirection:"column",height:"77vh",background:"whiteSmoke", borderRadius:"10px" , boxShadow:" 10px 10px 10px 6px rgba(44,31,31,.4)"}}>
      
      <div style={{ width:"500px", height:"65vh" , margin:"10px 0px", overflowX:"hidden", overflowY:"scroll",}}> 
      {renderMessage.map((item,k)=>(
        <div key="k"  style={{width:"70%",margin:"10px 10px",padding:"4px 4px 4px 3px",borderRadius:"0% 10px 0% 10px",backgroundColor:"white", height:"auto",overflowWrap:"break-word"  }}>
         <p style={{textAlign:"start",color:"lightgrey"}}>{item.Message}</p>
         <span style={{textAlign:"end", right:"30px",margin:"-143px 105px",color:"lightcoral"}}>{item.Time}</span>
          {/* <span style={{left:"30px",color:"lightcoral"}}>{item.Name}</span>  */}
        </div>
      ))}
      
      
      </div>
      
      <div style={{display:"grid",gridTemplateColumns:"60% 30%" ,width:"90%", height:"auto"}}>
        <textarea className="form-control"   onChange={(e) => setSendingMsg(e.target.value)} rows="4" cols="40" style={{width:"300px", margin :"0px 5px", height:"7vh", minHeight:"7vh",}} />
        
<button onClick={SendMessageData } Id="AI_Icon"  style={{margin:"0px 100px 0px ",width:"70px", borderRadius:"0px 10px 10% 10% 0px"}} > <Icon  style={{fontSize:"25px"}}  icon="zondicons:send" /></button>
        <span></span>
      </div>
      </div>)}
        
        
        
        </div>
        </div>
  <div className="submitRT" style={{margin:"-40px 0px"}}>
    <div style={{width:"50%", fontSize:"17x", margin:"10px", backgroundColor:"white", borderRadius:"10PX", height:"6vh", display:"grid", gridTemplateColumns:" 10% 10% 10% 10% 10% 13% 13% 13% 13%"}}>
    <span><Icon style={{fontSize:"20px",fontWeight:"bolder" ,color:"black"}} icon="fluent:text-bold-16-filled" /></span>
<span style={{fontSize:"20px"}}><Icon icon="ph:text-a-underline-bold" /></span>
   
    <span><Icon style={{fontSize:"20px"}}icon="ph:text-italic-bold" /></span>
    <span><Icon  style={{fontSize:"20px"}}icon="ph:text-h-bold" /></span>
    <span><Icon style={{fontSize:"20px"}} icon="ph:text-align-left-bold" /></span>
    <span><Icon  style={{fontSize:"20px"}} icon="ph:text-columns-bold" /></span>
    <span><Icon style={{fontSize:"20px"}}icon="el:fontsize" /></span>
    <span><Icon style={{fontSize:"20px"}}icon="fluent:color-line-16-filled" /></span>
    <span><Icon style={{fontSize:"20px"}}icon="majesticons:share" /></span>

    </div>
    <div style={{width:"80%", margin:"0px -100px", height:"60vh"}}>
      <span style={{width:"80%",height:"4vh", margin:"10px", borderRadius:"10px"}}> 
      </span>
      <span><textarea 
      placeholder="Type here ..."
      class="form-control" aria-label="With textarea"
       onChange={(e) => setSendingMsg(e.target.value)}
    rows="4"
    id="incident_input2"
        cols="40"
    style={{width:"70%", height:"50vh", padding:"3px", outline:"none", borderRadius:"10PX" , margin:"0px 110px"}} /></span>
  <div> 
   



   
  
  </div>
    </div>
    

     
    
  </div>
  
  <div style={{margin:"40px  10px", width:"600px", display:"flex",  flexDirection:"row",height:"10vh",background:"white", borderRadius:"10px" }}>
  
  <div className="outline-primary">  <input placeholder='Task ID' style={{ width:"200px", margin:"4px 8px", display:"flex", height:"5vh"}} className="form-control" aria-label="With textarea" /></div>
  <div className="outline-primary">  <input placeholder='Group Names' style={{ width:"200px", margin:"4px 8px", display:"flex", height:"5vh"}} className="form-control" aria-label="With textarea" /></div>

  </div>


<div className="Reflection"> 

 Reflection


</div>
<div><hr hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>



<div style={{justifyContent:"center", textAlign:"center", margin:"0px 150px"}}>
    <div className="form-check" style={{backgroundColor:"white", margin:"20px", width:"500px", color:"grey"}}>
        <p>Introduction of the Task complete?</p>
      
        <input className="form-check-input"  style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup1" id="flexRadioDefault4_yes" />
        <label className="form-check-label" htmlFor="flexRadioDefault4_yes">
            No
        </label>
    
        <input className="form-check-input"  style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup1" id="flexRadioDefault4_no" />
        <label className="form-check-label" htmlFor="flexRadioDefault4_no">
            Yes
        </label>
    </div>

    <div className="form-check" style={{backgroundColor:"white", margin:"20px", width:"500px", color:"grey"}}>
        <p>Introduction of the Task complete?</p>
      
        <input className="form-check-input" style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup2" id="flexRadioDefault5_yes" />
        <label className="form-check-label" htmlFor="flexRadioDefault5_yes">
            No
        </label>
    
        <input className="form-check-input" style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup2" id="flexRadioDefault5_no" />
        <label className="form-check-label" htmlFor="flexRadioDefault5_no">
            Yes
        </label>
    </div>

    <div className="form-check" style={{backgroundColor:"white", margin:"20px", width:"500px", color:"grey"}}>
        <p>All Task Question Answer?</p>
      
        <input className="form-check-input" style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup6" id="flexRadioDefault5_yes" />
        <label className="form-check-label" htmlFor="flexRadioDefault6_yes">
            No
        </label>
    
        <input className="form-check-input" style={{margin:"-10px 40px"}} type="radio" name="flexRadioGroup6" id="flexRadioDefault6_no" />
        <label className="form-check-label" htmlFor="flexRadioDefault6_no">
            Yes
        </label>
    </div>
</div>


<div style={{width:"200px", margin:"20px 400px", height:"6vh"}} onClick={submitIncident} className='btn btn-outline-success'>Submit Task</div>
 
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
           <p id="minorP"> Performance management, minus the stress<br></br>
ConnectTeam template library makes it easy for people teams to build, launch, and track task that employees and managers look forward to completing.</p>
      
            <button onClick={startUp}  id="start1">Get Started</button>
            </div>
         </div>
         
         )}
         
            
            
             
        
      
       {token ? ( 
        
        <div className='row_token' >
       <div className='col-token2 token-liveChat' >
    
       <img  id ="live" src="https://www.isitwp.com/wp-content/uploads/2020/06/live-chat-new-logo.png"/>
       <p>ClickUp is how our teams <br></br>centralizework, stay on track, <br></br>and easily collaborate.</p>
       <button  id="elearning1">Chat...</button>
       <div><hr hr style={{height:"5px",backgroundColor:"coral", borderRadius:"7px"}}></hr></div>
       </div>
      
       <div className='col-token2 token-eLearning' >
      
       <img  id ="live" src="https://tse1.mm.bing.net/th?id=OIP.FSmSdnFcdLkRAlZeGgy8FgHaCe&pid=Api&P=0&h=220"/> 

       <p>With ClickUp we've seen a <br></br> 40% improvement in our total<br></br> go-to-market efficiency!”</p>
     <Link to="/zoom"><button id="elearning" >Meeting...</button></Link> 
      <div><hr hr style={{height:"5px",backgroundColor:"pink", borderRadius:"7px"}}></hr></div>
       </div>
       
     <div className='col-token2 token-Meetings'>
      
      <img  id ="live" src="https://i.pinimg.com/474x/23/39/7e/23397e66056aa499bcd29359fd7fe322.jpg"/>
      
      <p>ClickUp has helped us 3x <br></br>our productivity without having<br></br> to scale our team.”</p>

      <Link to="/AI_support"> <button id="elearning2" onClick={Support} >eLearning...</button></Link>
      <div><hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
      
       </div>
  
       
      
       </div>



       ):(  
        
        <div className='rowMe' >
           
            <div className='col-team team2a' >
            <h3  style={{color:"#00000"}}>Connect your Docs to workflows.
</h3>
           <p id="pp" style={{color:"white"}}> Document your business processes, then connect them to workflows with total context. Assign comments with action items, chat in real-time, share attachments, and never miss a beat with notifications that bring everything in one place.</p>
      
            
            </div>
            <div className='col-team  team1a' >
            
          <div className='collarate2'>
          <button to="/login" style={{ margin:"190px 0px"}} onClick={startUp}  id="start2a">Try for Free</button>
          <img id="img-cola" src="https://images.ctfassets.net/w8fc6tgspyjz/5rJSLwm9yolcDZoAbYYAM9/ed937a11385107fb576955578180aa9c/Software_Teams_LP_Tab_IMage_1__Plan__Docs.png?fm=avif&q=50&w=800"/>
          

          </div>
           
           </div>
         </div>
       )}

{token ? (
  <div className='row4-token'>
    <div className="token4 row4Token3">
      
      <h4 id="b" >Activities</h4>
    <hr></hr>
 <ul>
  <li>Announcement <span  style={{color:" #774040", fontSize:"22px"}}><Icon className="icon-small icon1" icon="nimbus:marketing" /></span></li>
  <li onClick={appoint}>Appointemnts <span id="icon-small"  style={{color:" #774040", fontSize:"22px"}}><Icon  className="icon-small icon2" icon="icon-park:appointment" /></span></li> 
  <li onClick={marketing}>Work Schedules                <span  style={{color:" #774040", fontSize:"22px"}}><Icon  className="icon-small icon3" icon="fa-solid:sms" /></span></li>
  <li onClick={socialMedia}>Social Marketing <span style={{color:" #774040", fontSize:"22px"}}><Icon  className="icon-small icon4" icon="zondicons:news-paper" /></span></li>
 </ul>
    </div>
    <div className="token4 row4Token4 " >
    <h4 id="event" style={{color:"white"}}>{Events}</h4>
    {coursel ? (
    <div style={{justifyContent:"center", textAlign:"center", margin:"20px 100px"}}>
        {isAppointment && (
            <div className="appoint">
            
               
               <div className="appoint2">
               <div style={{ display:"flex", flexDirection:"column" ,width:"100%", justificationContent:"start", right:"20px"}}>
               <span className='btn btn-outline-warning' style={{margin:"0px 0px"}}>Select Person <Icon icon="ri:arrow-drop-down-line" /></span>
          <span className='renderBooking'>render</span>
               </div>
               <div style={{ display:"flex", flexDirection:"column", margin:"0px 50px", width:"100%"}}>

              <span> Date & Time  <DatePicker
        selected={selectedDate}
        className='outline-primary'
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        // timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
    </span>


            <span> 
            Message...
            <textarea 
              style={{width:"300px"}}
        className="outline-primary "
        // value={sendingMsg}
        // ref={inputRef} 
        //  onChange={handleTyping}
    onChange={(e) => setSendingMsg(e.target.value)}
        rows="4"
        cols="40"
      > </textarea></span>

      <span  onClick={Book} className='btn btn-outline-primary'>Book</span>
               </div>
               </div>
            </div>
        )}
        {emsMarketing && (
            <div>
              emsmkerting
            </div>
        )}
        {social && (
            <div>
                social Media
            </div>
        )}
    </div>
) : (
    <div>
    <Carousel className="corousel" Id="cousel"
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
  
  <div>
  
  </div>
  <div><img className='display-img' src="https://tse3.mm.bing.net/th?id=OIP.xkh7I4BdD1Ecf6nWsMTx2QHaHa&pid=Api&P=0&h=220"/></div>
  <div><img className='display-img' src="https://tse2.mm.bing.net/th?id=OIP.zSvVisjWsE4yYtGaqQwXsgHaF7&pid=Api&P=0&h=220"/></div>

</Carousel>;




    </div>
)}




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
          <div className="rowDisplay2" style={{marginTop:"1700px"}}>
          
            <div className="rowDis " >
            
            
            <div className='col-5 first' data-aos="flip-right" >
            <div><span><Icon id='icon-2' icon="mdi:computer" /></span></div>
             <div >Get more from your Endpoints</div></div>

            <div className="media rowDis4" data-aos="zoom-in" style={{marginLeft:"13px"}}>
             <div><span><Icon  id="icon-3" icon="material-symbols:cleaning-bucket" /></span></div>
            <p  style={{ marginLeft:"-12px"}}>Customize cleaning to your business </p>
            </div>
            
            <div className="media rowDis4"  >
            
  <div className='col-5 last'>
    
    <div><span><Icon onClick={ChatDisplay} id="jamMessage" style={{ color:"#1d1160" ,fontSize:"75px",margin:"0px 30px "}} icon="jam:messages-f" /> Help desk</span></div>
  
  </div>


  
        
            </div>

           
            </div>
      

        
          </div>
        ):(
          <div className="rowDisplay23"  >
        <div> <img id="ppImage" src="https://electricui.com/static/26bbca20980ee1b16b1bd8708998b8b0/BarChart-spectrometer-axis-desktop.png" /></div>
        <div> <img id="ppImage" src="https://assets.barchart.com/img/trading-strategies.png" /></div>
        <div> <img  id="ppImage" src="https://blog.cloudxlab.com/wp-content/uploads/2021/01/Cover-1.png"  /></div>
        
     </div>


         
        )}



        {token ?(
          null
        ):(
          <div className='col-teamVideo rowDis2' >
        
        <video id="video" src={Video} type="video/webm" autoPlay style={{height:"60vh" ,marginTop:"-20px"}}/>
        
        </div>
        )}
         
        {token? (
         null
        ):(

          <div  className="stayHead" >
          <div className='col-teamHead  rowDis1' style={{boxShadow:" 10px 5px 10px 10px rgba(44,31,31,.3)"}} >
      
       
      <h1 >Stay ahead of what’s next</h1>
      <p style={{padding:"2px"}}> Organize your work, reminders, and <br></br>calendar events all from your  personalized Home.</p>
      <img id='imgDis' src="https://clickup.com/assets/home-test/stay-ahead.png"/>
      

     
       </div>

       <div  className="col-teamHead  stopHead" id="stop" > 
       
      <h1 >Stay ahead of what’s next</h1>
      <p style={{padding:"2px"}}> Organize your work, reminders, and <br></br>calendar events all from your  personalized Home.</p>
      <img id='imgDis'  src="https://d1l7hzv7igdihb.cloudfront.net/img/help/topPicksHero.png"/> 
      

       
      </div>
       </div>
        )}
    
{token? (
  <div className="row20">
  <h3>Employee Progress</h3>
  {/* <BarChart id="barChart"
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    /> */}

  </div>
):(
    <div className='row20 ' style={{width:"97%",color:"white", padding:"4px" ,height:"auto"}} >
    <p>The comfort of home can't be beat.Home Care services let people flourish in the everyday life they already known and love-while getting  a little help to stay independent 
            and mobile.Local Home insted Office seek to provide personalized care plans that can offer support to family memberrs and help keep those strong family bonds intact</p> 
    </div>
    )}
        
         
         

        </>
     );
}

export default Display;
