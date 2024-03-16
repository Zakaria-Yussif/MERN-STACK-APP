import React from "react";
import './zoom.css';
import { Icon } from '@iconify/react';
import { useState, useEffect,useRef } from "react";
import io  from 'socket.io-client'
// import Peer from 'peerjs';
import Peer from 'simple-peer'
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux'
import  fetchData  from '../Component/actions'; 
import {jwtDecode} from 'jwt-decode';
import clipboard from "clipboard"
// import TextField from './TextField'; 

let socket = io.connect("http://localhost:8700")

function Zoom() {
   
    const [employeeList, setEmployeeList] = useState([]);
    const [isVisibleChat, setIsVisibleChat] = useState(false);
    const [decodedId, setDecodedId] = useState("");
    const [ connectedUsers, setConnectedUsers] =useState("")
    const [decodedName, setDecodedName] = useState("");
    const[decodedEmail,setDecodedEmail]=useState([])
    const [userIdNew, setUserIdNew] = useState("");
    const [myStream, setMyStream] = useState("");
    const [receiveCall, setReceiveCall] = useState("false");
    const [callAccepted, setCallAccepted] = useState("false");
    const [CallEnd, setCallEnd] = useState("false");
    const[callSignal, setCallSignal]= useState("")
    const[caller, setCaller]= useState("")
    const[idToCall, setIdToCall]= useState("")
    const[name, setName]= useState("")
    const[isOnline,setIsOnline]=useState(false)
    const[me,setMe]=useState("")
    const[imageUrl, setImageUrl]=useState("")
    const textAreaRef = useRef(null);
    
    const myVideo = useRef();
    const userVideo= useRef()
    const connectionRef = useRef()

 
    const  dataImg = useSelector((state) => state.data);
     console.log("data",dataImg)
    function VideoShow(){

    }

    
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decoded = jwtDecode(storedToken);
        if (!decoded) {
          alert("Admin Authentication invalid");
        } else {
          setDecodedName(decoded.findName);
          setDecodedId(decoded.userId);
          setDecodedEmail(decoded.email);
    
          if (decoded.userId) {
            // Emit event to set user ID
            socket.emit('setUserId', decoded.userId);
    
            // Emit event to check online status
            socket.emit("checkOnlineStatus", decoded.userId, (response) => {
              console.log("Online status of user:", response);
              if (response && response.isOnline) {
                setUserIdNew(response.userId);
              } else {
                console.log("User is not online");
              }
            });
    
            // Emit event to get all connected user IDs
            socket.on('allConnectedUserIds', (connectedUsers) => {
              // Update connected users state with the received list
              if( connectedUsers){    
                const MatchesId= connectedUsers.forEach((element)=>({
                 
                   connectedId:element.userId
                }))
            setUserIdNew();
            console.log("con", userIdNew)
                 }
              
              console.log("All connected user IDs:", connectedUsers);
            });
          } 

          console.log("conNN", userIdNew)
    
          socket.on('connectedWithId', (userId) => {
            console.log(`Successfully connected with ID: ${userId}`);
          });
        }
      } else {
        alert("Token does not exist");
      }
    }, [setUserIdNew,userIdNew]); 
      
   


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

 const handleCopyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      // Optionally, you can provide user feedback after copying
      alert('Copied to clipboard: ' + me);
    }
  };
  function VideoCall () {

  

    useEffect(()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Access both video and audio devices
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    // Handle the stream, for example, display it in a video element
                    const videoElement = document.getElementById('video');
                    if (videoElement) {
                        videoElement.srcObject = stream;
                    }
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error accessing media devices:', error);
                });
        } else {
            console.error('getUserMedia is not supported in this browser');
        }
        // .catch(error => console.error('Error accessing media devices:', error));


socket.on("me",(id)=>{

     setMe(id)

})

console.log("id", me)




socket.on("callUser", (data)=>{
    setReceiveCall(true)
    setCaller(data.from)
    setName(data.name)
    setCallSignal(data.signal)
})

    },[ userIdNew])
 }


const CallUser=(id)=>{
    const peer= new Peer({
        initiator:true,
        trickle:false,
        stream:myStream

    })


     peer.on("signal", (data)=>{
        socket.emit("callUser",{
            userTocall:textAreaRef.current.value,
            signalData:data,
            from:me,
            name:name
        })

     })

     peer.on("stream", (stream)=>{
     userVideo.current.srcObject = stream
     })

     socket.on("callAccepted", (signal)=>{
        setCallAccepted(true)
        peer.signal(signal)
     })
     connectionRef.current= peer
}

const callAnswer=()=>{
    setCallAccepted(true)
   const peer =new Peer({
    initiator:false,
    trickle:false,
    strea:myStream,
   })
  
   peer.on("signal", (data)=>{
    socket.emit("answerCall",{signal:data, to:caller} )
    })

    peer.on("stream", (stream)=>{
        userVideo.current.srcObject = stream
        })

        peer.on("stream", (stream)=>{
            connectionRef.current = peer
            })

}

const leaveCall = ()=>{
    setCallEnd(true)
    connectionRef.current.destroy()
    
}
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get("https://render-backend-28.onrender.com/api/pictures/getAllPictures");
          if (response.status === 200) {
              const newData = response.data.findAllPictures.map((item) => ({
              
                  userId_user: item.userId,
                  Picture: item.Picture,
                  Name: item.name,
                  email: item.Email
              }));
 console.log(newData)
            

              // Assuming 'decodedEmail' is defined elsewher
                
              const updatedList = newData.filter((element) => element.email !== decodedEmail);
          setEmployeeList(updatedList);
          

          
        }
      } catch (error) {
          console.error(error);
      }
  };

  fetchData();
}, [decodedEmail, setEmployeeList,setConnectedUsers,userIdNew]);

    function chat() {
        setIsVisibleChat(!isVisibleChat);
    }

const removeElement = (indexToRemove) => {
    // Create a new array by excluding the element with matching email
    const updatedList = employeeList.filter((element) => element.email !== decodedEmail);
  console.log("gaes", updatedList)
    setEmployeeList(updatedList);
};

   

    return (
        <>
        <div className="zoom">
         <div className="zoomHeader">
            <div className="header you">
            <span className="dotRound"> <Icon id="dot"  icon="carbon:dot-mark" /> </span>
        
             <img
       style={{margin:"7px 12px", zIndex:"0"}}
   className="avatar_img"
   id="chatImg"
   alt="Profile Image"
          
   src={imageUrl} className="avatar_img"  title={ decodedName}
      /><br></br>
      <span style={{color:"grey", margin:"2px 5px 0px 10px"}}> You</span>
            </div>
            <div className="header search"><input id="chatSearch"  placeholder="Search ..."type="search"/></div>
            <div className="header add"> <spa><Icon icon="fluent-mdl2:add-friend" style={{margin:"0px 5px"}} /></spa>Add Friend</div>
            <div className="header settings"><Icon style={{fontSize:"30px"}}icon="icon-park:setting" /> Settings</div>
         </div>

         <div className="contentZoom">
         <div className="content contentAside">
    {employeeList.map((item, k) => (
        <div key={k}>
            <div className="tableRender">
                <ul>
                    <li className="rounded-circle">
                        <img src={item.Picture} className="online" alt="Profile" />
                        {item.userIdNew &&item.userIdNew.map((ele, index) => (
                            <span key={index} className="dotRound2">
                                <Icon id="dot2" style={{ color: ele.connectedId === item.userId_user ? "green" : "grey" }} icon="carbon:dot-mark" />
                            </span>
                        ))}
                    </li>
                    <li id="messUp">
                        {item.Name}<br />
                        <span style={{ fontSize: "12px", margin: "-12px 5px", color: "grey" }}>You: Thank you</span>
                    </li>
                </ul>
            </div>
        </div>
    ))}
</div>

            <div className="content contentCenter">
                <div className="messageHeader"> <span> <Icon  icon="jam:messages-alt-f" /> Message...</span></div>
                <div className="messageContent">conn</div>
                <div className="messageFooter">
                    
                    <textarea className=" outline-primary inputText" rows="4" cols="40" ></textarea>
                    <span> <Icon style={{fontSize:"30px" ,marginTop:"-20px"}} icon="zondicons:send" /></span>
                    <span><Icon style={{fontSize:"30px",marginTop:"-20px"}}  icon="fluent:call-add-24-filled" /></span>
                    <span onClick={VideoCall}><Icon  style={{ fontSize:"30px",marginTop:"-20px"}} icon="flat-color-icons:video-call" /></span>
                    <span><Icon style={{ fontSize:"30px",marginTop:"-20px"}} icon="fluent:add-24-filled" /></span>
                </div>
            </div>
         </div>
        </div>
    </>
    
    );
}

export default Zoom;
