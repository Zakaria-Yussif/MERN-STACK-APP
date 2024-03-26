import React from "react";
import './zoom.css';
import { Icon } from '@iconify/react';
import { useState, useEffect,useRef } from "react";
import io  from 'socket.io-client'
import sounds from '../Component/sounds/Snapchat notification sound (2022)-mc.mp3'
import ringing from '../Component/sounds/Skype ringtone.mp3'

import axios from "axios";
import { useSelector,useDispatch } from 'react-redux'
import  fetchData  from '../Component/actions'; 
import {jwtDecode} from 'jwt-decode';
import clipboard from "clipboard"
import Peer from "simple-peer";
import { set, trusted } from "mongoose";
// import TextField from './TextField'; 

let socket = io.connect("https://render-backend-28.onrender.com")

function Zoom() {
  const [incomingCall, setIncomingCall] = useState(false);
  const [incomingVideoCall, setIncomingVideoCall] = useState(false);
  const [emojis, setEmojis] = useState([
    "😄", "😃", "😀", "😊", "😉", "😍", "😘", "😚",
    "😗", "😙", "😜", "😝", "😛", "😳", "😁", "😔",
    "😌", "😒", "😞", "😣", "😢", "😂", "😭", "😪",
    "😥", "😰", "😅", "😓", "😩", "😫", "😨", "😱",
    "😠", "😡", "😤", "😖", "😆", "😋", "😷", "😎",
    "😴", "😵", "😲", "😟", "😦", "😧", "😈", "👿",
    "😮", "😬", "😐", "😕", "😯", "😶", "😇", "😏",
    "😑", "👲", "👳", "👮", "👷", "💂", "👶", "👦",
    "👧", "👨", "👩", "👴", "👵", "👱", "👼", "👸",
    "👹", "👺", "💀", "👽", "💩"
  ]);
const [isLeaveCall, setIsLeaveCall]=useState(null)
    const [employeeList, setEmployeeList] = useState([]);
    const [isVisibleChat, setIsVisibleChat] = useState(false);
    const [decodedId, setDecodedId] = useState("");
    const [ connectedUsersData, setConnectedUsersData] =useState([])
    const [decodedName, setDecodedName] = useState("");
    const[decodedEmail,setDecodedEmail]=useState([])
    const [userIdNew, setUserIdNew] = useState("");
    const [message, setMessage]=useState("")
    const[chatPageVisible , setChatPagVisible]= useState(false)
    const[sendingMsg,setSendingMsg]= useState("");
    const[callerIdData, setCallerIdData]= useState("")
    const[callIdData, setCallIdData]= useState("")
    const [imgeAudio, setImgeAudio]= useState("");
    const [isEmoji,setIsEmoji]=useState(false)
  const[callId, setCallId]=useState("")
    const [recievedMessage, setRecievedMessage]= useState([])
    const [renderMessage,setRenderMessage]=useState([])
    const [receiveCall, setReceiveCall] = useState("false");
   
    const [CallEnd, setCallEnd] = useState("false");
    const[callSignal, setCallSignal]= useState("")
    const [chatPerson, setChatPerson]= useState([])
   const [chatMes, setChatMes]=useState(" Messaging...")
   const [callMs, setCallMs]=useState(" Calling...")
   const [VidoeMs, setVideoMs]=useState(" Video...")
    const[imageUrl, setImageUrl]=useState("")
    const [isTyping, setIsTyping] = useState(false);
   const [userToCall,setUserToCal]=useState("")
   const[declineMessage,setDeclineMessage]=useState("")
   const[declineId,setDeclineId]=useState("")
    const[callerImg,setCallerImg]=useState("")
    const[audioCalling, setAudioCalling]=useState(false)
    const [me, setMe] = useState("");
    const [callRejected, setCallRejected]=useState(false)
    const [stream, setStream] = useState();
    const [streamVideo, setStreamVideo] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState('');
    const inputRef = useRef(null);
    const userVideo = useRef();
    const connectionRef = useRef();
    const myVideo = useRef();
  
    const userVideo1 = useRef();
    const connectionRef1 = useRef();
    const myVideo1 = useRef();

 
  

    
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
            socket.emit('setUserId', {userId:decoded.userId});
    
            // Emit event to check online status
            socket.emit("checkOnlineStatus", decoded.userId, (response) => {
              console.log("Online status of user:", response);
              if (response && response.isOnline) {
                setUserIdNew(prevState => [...prevState, response.userId]); // Functional update
              } else {
                console.log("User is not online");
              }
            });
    
            // Emit event to get all connected user IDs
          

              
          }
    
          socket.on('connectedWithId', (userId) => {
            console.log(`Successfully connected with ID: `,userId);
            if(userId){
              const mapUserId= userId.map((item)=>({
              connectedUserId:item,
              

            }))
            console.log("gggg",mapUserId)
             setConnectedUsersData([...mapUserId])
            }
          });
    
          // Cleanup functi  
          return () => {
            socket.off('connectedWithId'); // Cleanup event listener
          };
        }
      } else {
        alert("Token does not exist");
      }
    }, [ ]); // Dependency array is empty since this effect doesn't depend on any props or state
    
    console.log("c", connectedUsersData)
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
  }, [decodedEmail, setEmployeeList]);


  
 const tagUser=(userId_user)=>{
// / console.log("Clicked target:", userId_user);
  const sendMessageId=employeeList.filter((item)=>item.userId_user === userId_user)

  const readyToChat = sendMessageId.map((item)=>({
    Picture:item.Picture,

  }))
  setChatPerson(readyToChat)
  setCallId(userId_user)
  
  

}

useEffect(() => {
  // Request permission for notifications
  Notification.requestPermission();
}, []);

const playNotificationSound = () => {
  const audio = new Audio(sounds); // Adjust the path to the notification sound file
  audio.play();
};
const playNotificationRinging = () => {
  const audio = new Audio(ringing); // Adjust the path to the notification sound file
  audio.play();
};
const stopNotificationRinging = () => {
  const audio = new Audio(ringing); // Adjust the path to the notification sound file
  audio.pause()
};

const handleTyping = (e) => {
  const typedMessage = e.target.value;
  setSendingMsg(typedMessage);
  setIsTyping(typedMessage !== ''); // Set isTyping to true if message is not empty

  // Emit typing event to the server
  const data = {
    typedMessage: typedMessage,
    userId: callId
  };
  socket.emit("typing", data);
};

function emoji (){
  setIsEmoji(!isEmoji)
}

const tagEmoji = (emoji) => {
  const input = inputRef.current;
  if (input) {
    const { selectionStart, selectionEnd } = input;
    const newText =
      sendingMsg.substring(0, selectionStart) + emoji + sendingMsg.substring(selectionEnd);
    setSendingMsg(newText);
    input.focus();
    // Move cursor after the inserted emoji
    input.setSelectionRange(selectionStart + emoji.length, selectionStart + emoji.length);
  }
  setIsEmoji(false);
};

useEffect(() => {
  // Set up a listener for typing events from the server
  socket.on('typing', (data) => {
    // Handle typing event from the server
    console.log("Typing event received:", data);
    // You can update the UI or take any action based on the typing event data
  });

  // Clean up the event listener on component unmount
  return () => {
    socket.off('typing');
  };
}, []); 
 



const SendMessage = (e) => {
  setDeclineMessage(" ")
  e.preventDefault();
  setSendingMsg(e.target.value); 
  if (sendingMsg.length === 0) {
    console.log("Sorry, message cannot be empty");
  } else {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const Time = hours + ':' + minutes;

    const DataSend = { 
      userId: callId, 
      Message: sendingMsg, 
      Img: imageUrl,
      Time: Time,
      Name: decodedName
    };
    
    socket.emit('sendMessage', DataSend);
    setRenderMessage(prevState => [...prevState, DataSend]);
    setSendingMsg("");
  }
};

useEffect((decodedId) => {

  // Set up a listener for the 'messageRev' event
  socket.on('messageRev', (data) => {
    // Handle the received data here
    console.log("Received message:", data);
    setRenderMessage(prevState => [...prevState, data]);

    if (Notification.permission === 'granted') {
      new Notification('New Message Received');
      playNotificationSound();
    }
  });
}, []); // Ensu




useEffect(() => {
  // Define the event handlers within the useEffect hook
  socket.on("me", (id) => {
    setMe(id);
  });

  socket.on("callUser", (data) => {
    setChatMes("Calling...");
    setIncomingCall(true);
    setUserToCal(data.userToCall)
    setCaller(data.from);
    setName(data.name);
    setCallerImg(data.img);
    setCallerSignal(data.signal);
 // Check if browser supports notifications and permission is granted
 if ('Notification' in window && Notification.permission === 'granted') {
  // Create a new notification
  new Notification('Incoming Call');
}

// Play notification ringing sound
playNotificationRinging();
  });

  // Clean up by removing the event listeners when the component unmounts
  return () => {
    socket.off("me");
    socket.off("callUser");
  };
}, []); // Add an empty dependency array to ensure the effect runs only once



useEffect(() => {
  
 socket.on("me", (id) => {
  setMe(id);
 });

 socket.on("callUserVideo", (data) => {
setChatMes("Video Calling...");
setIncomingVideoCall(true);
setUserToCal(data.userToCall)
setCaller(data.from);
 setName(data.name);  
setCallerImg(data.img);
   setCallerSignal(data.signal);
   // Check if browser supports notifications and permission is granted
 if ('Notification' in window && Notification.permission === 'granted') {
        // Create a new notification
       new Notification('Incoming Video Call');
   }

    // Play notification ringing sound
   playNotificationRinging();

    });

 // Clean up by removing the event listeners when the component unmounts
 return () => {
  socket.off("me");
 socket.off("callUserVideo");
 }; }, []); // Ad

const VideoCall = (id) => {
  
  
 setChatMes("Video Calling")
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
 setStream(stream);
if(myVideo1.current)
myVideo1.current.srcObject = stream;
 });
   }

const peer = new Peer({
  initiator: true,
trickle: false,
 stream: stream,
});

 peer.on("signal", (data) => {
socket.emit("callUserVideo", {
 userToCall: callId,
  signalData: data,
 from: decodedId,
 name: decodedName,
img:imageUrl,
  });
 });

 peer.on("stream", (stream) => {
  userVideo.current.srcObject = stream;
  });

socket.on("callAcceptedVideo", (signal) => {
 setCallAccepted(true);
   peer.signal(signal);
 });

 connectionRef1.current = peer;
 };


const answerCallVideoCall = () => {

 setChatMes("  Video Calling...")
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    setStream(stream);
     if(myVideo1.current)  
      myVideo1.current.srcObject = stream;
   });
   }
 setCallAccepted(true)
 setIncomingVideoCall(false)
stopNotificationRinging();
     
      
    
 const peer = new Peer({  
  initiator: false,
trickle: false,
   stream: stream,
  });
  
  peer.on("signal", (data) => {
 socket.emit("answerCallVideo", { signal: data, to: caller });
  });
  
 peer.on("stream", (stream) => {
   userVideo1.current.srcObject = stream;
 });
  
 peer.signal(callerSignal);
 connectionRef1.current = peer;
 };


const callUser = (id) => {
  setAudioCalling(true)
  
  setChatMes("Calling...")
  
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      console.log("StreamM",stream)
      setStream(stream);
      if(myVideo.current)
      myVideo.current.srcObject = stream;
    });
    

  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: stream,
  });

  peer.on("signal", (data) => {
    socket.emit("callUser", {
      userToCall: callId,
      signalData: data,
      from: decodedId,
      name: decodedName,
      img:imageUrl,
    });
  });

  peer.on("stream", (stream) => {
    userVideo.current.srcObject = stream;
    // console.log("streaming2", stream)
  });

  socket.on("callAccepted", (signal) => {
    setCallAccepted(true);
    peer.signal(signal);
  });

  connectionRef.current = peer;
};

const answerCall = () => {
setChatMes("Messaging...")
setReceiveCall(true)
  
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      setStream(stream);
      if(myVideo.current)
      myVideo.current.srcObject = stream;
    });
    
  setCallAccepted(true)
  setIncomingCall(false)
  stopNotificationRinging();
   
    
  
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream: stream,
  });

  peer.on("signal", (data) => {
    socket.emit("answerCall", { signal: data, to: caller });
  });

  peer.on("stream", (stream) => {
    console.log("streaming", stream)
    userVideo.current.srcObject = stream;
  });

  peer.signal(callerSignal);
  connectionRef.current = peer;
};

const reject=()=>{
  stopNotificationRinging();

  setStream(null)
  setChatMes("Messaging...")
  setIncomingCall(false)
   
  socket.emit("rejectCall" ,{imageUrl,caller ,decodedId })
}

const rejectVideo=()=>{
  stopNotificationRinging();

  setStream(null)
  setChatMes("Messaging...")
  setIncomingVideoCall(false)
   
  socket.emit("rejectCallVideo" ,{imageUrl,caller ,decodedId })
}


useEffect(()=>{
  socket.on("declineMessage",(data)=>{
    if(data){
    setStream(null)
   setCallRejected(true)
    setDeclineMessage(data.message)
    setDeclineId(data.Id)
   console.log("declineId",declineId)
  }
  })
  },[socket,setDeclineMessage,setDeclineId])


  useEffect(()=>{
    socket.on("declineMessageVideo",(data)=>{
      if(data){
      setStream(null)
     setCallRejected(true)
      setDeclineMessage(data.message)
      setDeclineId(data.Id)
     console.log("declineId",declineId)
    }
    })
    },[socket,setDeclineMessage,setDeclineId])


const leaveCall = () => {
  setCallEnded(true);
  connectionRef.current.destroy();
};

// function  VideoCall (){

// }

// function answerCallVideoCall(){


// }


const leaveCallVideo = () => {
   setCallEnded(true);
  
setStream(null)
//   // Check if connectionRef and connectionRef.current are defined
  if (connectionRef1 && connectionRef1.current) {
//     // Check if destroy() method exists on connectionRef.current
 if (typeof connectionRef1.current.destroy === 'function') {
     connectionRef1.current.destroy();
  } else {
    console.error('destroy() method is not available on connectionRef.current');
   }
  } else {    console.error('connectionRef or connectionRef.current is undefined');
  }
};


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
         <h5 > Employees</h5>
    {employeeList.map((item, k) => (
        <div key={k}  >
            <div className="tableRender" onClick={() => tagUser(item.userId_user)}>
                <ul>
                    <li onClick={tagUser}   >
                        <img src={item.Picture} className="online" alt="Profile" />
                      
                         {connectedUsersData && connectedUsersData.map((ele,j)=>(

                           <span className="rounded-circle" key={j}   >
                                <Icon className={item.userId_user===ele.connectedUserId ? "green" :"grey"} id="dot2" icon="carbon:dot-mark" />
                            </span>
                            ))} 
                      
                    </li>
                    <li onClick={tagUser} id="messUp">
                        {item.Name}<br />
                        
                        { callRejected  ?(<span  className={item.userId_user=== declineId ? "showDecline" :"nonShow"} style={{color:"red", margin:"5px 5px" ,fontSize:"13.9px"}}> {declineMessage} <Icon  style={{fontSize:"15px",margin:"5px",color:"red"}} icon="subway:call-3" /></span>
):(<span>You</span>)}

                        
                    </li>
                </ul>
            </div>
        </div>
    ))}
</div>

            <div className="content contentCenter">
              <div className="messageHeader"> 
                {chatPerson.map((item, i) => (
    <span style={{textAlign:"start", margin:"0px 0px 0px -500px"}} key={i}>
      <img src={item.Picture} style={{top:"-2px", width:"30px",height:"30px"}} className="online" alt="Profile" />
    </span>
  ))} <span> <Icon  icon="jam:messages-alt-f" /> {chatMes} </span>

  </div>

  <div className="messageContent" id="messageContent">
   {incomingCall && ( 
        <div className="inComingCall" >
        <audio src={ringing}  autoPlay id="notificationSound" />
          <p className="incomingData">Incoming Call  </p><br></br>
          <span> <img src={callerImg} style={{margin:"-15px 0px 5px",borderRadius:"100%", width:"60px",height:"60px"}} className="caller" alt="Caller" /></span><br></br>
          <span style={{margin:"7px", width:"auto",height:"30px", color:"white"}}>{name}</span><br></br>
          <button className=" btn btn-outline-success bg-success answer" onClick={stopNotificationRinging} onClick={answerCall} ><Icon style={{fontSize:"30px",marginTop:"0px",color:"white"}}  icon="fluent:call-add-24-filled" /></button>
          <button className="btn btn-outline-danger bg-danger  reject"  onClick={reject}><Icon  style={{fontSize:"27px",marginTop:"-3px",color:"white"}} icon="subway:call-3" /></button>
        </div>
     )} 

     {incomingVideoCall && ( 
      
        <div className="inComingCall" >
          <p className="incomingData">Incoming Video Call  </p><br></br>
          <span> <img src={callerImg} style={{margin:"-15px 0px 5px",borderRadius:"100%", width:"60px",height:"60px"}} className="caller" alt="Caller" /></span><br></br>
          <span style={{margin:"7px", width:"auto",height:"30px", color:"white"}}>{name}</span><br></br>
          <button className=" btn btn-outline-success bg-success answer" onClick={answerCallVideoCall} ><Icon style={{fontSize:"30px",marginTop:"0px",color:"white"}}  icon="fluent:call-add-24-filled" /></button>
          <button className="btn btn-outline-danger bg-danger  reject"  onClick={rejectVideo}><Icon  style={{fontSize:"27px",marginTop:"-3px",color:"white"}} icon="subway:call-3" /></button>
        </div>
     )} 
      {renderMessage.map((item, i) => (
        <div key={i}>
          {item.userId === decodedId && (
            <audio src={sounds} id="notificationSound" />
            
          )}

          {item.userId === decodedId && (
        <audio srcObject={item.audioStream} autoPlay controls id={`audioElement-${i}`} />
      )}
          <ul className={item.userId === decodedId ? "receivedMess" : "sendMess"}>
            <li className={item.userId === decodedId ? "receivedMessage" : "sendMessage"}>
              {item.Message} <span style={{ fontSize: "10px" }}>{item.Time}</span>
            </li>
            <li>
              <img
                src={item.Img}
                className={item.userId === decodedId ? "receivedImg" : "sendImg"}
                style={{ width: '25px', height: '25px' }}
              />
            </li>
          </ul>
          <span className={item.userId === decodedId ? "receivedTime" : "sendTime"}>{item.Name}</span>
        </div>
      ))}
 {/* othercode */}
  <div>
  

            <div className="video">
              {stream && (
              <div>
                <audio
                  className="rounded-full"
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: "300px" }}
                /> 

               
               </div>
              )}
            </div>

           
           
          <div >
            {callAccepted && !callEnded ? (
            <div>
              <audio
                className="rounded-full"
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
              
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {/* <img
                  src="https://w0.peakpx.com/wallpaper/416/423/HD-wallpaper-devil-boy-in-mask-red-hoodie-dark-background-4ef517.jpg"
                  class="rounded-full w-[15rem]"
                /> */}
               
              </div>
            )}
          </div>
       
  
</div>



<div className="video">
<div>
              {stream && (
              <div>
                <audio
                  className="rounded-full"
                  playsInline
                  muted
                  ref={myVideo1}
                  autoPlay
                  style={{ width: "300px" }}
                /> 

               
               </div>
              )}
            </div>

           
           
          <div >
            {callAccepted && !callEnded ? (
            <div>
              <audio
                className="rounded-full"
                playsInline
                ref={userVideo1}
                autoPlay
                style={{ width: "300px" }}
              />
              
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {/* <img
                  src="https://w0.peakpx.com/wallpaper/416/423/HD-wallpaper-devil-boy-in-mask-red-hoodie-dark-background-4ef517.jpg"
                  class="rounded-full w-[15rem]"
                /> */}
               
              </div>
            )}
          </div>
       
  
</div>






      {/* endcode */}
{isEmoji && (
<div className="emoji">
      <ul>
        {emojis.map((emoji, index) => (
          <li key={index} onClick={() => tagEmoji(emoji)}>{emoji}</li>
        ))}
      </ul>
      </div>
)}




    </div>

  
                

                <div className="messageFooter">
                {isTyping && <div className="typing-indicator">Typing...</div>}
                    <textarea
        className="outline-primary inputText"
        value={sendingMsg}
        ref={inputRef} 
         onChange={handleTyping}
      onChange={(e) => setSendingMsg(e.target.value)}
        rows="4"
        cols="40"
      > </textarea>
                     <span onClick={emoji} className="typing"><Icon style={{width:"30px",color:"white"}} icon="fluent:emoji-add-24-regular" /></span>
                    <span onClick={SendMessage}> <Icon style={{fontSize:"30px" ,marginTop:"-20px"}} icon="zondicons:send" /></span>
                    <span onClick={callUser}><Icon style={{fontSize:"30px",marginTop:"-20px"}}  icon="fluent:call-add-24-filled" /></span>
                    <span onClick={VideoCall}><Icon  style={{ fontSize:"30px",marginTop:"-20px"}} icon="flat-color-icons:video-call" /></span>
                    <span><Icon style={{ fontSize:"30px",marginTop:"-20px"}} icon="fluent:add-24-filled" /></span>

                    {callAccepted && !callEnded ? (  <span   onClick={leaveCall} className="btn btn-outline-danger leaveCall">End</span>):(null)}
                </div>
            </div>
         </div>
        
        </div>
    </>
    
    );
}

export default Zoom;
