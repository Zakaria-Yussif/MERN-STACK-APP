import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../Component/Admin.css'
import { Icon } from '@iconify/react'
import { Checkbox } from 'semantic-ui-react';
import { FaStar } from 'react-icons/fa'
import Display from '../Component/Display'
// import DatePicker from 'react-datepicker';
// import { useData } from '../Component/DataContext';
import { useDispatch } from 'react-redux';
// import { updateData } from './actions';
import DatePicker from 'react-datepicker';
// import ProgressBar from './ProgressBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from 'jwt-decode';
 import 'bootstrap/dist/css/bootstrap.min.css';
//  import { useDispatch } from 'react-redux'; 
import { updateData } from './actions'



function AdminAcc() {
  const dispatch = useDispatch();
  const [adminContent, setAdminContent] = useState(null);
  const [error, setError] = useState(null);
  const [isInputVisible, setInputVisible] = useState("false");
  const [isInputVisible1, setInputVisible1] = useState("false");
  const [isListVisible, setListVisible] = useState("false");
  const [isListVisible1, setListVisible1] = useState("false");
  const [isEmployee, setEmployee] = useState("false");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [contract, setContract] = useState("");
  const [position, setPosition] = useState("");
  const [picture, setPic] = useState("");
  const [email, setEmail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [tableData, setTableData] = useState([]);
 const [edit, setEdit] = useState("false");
 const [add, setAdd] = useState("false");
 const [ delete1, setDelete1] = useState("false");
 const [ delete2, setDelete2] = useState("false");
 const [ deleteEmployee, setDeleteEmployee] = useState("");
   const [checkEmployee, setCheckEmployee]=useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
const [ EmployeeList, setEmployeelist]=useState([])
const [ copiedArray, setCopiedArray]=useState([])
const [newEmployee, setNewEmployee] = useState({});
const [percentage, setPercentage] = useState(0);
const [progress, setProgress] = useState(0);
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [hours, setHours] = useState("");
const [priority, setProity] = useState("");
const [title, setTitle] = useState("");
 const [CheckRows, setCheckRows] = useState([]);
const [rating, setRating] = useState(0);
const [allPictures, setAllPictures] = useState([]);
const [fileData, setFileData] = useState([]);
const[taskArry, setTaskArry]= useState([])
const[taskPictureArry, setTaskPictureArry]= useState([]);
const [timeRemaining, setTimeRemaining]=useState("");
const[message, setMessage]= useState("");
const [selectedDate, setSelectedDate] = useState(null);
const [days, setDays] = useState(0);
const [days1, setDays1] = useState("");
const [selectedFile, setSelectedFile] = useState(null);
 const[decodedName, setDecodedName]=useState(" ")
const[assignedAllTask, setassignedAllTask]=useState([])
  const[storedDate, setStoreDate]=useState([])
  const[addEmployee, setAddEmployee]=useState(true)
  const[task_header, setTask_Header]=useState(false)
  const addEmployeeRef = useRef(null);
  const[EmployeeData, setEmployeeData]=useState([])
const [dateTime, setDateTime]=useState([])



useEffect(() => {
  let storedToken = localStorage.getItem('token');
  if (storedToken) {
     const decoded= jwtDecode(storedToken)
     console.log("token33" ,decoded)
     if (decoded){
    
       
      // setDecodedEmail(decoded.findEmail)
    
       setDecodedName(decoded.findName)
      //  setDecodedId(decoded.userId)
      }
    }else{
     
    }
    //  if (!decoded){
    //   alert("Admin Authentification invalid")
    //  }
    //  setDecodeEmail(decodedEmail)
    //  setDecodedName(decodedName)
  
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://render-backend-28.onrender.com/api/admin/adminAcc");
        setAdminContent(response.data.msg); //
     if(response.status===200){
      alert(response.data.msg)
     } else if(response.status===409){
      alert(response.data.msg)
     }

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  

  const Save = async (min, max) => {
 
    
    min =100;
    max =99;
    const newId = ' CTC' + Math.floor(Math.random() * (max - min +1)) + min;
   
    
      // Store the Base64-en
   
    const newEmployee = {
      ID: newId,
      
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Contact: contact,
      Contract: contract,
      Position: position,
      // Picture:picture,
    };
  
    // Check if any field is empty
    if (!Object.values(newEmployee).some(value => value === "")) {
      const newRow = {
       
        checked: <input type="checkbox" />,
        ID:newId, // Use the updated ID
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Contact: contact,
        Contract: contract,
        Position: position,
        // Picture: picture,
      };
  
      // Update state using functional form of setState
      // setEmployeelist(prevData => [...prevData, newRow]);

      if(newEmployee){
        console.log(newEmployee)
        let response= await axios.post("https://render-backend-28.onrender.com/api/employee/employeeList", newEmployee )
       console.log(response)
         
        }
        setEmployeelist(prevData => [...prevData, newRow]);
      setInputVisible(!isInputVisible)
      // Update state for individual fields
      setContact("");
      setContract("");
      setEmail("");
      setId("");
      setFirstName("");
      setLastName("");
      setPic(null);


   
    } else {
      alert("Fill in all inputs");
    }
  };

  

  
  const AddEmployee2 = (newRow)=>{
setInputVisible(!isInputVisible)
// setEmployeelist((prevData) => [...prevData, newRow]);


  }
 function EmployeeGet(){
  setListVisible1(!isListVisible1);
setListVisible(true)
 }

 
  async function GetList() {
    try {
    
      // Assuming newEmployee is defined somewhere in your component state or props
     
  
      const response = await axios.get("https://render-backend-28.onrender.com/api/employeee/getEmployeeList");
      console.log(response);
      setButtonClicked(true)
      // Update list visibility
      // setListVisible1(!isListVisible1);
      // setListVisible(true);
  
      if (response.status === 200) {
        // Update EmployeeList
        EmployeeList.push(...response.data.uniqueArray);
        console.log(EmployeeList);
  
        // Assuming response.data contains an array of employees and each has an 'ID' property
        const newEmployeeId = response.data[0].ID;
  
        // Create a new row for Employeelist
        const newRow = {
          checked: <input type="checkbox" />,
          ID: newEmployeeId, // Use the updated ID
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Contact: contact,
          Contract: contract,
          Position: position,
          Picture: picture,
        };
  
        // Update Employeelist
        setEmployeelist((prevData) => [...prevData, newRow]);
      }
       if (response.status===201){
        alert("No Data ")
      }
      


      setButtonClicked(true)

    } catch (error) {
      // Handle errors here if needed
      console.error("Error fetching employee data:", error);
    }
  }
  
 function Edit(){
 setEdit(!edit)



 }


 const handleCheckboxChange = (e) => {
  const checkboxValue = { _id: e.target.value };
  setDeleteEmployee({...checkboxValue})
  // console.log(deleteEmployee)
  console.log("After setDeleteEmployee:", deleteEmployee);
  console.log(checkboxValue)
  if (e.target.checked) {
   setSelectedRows((prevSelectedRows) => {
  const isIDAlreadySelected = prevSelectedRows.some((item) => item.ID === checkboxValue.ID);

  if (!isIDAlreadySelected) {
    // Add the new checkboxValue only if the ID is not already in the array
    return [...prevSelectedRows, checkboxValue];
  }

  // Return the existing array without adding the duplicate ID
  return prevSelectedRows;
});
  } else {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((value) => value.ID !== checkboxValue.ID)
    );
    console.log(selectedRows);
  }
};

const handleEdit = async (id, field, value) => {
  const rowIndex = tableData.findIndex((row) => row.id === id);
  const updatedTableData = [...tableData];
  updatedTableData[rowIndex] = { ...updatedTableData[rowIndex], [field]: value };
  updatedTableData.push(...selectedRows);
  setTableData(updatedTableData);
  // console.log(updatedTableData);
 
  const pushTableData =updatedTableData.length > 0 ? updatedTableData[0] : null;

  console.log(pushTableData)
  
  try {
    const response = await axios.post("https://render-backend-28.onrender.com/api/employee/employeeUpdates", pushTableData);
    console.log(response);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};


const DeleteEmployee =async()=>{

}

const Delete = () => {
  // console.log('deleteEmployee:', deleteEmployee);
  // console.log('selectedRows:', selectedRows);

  if (selectedRows.length === 0) {
    alert("Please, check the box first");
  } else {
    // Perform actions when deleteEmployee is not null
    setDelete1(!delete1);
  }
};


const Yes = async () => {
  console.log('deleteEmployee:', deleteEmployee);
  console.log('selectedRows:', selectedRows);

  try {
    const response1 = await axios.post("https://render-backend-28.onrender.com/api/employee/deleteEmployeeInfo", deleteEmployee);
    console.log(response1)

    if(response1.status===200){
      alert(response1.data.msg)
      setDelete1(true)
      window.location.reload();
    }
  } catch (error) {
    console.log("error delete")
  }
  
  
  
};

const Refresh = async () => {
  window.location.reload();;
  
  
};
 
const handlePercentageChange = (newPercentage) => {
    setPercentage(newPercentage);
  };

const No =  () => {

   setDelete1(true)
  
};


const GetEmployee2 = async ()=>{
  try {
    setButtonClicked(true)
    const response = await axios.get("https://render-backend-28.onrender.com/api/pictures/getAllPictures");
    console.log(response);
    if (response.status === 200) {

      
      const newRows2 = response.data.findAllPictures.map((item) => ({
        userId:item.userId,
        Picture: item.Picture, // Use the correct property from your response data
        name: item.name, 
        email:item.Email// Use the correct property from your response data
      }));

      setAllPictures((prevData) => [...prevData, ...newRows2]);
      // setButtonClicked(true)
      console.log("allPictures",allPictures)
    }
  } catch (error) {
    // Handle error
  }
   
}
 
  function Assign(){
setListVisible(!isListVisible)
setListVisible1(true)

  }
   

  const handleStarClick = (index) => {
    // When a star is clicked, update the rating state
    setRating(index + 1);
  };

  const calculatePercentage = () => {
    // Calculate the percentage based on the selected rating
    return (rating / 5) * 100;
  };
  
 async function addTask (){
    setInputVisible1(!isInputVisible1)
    setAdd(!add)
    
    const newRow={

    }
    
 }


function handleCheckboxAssign(e) {
  const checkboxValue = { ID: e.target.value };
  console.log('checkValue', checkboxValue);
  let updatedCheckRows;
  if (e.target.checked) {
    setCheckRows((prevCheckRows) => {
      let updatedCheckRows = [...prevCheckRows, checkboxValue];
      console.log('Updated state:', updatedCheckRows);
      console.log('Previous state:', prevCheckRows);

      // Use the updated state in the forEach loop
      console.log('allPictures', allPictures);
      allPictures.forEach((item) => {
        // console.log('Processing item:', item);

        // Assuming 'ID' is the correct property name for comparison
        const isMatched = updatedCheckRows.some((row) => row.ID === item.userId);

        if (isMatched ) {
          console.log('Matched item:', item);

          // Assuming 'ID' is the correct property name for taskArry
          setTaskArry((prevTaskArry) => [...prevTaskArry, item ]);
          
        }
      });

      return updatedCheckRows;
    });
  } else{
    setCheckRows((prevCheckRows) => {
      const filteredCheckRows = prevCheckRows.filter((item) => item.ID !== checkboxValue.ID);
      console.log('Filtered state:', filteredCheckRows);
      return filteredCheckRows;
    });
    setTaskArry((prevTaskArry) => prevTaskArry.filter((item) => item.ID !== checkboxValue.ID));

  }
 
}

const handleDateChange = (date) => {
  setSelectedDate(date);
};




useEffect(() => {
  const updateTimer = () => {
    if (selectedDate) {
      const currentTime = new Date();
      const difference = selectedDate - currentTime;
      const days = Math.floor(difference / 1000 / 60 / 60 / 24);
      const hours = Math.floor((difference / 1000 / 60 / 60) % 24);
      const secondsRemaining = Math.floor(difference / 1000);
  
  console.log(days)

      if (secondsRemaining <= 0) {
        clearInterval(timer);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(secondsRemaining);
      }
      setDays(days);

      // Update the state variable for days only if it has changed
      if (days !== days) {
        setDays(days);
        console.log(days)
      }
    }
  };

  const timer = setInterval(updateTimer, 1000);

  return () => clearInterval(timer);
}, [selectedDate, days]); // Include 'days' in the dependency array

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}:${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


const handleFileChange = (event) => {
  // Get the selected file from the input event
  const file = event.target.files[0];
  setSelectedFile(file);
};

const SelectEmployee = async (min,max) => {
  console.log(taskArry);

  if (taskArry.length === 0) {
    alert("Please, Select Employee");
    return;
  }

  const finalArray = taskArry.filter((value, index, self) => self.indexOf(value) === index);
  console.log("finalarrty",finalArray);

  setTaskPictureArry(finalArray);
  console.log("FINAL", taskPictureArry);
  console.log(finalArray);
  
  let file = null
  if (selectedFile) {
   
   file= selectedFile
   console.log(file)
  }

  console.log(decodedName)

  min =100;
  max =999;
  const newId = ' TAS' + Math.floor(Math.random() * (max - min +1)) + min;
  
  const newRow = {
    id:newId,
     Title: title,
  
    
     Priority: priority,
      DayTime: selectedDate,
    //  Time: time,
    //  Day:day,
   };

   setassignedAllTask((prevTask)=>[...prevTask, newRow])

  try {
    const sendTask = {
     AdminName:decodedName,
     id:newId,
      Title: title,
      Employee: finalArray,
      Priority: priority,
      DayTime: selectedDate,
      File: file,
      Message: message,
    };

    console.log("Sending Task:", sendTask);

    const responseTask = await axios.post("https://render-backend-28.onrender.com/api/task/task", sendTask);

    console.log( responseTask);
    
      if(responseTask.status===200){
 
  const TaskAssigned = responseTask.data.task.Employee
  
let copiedArrayData1=[]
 copiedArrayData1 = {...TaskAssigned};
console.log("Deep Copied Array:",copiedArrayData1);

if (copiedArrayData1){
  
  
    dispatch(updateData(copiedArrayData1))
  
    
}
  


  



 console.log(TaskAssigned)

  if(Array.isArray(TaskAssigned)){
    
   
    const newRows2 = TaskAssigned.map((item) => ({
      Priority: item.Priority,
      // Name: item.Employee.Name,
      // Picture:item.Employee.Picture,
      Title: item.Title,
      DayTime: item.DayTime,
      id:item.id,
    }));
    console.log("New", newRows2);
    setassignedAllTask((prevData) => [...prevData, ...newRows2]);
    console.log(assignedAllTask);
    // <Display data={assignedAllTask} />
  
      }

      setDate("")
      setProity(" ")
      alert("Task Assigned Successfully")
      setAdd(true)
      setInputVisible1(true)
      
     
    }
  //  return <Display data={copiedArrayData} />
  } catch (error) {
    console.error("Error sending task:", error);
    // Handle the error if needed
  }
};
 
function HandleChange(){
  setAdd(true)
 setInputVisible1(true)}

 const Task = async () => {
  try {
    const getAllTask = await axios.get("https://render-backend-28.onrender.com/api/task/getAlltask");
    console.log("res", getAllTask);

    if (getAllTask.status === 200) {
      const updatedDateTime = [];
      const updatedAssignedAllTask = [];

      getAllTask.data.uniqueArrayTask.forEach((item) => {
        item.Employee.forEach((employee) => {
          console.log(employee)
          const currentTime = new Date();
          const targetTime = new Date(item.DayTime);
          const difference = targetTime - currentTime;
          const secondsRemaining = Math.floor(difference / 1000);
          const days = Math.floor(secondsRemaining / 86400);
          const hours = Math.floor((secondsRemaining % 86400) / 3600);
          const minutes = Math.floor((secondsRemaining % 3600) / 60);
          const remainingSeconds = secondsRemaining % 60;

          const newRows = {
            checked: <input type="checkbox" />,
            ID: item.id,
            Title: item.Title,
            Name: employee.name,
            Picture:employee.Picture,
            Priority: item.Priority,
            Time: item.DayTime,
            Day: days,
          };

          updatedAssignedAllTask.push(newRows);
        });

        updatedDateTime.push(item.DayTime);
      });

      setDateTime(updatedDateTime);
      setassignedAllTask(updatedAssignedAllTask);

      const timer = setInterval(() => {
        // Your timer logic here
      }, 1000);

      return () => clearInterval(timer);
    } else if (getAllTask.status === 201) {
      alert("No Data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed (e.g., show an error message to the user)
  } finally {
    setButtonClicked(true);
  }
};



      


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

  const taskHeaderClass = addEmployee ? 'task_header' : 'task_header change';
 const headerTitle  = addEmployee ? 'h4' : 'h4 change1';

 const DeleteTask = async () => {
  // Assuming selectedRows1 and deleteEmployee are defined elsewhere in your code.

  if (selectedRows1.length === 0) {
    alert("Please, check the box first");
  } else {
    // Perform actions when deleteEmployee is not null
    console.log('deleteEmployee:', deleteEmployee);
    console.log('selectedRows:', selectedRows1);

    try {
      const response1 = await axios.post("https://render-backend-28.onrender.com/api/task/deleteEmployeeTask", deleteEmployee);
      console.log(response1);

      if (response1.status === 200) {
        alert(response1.data.msg);
        
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle errors as needed
    }
  }
};



const Yes1 = async () => {
  console.log('deleteEmployee:', deleteEmployee);
  console.log('selectedRows:', selectedRows);

  try {
    const response1 = await axios.post("https://render-backend-28.onrender.com/api/employee/deleteEmployeeInfo", deleteEmployee);
    console.log(response1)

    if(response1.status===200){
      alert(response1.data.msg)
      setDelete1(true)
      window.location.reload();
    }
  } catch (error) {
    console.log("error delete")
  }

  
};
 function No1() {
  setDelete2(true)
 }
const handleCheckboxChangeTask = (e) => {
  const checkboxValue = { _id: e.target.value };
  setDeleteEmployee({...checkboxValue})
  // console.log(deleteEmployee)
  console.log("After setDeleteEmployee:", deleteEmployee);
  console.log(checkboxValue)
  if (e.target.checked) {
   setSelectedRows1((prevSelectedRows1) => {
  const isIDAlreadySelected = prevSelectedRows1.some((item) => item.ID === checkboxValue.ID);

  if (!isIDAlreadySelected) {
    // Add the new checkboxValue only if the ID is not already in the array
    return [...prevSelectedRows1, checkboxValue];
  }

  // Return the existing array without adding the duplicate ID
  return prevSelectedRows1;
});
  } else {
    setSelectedRows1((prevSelectedRows1) =>
      prevSelectedRows1.filter((value) => value.ID !== checkboxValue.ID)
    );
    console.log("selectRows", selectedRows1);
  }
};

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div classNAme='{adminContent ? adminContent : "Loading..."}'>
        

        </div>
      )}

      <div className='admin-row1'>
       <div className=" admin admin-menu">
       <h5 id='Admin_header'>Task Management</h5>
       <ul>
  <li onClick={EmployeeGet}><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="gg:list" /></span>Employee list </li>
  {/* <li onClick={Assign}><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="material-symbols:add" /></span> Add Employee </li> */}
  <li onClick={Assign}> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="clarity:assign-user-solid" /></span>Assign Task</li> 
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="ic:sharp-track-changes" /></span>Track Task</li>
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="mdi:coffee-maker-complete" /></span>Task Completed</li>
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="fa-solid:project-diagram" /></span>Projects</li>
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="mdi:report" /></span>Reports</li>
  {/* <li> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="zondicons:news-paper" /></span>Social Marketing</li> */}
  <li> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="nimbus:marketing" /></span>Announcement</li>
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="icon-park:appointment" /></span>Appointemnt</li> 
 
  {/* <li>EMS Marketing                 <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="fa-solid:sms" /></span></li> */}
  {/* <li>Social Marketing <span style={{color:" #774040", fontSize:"22px"}}><Icon icon="zondicons:news-paper" /></span></li> */}
 </ul>

 <div className=' admin2'>
 <h5 id='Admin_header'>Finance</h5>
 <ul>
 <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="map:accounting" /></span>Accounting</li>
  <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="arcticons:simpleaccounting" /></span>Expenses</li>
  <li> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="streamline:receipt-solid" /></span>Invoicing</li>
  <li> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="material-symbols-light:measuring-tape-outline" /></span>Surveys</li> 
 </ul>
 </div>
 <div className=' admin2'>
 <h5 id='Admin_header'>Manage Account</h5>
 <ul>
 <li><span style={{color:" #774040", fontSize:"20px"}}><Icon icon="fa-solid:sms" /></span>Message</li>
  
  <li> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="material-symbols-light:work-update-sharp" /></span>Update User</li>
  <li style={{color:"red"}}> <span style={{color:" #774040", fontSize:"20px"}}><Icon icon="fluent:delete-48-filled" /></span>Delete Account</li> 
 </ul>
 </div>
       </div>
       <div className=" admin admin-display">
       
       {!isListVisible1 &&(
           <div className='addEmployee'>

            <h4>Employee Data</h4>
            <div className='employee-menu'> 
            <input placeholder='Search' type='search' className='employee search'/>
           
            
            <button onClick={AddEmployee2} type="button"  className=" p-2 mb-2 btn btn-success delete">Add</button>
            <button onClick={Save} type="button"  className="btn btn-primary delete">Save</button>
            <button onClick={GetList} disabled={buttonClicked}   style={{ cursor: buttonClicked ? "not-allowed" : "pointer" }} type="button"  className="btn btn-light delete">List</button>
            <button onClick={Delete}  type="button" class="btn btn-danger delete">Delete</button>
            <button  onClick={Edit} type="button" class="btn btn-info delete"> <span  style={{color:" blue", fontSize:"10px",marginRight:"3px"}}><Icon icon="fluent:edit-12-regular" /></span>Edit</button>
            <button  onClick={Refresh} type="button" class="btn btn-secondary delete">Refresh</button>
            {/* <button className='employee edit' onClick={Edit}> <span  style={{color:" blue", fontSize:"22px",marginRight:"3px"}}><Icon icon="fluent:edit-12-regular" /></span> Edit</button> */}
            {/* <button  onClick={Refresh}className='employee refresh'><span  style={{color:" #662d91", fontSize:"22px",marginRight:"3px"}}><Icon icon="tabler:refresh" /></span>Refresh</button> */}
            </div>
            
            <table className="table table-bordered text-secondary table1">
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
    <td><img style={{width:"50px", height:"50px"}} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"/></td>
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
    <td><img style={{width:"50px", height:"50px"}} src="https://media.istockphoto.com/id/1307791650/photo/headshot-portrait-of-smiling-caucasian-businessman-pose-at-workplace.jpg?s=612x612&w=0&k=20&c=Guj8f7rGyX4tsSszs3qR_NCYDOOvypB6T3eSPEB9GOQ="/></td>
  </tr>

  {EmployeeList.map((row) => (
    <tr key={row.id}  >
      <td><input id='input2' type='checkbox'
     value={row._id}
    data-value1={row._id}
     
        onChange={handleCheckboxChange}
         
      /></td>
      <td>{row.ID}</td>
      {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.id, 'FirstName', e.target.innerText)}
                >
                  {row.FirstName}
                </td>
              ) : (
                <td>{row.FirstName}</td>
              )}

              {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.id, 'LastName', e.target.innerText)}
                >
                  {row.LastName}
                </td>
              ) : (
                <td>{row.LastName}</td>

              )}


              {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.Id, 'Email', e.target.innerText,
                  row.ID
                  )}
                >
                  {row.Email}
                </td>
              ) : (
                <td>{row.Email}</td>
              )}


              {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.id, 'Contact', e.target.innerText)}
                >
                  {row.Contact}
                </td>
              ) : (
                <td>{row.Contact}</td>
              )}

              {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.id, 'Contract', e.target.innerText)}
                >
                  {row.Contract}
                </td>
              ) : (
                <td>{row.Contract}</td>
              )}

              {!edit ? (
                <td
                  contentEditable
                  onBlur={(e) => handleEdit(row.id, 'Position', e.target.innerText)}
                >
                  {row.Position}
                </td>
              ) : (
                <td>{row.Position}</td>
              )}
     
      <td  contentEditable onBlur={(e) => handleEdit(row.id, 'Picture', row.Picture)}><img style={{width:"70px", height:"50px"}} src={row.Picture}/></td>
    </tr>
  ))}

  {!isInputVisible && (<tr className='inputTree'>
  <th><input id='input2' type='checkbox' /> </th>
  <td>{id}</td>
    <td><input id='input1' type='text' onChange={(e)=>setFirstName(e.target.value)}/></td>
    <td><input id='input1' type='text' onChange={(e)=>setLastName(e.target.value)}/></td>
    <td><input id='input1' type='text' onChange={(e)=>setEmail(e.target.value)}/></td>
    <td><input id='input1' type='text' onChange={(e)=>setContact(e.target.value)}/></td>
    <td><input id='input1' type='text' onChange={(e)=>setContract(e.target.value)}/></td>
    <td><input id='input1' type='text' onChange={(e)=>setPosition(e.target.value)}/></td>
  
    <td></td>
  </tr>
  )}
</table>


{!delete1 && (<div className='DeleteOptions'>
  <b>Delete Employee Data Permanently?</b><br></br>
  <div className='Delete_no'>
  <span onClick={No} id="no">No</span>        <span onClick={Yes} id="yes">Yes</span>
  </div>
</div>)}
          
           </div>
           )}

   







  { !isListVisible && (
  <div className='addEmployeeTask' >

           <h4  className={headerTitle}>ConnectTeam Task</h4>
<div className={taskHeaderClass}>
  <span className='update' >
  <span  onClick={Task} disabled={buttonClicked}   style={{ cursor: buttonClicked ? "not-allowed" : "pointer" }} className= "p-2 mb-2 text-primary border-primary task">Task</span>

  <span> WorkLoad</span>
  <span> Files</span>
  <span>Docs</span>
  <span onClick={DeleteTask} className=' bg-danger p-1 text-white'>Delete </span>
  
  </span> 
  <span id='incomplete'>Incomplete Task</span>
</div>
   <table className=" table table-bordered text-secondary table1" >
   <thead className="text-light">

  <tr>
  <th id="task0"><input className='input2' type='checkbox'/></th>
     <th id="task0">ID</th>
    <th id="task1">Title</th>
    <th>STATUS </th>
    <th id="task1">Names</th>
    <th id="task1">ASSIGN TO</th>
    <th>PRIORITY</th>
    <th id="estimate">ESTIMATE</th>
    <th id='startEnd'>START/END</th>
    <th id='startEnd'>PROGRESS, %</th>
  </tr>
  </thead>

  <tbody>
  <tr>
  <th id="task0"><input className='input2' type='checkbox'/></th>
  <th></th>
    <td id="task1"> Specifications </td>
    <td></td>
    <td></td>
    <td></td>
    <td>Normal</td>
    <td id="estimate" ></td>
    <td id='startEnd'></td>


    <td id='startEnd'>


  
    </td>
 

  </tr>


  <tr>
  <th><input className='input2' type='checkbox'/></th>
  <th>TS02</th>
    
    <td>Project Reoverview</td>
    <td>
        <div className=' p-2 mb-2 text-warning  status1' id="status1">
           Review
        </div>
    </td>
    <td></td>
    <td>..</td>
    <td>.Normal</td>
    <td id="estimate">6hrs</td>
    <td id='startEnd'>Aug 24 - Aug4 23</td>

    <td id='startEnd'> 
    
    <div className="Container">
    
      <div className=" progress-bar progress-bar-striped bg-success shapeProgress" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
      <span id="per">{calculatePercentage()}%</span> 
    </div>
    
    
      
      </td>


  </tr>

  <tr>
  <th><input className='input2' type='checkbox'/></th>
  <th>TS01</th>
    <td>Project Reoverview</td>
    <td>
        <div className=' p-2 mb-2 text-primary  status3' id="status1">
           not Started
        </div>
    </td>
    <td>name</td>
    <td>..</td>
    <td>.Normal</td>
    <td id="estimate">24hrs</td>
    <td id='startEnd'>Aug 24 -Dec 09</td>

    <td id='startEnd'> 
    
    <div className="Container">
    
      <div className=" progress-bar progress-bar-striped bg-success shapeProgress" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
      <span id="per">{calculatePercentage()}%</span> 
    </div>
    
    
      
      </td>


  </tr>

 {assignedAllTask.map((item, i) => (
  <tr key={item.ID}>
    <th>
      <input
        id={`input-${item.ID}`}  // Use a dynamic ID based on item.ID
        type='checkbox'
        value={item.ID}
        onChange={handleCheckboxChangeTask}
      />
    </th>
    <td>{item.ID}</td>
    <td>{item.Title}</td>
    <td>
      <div className='p-2 mb-2 text-primary status3' id="status1">
        not Started
      </div>
    </td>
    <td>
      {taskPictureArry.map((task, j) => (
        <div className="display-task1" key={j}>
          <span className="d-flex flex-row">{task.Name}</span>
        </div>
      ))}
      <span className="d-flex flex-row">{item.Name}</span>
    </td>
    <td>
      {taskPictureArry.map((task, j) => (
        <div className="display-task1" key={j}>
          <span className="d-flex flex-row"><img src={task.Picture} id='img1' alt={`Task Picture ${j}`} /></span>
        </div>
      ))}
      <img src={item.Picture} alt="Employee Picture" id='img1' />
    </td>
    <td>{item.Priority}</td>
    <td>
      <p style={{ color: "red" }}>{item.days}</p>
    </td>
    <td>
      {/* <p style={{ color: "red" }}>{item.DayTime}</p> */}
    <p style={{ color: "red" }}>
  {item.DayTime instanceof Date
    ? item.DayTime.toLocaleString()
    : "Invalid Date"}
</p>


    </td>
    <td id='startEnd'>
      <div className="Container">
        <div className="progress-bar progress-bar-striped bg-danger shapeProgressNon" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        <span id="per">{calculatePercentage()}%</span>
      </div>
    </td>
  </tr>
))}

          





  {!isInputVisible1 && (<tr className='inputTree'>
  <th><input id='input2' type='checkbox' /> </th>
  <td>{id}</td> 
    <td><input id='input1' type='text-area' onChange={(event)=>setTitle(event.target.value)}/></td>
    <td>  <div className=' p-2 mb-2 text-primary  status3' >
          Not Started
        </div> </td> 

        <th id="task2" >
  {taskPictureArry.map((task) => (
    <div className='  display-task'>
    <span className="d-flex flex-row"  >
      {task.name},
    </span>
    </div>
  ))}
</th>

    <td id="task2" >
    {taskPictureArry.map((task ,i)=>(
<div className="display-task1" key={i}>
      <span className="d-flex flex-row" ><img src={task.Picture} id='img1'/></span>
      </div>
  ))}
   
  
    </td>

    <td><input id='input1' type='text' onChange={(event)=>setProity(event.target.value)}/></td>
    <td> {timeRemaining !== null && (
        <p style={{color:"red"}}>Time Left: {formatTime(timeRemaining)}</p>
      )}</td>
    <td>
     <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        // timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
    
    {days !== null && (
    <>
       
       <p style={{color:"red"}}>Days left: {days}</p>
       </>
      )}
      
    </td> 
  
    <td> 
    <div className='Container'>
      <div className='progress-bar progress-bar-striped bg-danger shapeProgressNon' aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >

      </div>
      <span id="per">{calculatePercentage()}%</span>
    </div>
    
      </td>
  </tr>
  )}
  

  
</tbody>


<div></div>
<div></div>
<div></div>

{!add &&(
<div className="rowContainer">
<div className='rowContainerMenu'>

<span
  className="btn btn-outline-primary checkId"
  disabled={buttonClicked}
  style={{
    cursor: buttonClicked ? "not-allowed" : "pointer",
    marginTop: "-20px",
    width: "167px",
  }}
  onClick={GetEmployee2}
>
  Select Employee
  <Icon style={{ fontSize: "25px" }} icon="gridicons:dropdown" />
</span>

 <span onClick={HandleChange} style={{fontSize: "30px", margin:"-25px 100px",justifyContent:"center",color:"red", backgroundColor:"#f2f2f288" ,position:"absolute"}}> <Icon style={{color:"red", textAlign:"center", marginLeft:"30px"}} icon="mingcute:close-fill" /></span>
</div>

<div></div>
<div></div>
 {allPictures.map((assign, index) => (
    <>
     
    <ul className='Pictures' key={index}>
    
       <li id="li"><input type='checkbox'  
       value={assign.userId} onChange={handleCheckboxAssign}/></li> 
    <li style={{marginTop:"5px"}}><img src={assign.Picture} className="img" alt={`Picture ${index}`} /></li>  
       <li style={{textAlign:"end", marginLeft:"10px"}}>{assign.name}</li> 
      
      </ul>
  </>
  ))} 






  <div className='doc'> 

  <label for="myTextarea" className='bg-light'>Message:</label>
  <textarea className=" outline-primary myTextarea" rows="4" cols="40" onChange={(e)=>setMessage(e.target.value)}></textarea>
  <input type='file' className='' onChange={handleFileChange} />
  
  
  
  </div>

  <span onClick={SelectEmployee} className=' btn btn-outline-success assignTo' >Assign Task</span>
</div>


)}


  
</table>
 
 <span onClick={addTask} style={{ display: add ? "block" : "none" }} className='btn btn-outline-success addTask' > Add Task <Icon id="IconPlus" icon="material-symbols:add" /></span>
           </div>
           )}
           
           

       </div>
    </div>

    
    <div className='rowAdmin_token'>
       <div className='col-token2 token-liveChat' >
    
       <img  id ="live" src="https://www.isitwp.com/wp-content/uploads/2020/06/live-chat-new-logo.png"/>
       <p>ClickUp is how our teams <br></br>centralizework, stay on track, <br></br>and easily collaborate.</p>
       <button id="elearning1">Chat...</button>
       <div><hr hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
       </div>
      
       <div className='col-token2 token-eLearning'>
       {/* <h5>eLearning</h5> */}
       <img  id ="live" src="https://i.pinimg.com/474x/23/39/7e/23397e66056aa499bcd29359fd7fe322.jpg"/>
       <p>With ClickUp we've seen a <br></br> 40% improvement in our total<br></br> go-to-market efficiency!”</p>
      <button id="elearning">eLearning...</button>
      <div><hr hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
       </div>
       
       <div className='col-token2 token-Meetings'>
      {/* <h5>Meeting</h5> */}
      <img  id ="live" src="https://tse1.mm.bing.net/th?id=OIP.FSmSdnFcdLkRAlZeGgy8FgHaCe&pid=Api&P=0&h=220"/>
      <p>ClickUp has helped us 3x <br></br>our productivity without having<br></br> to scale our team.”</p>

      <button id="elearning2">Meetings...</button>
      <div><hr style={{height:"5px",backgroundColor:"grey", borderRadius:"7px"}}></hr></div>
       </div>
      
       </div>



    </div>
  );
}

export default AdminAcc;
