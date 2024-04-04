import React, { useInsertionEffect } from "react";
import './zoom.css';
import { Icon } from '@iconify/react';
import { useState, useEffect,useRef } from "react";
import io  from 'socket.io-client'
import sounds from '../Component/sounds/Snapchat notification sound (2022)-mc.mp3'
import ringing from '../Component/sounds/Skype ringtone.mp3'
import internalRing from '../Component/sounds/Great Britain Internal Phone Ringing (Dial-Call Tones) - Sound Effect for ed_256k.mp3'
import TypingSound  from '../Component/sounds/Messenger typing sound.mp3'
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux'
import  fetchData  from '../Component/actions'; 
import {jwtDecode} from 'jwt-decode';
import clipboard from "clipboard"
import Peer from "simple-peer";
import { set, trusted } from "mongoose";
// import TextField from './TextField'; 

let socket = io.connect("https://render-backend-28.onrender.com")
console.log(socket)

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
     const [renderMessageData,setRenderMessageData]=useState([])
    const [receiveCall, setReceiveCall] = useState("false");
    const [startTime, setStartTime] = useState(null);
    const [CallEnd, setCallEnd] = useState("false");
    const[callSignal, setCallSignal]= useState("")
    const [chatPerson, setChatPerson]= useState([])
   const [chatMes, setChatMes]=useState("Chat...")
  //  const [chatMes, setChatMes]=useState("Chat...")
   const [callMs, setCallMs]=useState(" Calling...")
   const [VidoeMs, setVideoMs]=useState(" Video...")
    const[imageUrl, setImageUrl]=useState("")
    const [isTyping, setIsTyping] = useState(false);
   const [userToCall,setUserToCal]=useState("")
   const[declineMessage,setDeclineMessage]=useState("")
   const[declineId,setDeclineId]=useState("")
    const[callerImg,setCallerImg]=useState("")
    const[audioCalling, setAudioCalling]=useState(false)
    const[videoStream, setVideoStream]=useState(false)
   const [mess, setMess]=useState("")
    const [me, setMe] = useState("");
    const [callRejected, setCallRejected]=useState(false)
    const [stream, setStream] = useState(false);
    const [readyToChat, setReadyToChat] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const inputRef = useRef(null);
    const userVideo = useRef();
    const connectionRef = useRef();
    const myVideo = useRef();
  
    const userVideo1 = useRef();
    const connectionRef1 = useRef();
    const myVideo1 = useRef();
    const audioRef = React.useRef(null);
 
  

    
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
              console.log(decoded.userId)
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


  
  // socket.emit("storedChatData", {userId:userId_user, senderId:decodedId})

  setReadyToChat(true)
  setChatPerson(readyToChat)
  setCallId(userId_user)

  
    

}


useEffect(()=>{
  socket.emit("storedChatData", {userId:callId, senderId:decodedId})
  
  socket.on('messagesStored',  (data)=>{
  
   console.log("data",data)
   const newData= data.messages.map((item)=>({
   Message:item.Message,
   Time:item.Time,
   Img:item.Img,
   TimeStamp:item.timestamp,
   userId:item.userId


   }))
   console.log("new",newData)
setRenderMessageData(newData)
console.log("red", renderMessageData)


  });
return () => {
    socket.off("messagesStored");
    socket.off("storedChatData");
  };

},[callId,setRenderMessageData])

useEffect(() => {
  // Request permission for notifications
  Notification.requestPermission();
}, []);

const playNotificationSound = () => {
  const audio = new Audio(sounds); // Adjust the path to the notification sound file
  audio.play();
};

const playNotificationInternalRinging = () => {
  const audio = new Audio(internalRing); // Adjust the path to the notification sound file
  audio.pause();
};

const playNotificationChatting = () => {
  const audio = new Audio(internalRing); // Adjust the path to the notification sound file
  audio.play();
};


const playNotificationRinging = () => {
  const audio = new Audio(ringing); // Adjust the path to the notification sound file
  audio.pause();
};

const playNotificationTypingSound= () => {
  const audio = new Audio(TypingSound)
  audio.currentTime = 0; // Reset audio to start
  audio.play();
}


const stopNotificationRinging = () => {
  const audio = new Audio(ringing); // Adjust the path to the notification sound file
  audio.pause()
};

const handleTyping = (e) => {
  const typedMessage = e.target.value
    console.log("yees")
   // Set isTyping to true if message is not empty
  setSendingMsg(typedMessage);
  // Emit typing event to the server
  
  // socket.emit("typingData",{userId: callId});
  
  

};

useEffect(()=>{
  if (sendingMsg.length!==0){
    console.log("typingDataSending")

    socket.emit("typingData",{userId: callId});
  playNotificationTypingSound()
   
  } else{
      
    console.log("no data")
  }
},[])


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
    setIsTyping(true)
    setMessage("typing...")
    // You can update the UI or take any action based on the typing event data
  });

  // Clean up the event listener on component unmount
  return () => {
    socket.off('typing');
    setIsTyping(false)

  };
}, [socket]); 
 



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
      senderId:decodedId, 
      Message: sendingMsg, 
      Img: imageUrl,
      Time: Time,
      Name: decodedName
    };
    
localStorage.setItem("mess", sendingMsg)

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
        setIsTyping(false)
    if (Notification.permission === 'granted') {
      new Notification('New Message Received');
      playNotificationSound();
    }
  });
}, []); // Ensu





useEffect(() => {
  // Define the event handlers within the useEffect hook
  const message = localStorage.getItem("mess")
  setMess(message)
  socket.on("me", (id) => {
    setMe(id);
  },[setMess,mess]);

  socket.on("callUser", (data) => {
    setChatMes("Calling...");
    setIncomingCall(true);
    setUserToCal(data.userToCall)
    setCaller(data.from);
    setName(data.name);
    setCallerImg(data.img);
    setCallerSignal(data.signal);
 // Check if browser supports notifications and permission is granted
//  if ('Notification' in window && Notification.permission === 'granted') {
//   // Create a new notification
//   new Notification('Incoming Call');
// }

// Play notification ringing sound
// playNotificationRinging();
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
  //  playNotificationRinging();

    });

 // Clean up by removing the event listeners when the component unmounts
 return () => {
  socket.off("me");
 socket.off("callUserVideo");
 }; }, []); // Ad


const videoStreaming = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video:true, audio: true })
      .then((stream) => {

      
        console.log("Video stream:", stream);

        resolve(stream);

      })
      .catch((error) => {
        console.error("Error accessing audio stream:", error);
        reject(error);
      });
  });
};

const VideoCall = (id) => {
  setChatMes("Video Calling");
  
  videoStreaming()
    .then((stream) => {
       
      setVideoStream(true)

      if (myVideo1.current)  
      myVideo1.current.srcObject = stream;

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
          img: imageUrl,
        });
      });

      peer.on("stream", (stream) => {
        console.log("Received video stream:", stream);
        userVideo1.current.srcObject = stream;
      });

      socket.on("callAcceptedVideo", (signal) => {
        setCallAccepted(true);
         
        peer.signal(signal);
      });

      connectionRef1.current = peer;
    })
    .catch((error) => {
      console.error("Error initiating video call:", error);
    });
};

const answerCallVideoCall = () => {
  setChatMes("  Video Calling...");
  
  videoStreaming()
    .then((stream) => {
       setVideoStream(true)
      if (myVideo1.current)  
        myVideo1.current.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error answering video call:", error);
    });

  setCallAccepted(true);
  setIncomingVideoCall(false);
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
    console.log("streaming55", stream)
  });

  peer.signal(callerSignal);
  connectionRef1.current = peer;
};



const audioStreaming = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then((stream) => {
        console.log("Audio stream:", stream);
        resolve(stream);
      })
      .catch((error) => {
        console.error("Error accessing audio stream:", error);
        reject(error);
      });
  });
};

const callUser = () => {
  // Call audioStreaming to get the audio stream
  audioStreaming()
    .then((audioStream) => {
      if (audioStream) {
        // If the audio stream is obtained successfully
        console.log("Audio stream obtained:", audioStream);
        
        // Proceed with the call setup
        playNotificationInternalRinging();
        setAudioCalling(true);
        setChatMes("Calling...");
        
        // Set up Peer connection with the obtained audio stream
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: audioStream,
        });

        // Handle Peer events
        peer.on("signal", (data) => {
          socket.emit("callUser", {
            userToCall: callId,
            signalData: data,
            from: decodedId,
            name: decodedName,
            img: imageUrl,
          });
        });

        peer.on("stream", (stream) => {
          userVideo.current.srcObject = stream;
          console.log("streaming2", stream);
        });

        socket.on("callAccepted", (signal) => {
          setCallAccepted(true);
          setImgeAudio(signal.callImg);
          peer.signal(signal);
          console.log("callAccepted");
          intervalRef.current = setInterval(() => {
            setStartTime((prevElapsedTime) => prevElapsedTime + 1);
          }, 1000);
        });

        connectionRef.current = peer;
      } else {
        // Handle case when audio stream cannot be obtained
        console.error("Failed to obtain audio stream.");
      }
    })
    .catch((error) => {
      // Handle any errors that occur during audio stream acquisition
      console.error("Error accessing audio stream:", error);
    });
};

 
const answerCall = () => {
  // Call audioStreaming to get the audio stream
  audioStreaming()
    .then((stream) => {
      // Check if the stream is obtained successfully
      if (stream) {
        // Set chat message and call status
        setChatMes("Call");
        setReceiveCall(true);
        setAudioCalling(true)
        setCallAccepted(true);
        setIncomingCall(false);
        stopNotificationRinging();

        // Log the stream
        console.log("streamR", stream);

        // Set up Peer connection with the obtained audio stream
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        // Handle Peer events
        peer.on("signal", (data) => {
          socket.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
          console.log("streaming22", stream);
          userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;

        // Start the call timer
        intervalRef.current = setInterval(() => {
          setStartTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
      } else {
        // Handle case when audio stream cannot be obtained
        console.error("Failed to obtain audio stream.");
      }
    })
    .catch((error) => {
      // Handle any errors that occur during audio stream acquisition
      console.error("Error accessing audio stream:", error);
    });
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



const resetStopwatch = () => {
  clearInterval(intervalRef.current);
  setIsRunning(false);
  setStartTime(0);
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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


const leaveCall = () => {
  setCallEnded(true);
  setStream(null);

  if (connectionRef.current && typeof connectionRef.current.destroy === 'function') {
    connectionRef.current.destroy();
  } else {
    console.error('connectionRef or connectionRef.current is undefined or destroy method is not available');
  }

  if (connectionRef1.current && typeof connectionRef1.current.destroy === 'function') {
    connectionRef1.current.destroy();
  } else {
    console.error('connectionRef1 or connectionRef1.current is undefined or destroy method is not available');
  }

  // Optionally reload the page
  window.location.reload();
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
          onClick={(e)=>setReadyToChat(false)}
   src={imageUrl} className="avatar_img"  title={ decodedName}
      /><br></br>
      <span id="you"> You</span>
            </div>
            <div className="desktop">
            <div className="header search"><input id="chatSearch"  placeholder="Search ..."type="search"/></div>
            <div className="header add"> <spa><Icon icon="fluent-mdl2:add-friend" style={{margin:"0px 5px"}} /></spa>Add Friend</div>
            <div className="header settings"><Icon style={{fontSize:"30px"}}icon="icon-park:setting" /> Settings</div>
            </div>

            <div className="phoneFooter">
            {readyToChat ?
            ( <div className="phoneFooter_menu">
              
              <div className="col_phone textPhone"><textarea
              id="textAreaPhone"
        className="outline-primary inputText"
        value={sendingMsg}
        ref={inputRef} 
         onChange={handleTyping}
      onChange={(e) => setSendingMsg(e.target.value)}
        rows="4"
        cols="40"
      > </textarea>
       <audio ref={audioRef} src={playNotificationTypingSound} />
       </div>
                   <div className="col_phone emojiPhone">  <span onClick={emoji} ><Icon style={{width:"30px",color:"white",margin:"10px 0px"}} icon="fluent:emoji-add-24-regular" /></span></div>
                    <div className="col_phone send"><span onClick={SendMessage}> <Icon style={{fontSize:"30px" ,margin:"20px -350px"}} icon="zondicons:send" /></span></div>
                     
            </div>
            ):( 
              <div>
            <div className="header search"><input id="chatSearch"  placeholder="Search ..."type="search"/></div>
            <div className="header add"> <spa><Icon icon="fluent-mdl2:add-friend" style={{margin:"0px 5px"}} /></spa>Add Friend</div>
            <div className="header settings"><Icon style={{fontSize:"30px"}}icon="icon-park:setting" /> Settings</div>
            </div>
            )}
            </div>
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
):(<span>You{mess}</span>)}

                        
                    </li>
                </ul>
            </div>
        </div>
    ))}
</div>

            <div className="content contentCenter">
              <div className="messageHeader"> 


              <div className="smile">
        
              { readyToChat ? (
               
              <div className="smileHeader"> 

              <div >
  {chatPerson.map((item, i) => (
    <span  key={i}>
    {/* <div> <Icon icon="entypo:arrow-left" /></div> */}
      <img src={item.Picture} style={{top:"-2px", width:"35px",height:"35px", borderRadius:"100%"}} className="readyToChatImg" alt="Profile" />
    </span>
  ))} 
  </div>

  <div> {isTyping ? (
    <span>typing...</span>):(<span>{chatMes}</span>)} </div>
  <div  >
  <span onClick={callUser}><Icon style={{fontSize:"30px",margin:"0px 0px"}}  icon="fluent:call-add-24-filled" /></span>
                    <span onClick={VideoCall}><Icon  style={{ fontSize:"30px",margin:"0px -10px"}} icon="flat-color-icons:video-call" /></span>
                    
  </div>
  <div>Add</div>
  </div>
):( 
  <div className="smileHeader2">
              <div className="showHeader">Chats</div>
              <div className="showHeader">Updates</div>
              <div className="showHeader">Calls</div>
</div>
) }
              </div>

              <div className="desktop">


                {chatPerson.map((item, i) => (
    <span style={{textAlign:"start", margin:"0px 0px 0px -500px"}} key={i}>
      <img src={item.Picture} style={{top:"-2px", width:"30px",height:"30px"}} className="online" alt="Profile" />
    </span>
  ))} <span> <Icon  icon="jam:messages-alt-f" /> {chatMes} </span>
</div>              
  </div>

  <div className="messageContent" id="messageContent">


  <div className="smilePhone">
  {readyToChat ? (
    <div>

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
{/* myAudioSteam phone */}
{audioCalling &&(
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

{ videoStream &&(
  <div  className="myVideo" >
  hfhhf
                <video
        ref={myVideo1}
        autoPlay
        playsInline
        muted // Muted to prevent echo from self
        style={{ width: '100%', height: 'auto' }} // Adjust width and height as needed
      ></video>
               </div>
)}


 
     {/* userAudiostream */}
     {callAccepted && audioCalling && !callEnded && (
            <div>
              <audio
                className="rounded-full"
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}

              />
              <div style={{margin:"200px -30px"}}>
              {/* <div> <img src={callerImg} ref={userVideo} style={{width:"100px",height:"100px"}}/></div> */}
              
              </div>
              <div className="phoneCallDis">
      <span style={{margin:"5px 130px"}}> {formatTime(startTime)}</span> 
      {chatPerson.map((item, i) => (
    <span  key={i}>
      <img src={item.Picture} style={{margin:"4px 100px", width:"100px",height:"100px", borderRadius:"10px"}} className="readyToChatImg" alt="Profile" />
    </span>
  ))} 
      
              <span id="leavePhone"  onClick={leaveCall} className="btn btn-outline-danger leaveCall">End</span>
               </div>

             
              </div>
              )}


              {callAccepted && videoStream && !callEnded && (
            <div>
              {/* <video
        ref={myVideo1}
        autoPlay
        id="userVideo"
        playsInline
        muted // Muted to prevent echo from self
        style={{ width: '100%', height: 'auto' }} // Adjust width and height as needed
      ></video> */}
              <div style={{margin:"200px -30px"}}>
              {/* <div> <img src={callerImg} ref={userVideo} style={{width:"100px",height:"100px"}}/></div> */}
              
              </div>
              <div className="phoneCallDisVideo">
      <span style={{margin:"5px 130px"}}> {formatTime(startTime)}</span> 
      
      <video
        ref={userVideo1}
        autoPlay
        playsInline
        id="userVideo"
        // Muted to prevent echo from self
        style={{ width: '100%', height: 'auto' }} // Adjust width and height as needed
      ></video>
              <span style={{ margin:"360px 0px"}}  id="leavePhone"  onClick={leaveCall} className="btn btn-outline-danger leaveCall">End</span>
               </div>
             
              </div>
              
              )}

{/* UserAudioStream */}

{renderMessageData.map((item, j) => (
  <div key={j}>
    {/* Check if the message is from the current user and play a notification sound */}
    {item.userId === decodedId && (
      <audio src={sounds} id="notificationSound" />
    )}

    {/* Render an audio element for the message if it's from the current user */}
    {item.userId === decodedId && (
      <audio srcObject={item.audioStream} autoPlay controls id={`audioElement-${j}`} />
    )}

    {/* Render the message with appropriate styles based on sender */}
    <ul className={item.userId === decodedId ? "receivedMessPhone" : "sendMessPhone"}>
      <li className={item.userId === decodedId ? "receivedMessagePhone" : "sendMessagePhone"}>
        {/* Display the message content and time */}
        {item.Message} <span id="time" style={{ fontSize: "10px" }}>{item.Time}</span>
      </li>
      <li>
        {/* Display the sender's image */}
        <img
          src={item.Img}
          className={item.userId === decodedId ? "receivedImgPhone" : "sendImgPhone"}
          style={{ width: '25px', height: '25px' }}
        />
      </li>
    </ul>
    {/* <span>{item.TimeStamp}</span> */}
  </div>
))}



      {renderMessage.map((item, i) => (
        <div key={i} style={{zIndex:"0"}}>
          {item.userId === decodedId && (
            <audio src={sounds} id="notificationSound" />
            
          )}

          {item.userId === decodedId && (
        <audio srcObject={item.audioStream} autoPlay controls id={`audioElement-${i}`} />
      )}
          <ul className={item.userId === decodedId ? "receivedMessPhone" : "sendMessPhone"}>
            <li className={item.userId === decodedId ? "receivedMessagePhone" : "sendMessagePhone"}>
              {item.Message} <span  id="time" style={{ fontSize: "10px" }}>{item.Time}</span>
            </li>
            <li>
              <img
                src={item.Img}
                className={item.userId === decodedId ? "receivedImgPhone" : "sendImgPhone"}
                style={{ width: '25px', height: '25px' }}
              />
            </li>
          </ul>
          {/* <span className={item.userId === decodedId ? "receivedTime" : "sendTime"}>{item.Name}</span> */}
          
        </div>
        
      ))}


    
    </div>




  ) : (
    <div>
    
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

     {incomingCall || incomingVideoCall  ? (
      null
     ):(
      <div>
   
   
      {callAccepted && audioCalling && !callEnded ?(
      <div className="phoneCallDis">
      <span style={{margin:"5px 130px"}}> {formatTime(startTime)}</span> 
      <img src={callerImg} style={{width:"100px", height:"100px", margin:"15px 100px", borderRadius:"10px"}}/>
      
              <span id="leavePhone"  onClick={leaveCall} className="btn btn-outline-danger leaveCall">End</span>
               </div>):(null)}

{callAccepted && videoStream && !callEnded ?(
      <div className="phoneCallDis">
      <span style={{margin:"5px 130px"}}> {formatTime(startTime)}</span> 
      <video
        ref={userVideo1}
        autoPlay
        playsInline
        muted // Muted to prevent echo from self
        style={{ width: '100%', height: 'auto' }} // Adjust width and height as needed
      ></video>
      
              <span id="leavePhone"  onClick={leaveCall} className="btn btn-outline-danger leaveCall">End</span>
               </div>):(null)}




      <div className="renderPeople">
        {/* Rendering list of employees */}
        {employeeList.map((item, k) => (
          <div key={k} className="renderPhone">
            <div className="tableRender" onClick={() => tagUser(item.userId_user)}>
              <ul>
                <li onClick={tagUser}>
                  <img src={item.Picture} className="online" alt="Profile" />
                   
                    
                  {connectedUsersData && connectedUsersData.map((ele, j) => (
  <span key={j} style={{ position: "absolute", margin: "40px 0px 0px -40px" }}>
    {item.userId_user === ele.connectedUserId ? (
      <span className={item.userId===ele.connectedUserId ? "showM":"nonShow"}>online</span>
    ) : (
      <span className={item.userId===ele.connectedUserId ? "showM":"nonShow"}>offline</span>
    )}
  </span>
))}
                </li>
                <li onClick={tagUser} id="messUp" style={{ width: "auto" }}>
                  {item.Name}<br />
                  {/* Displaying call status */}
                  {callRejected ? (
                    <span className={item.userId_user === declineId ? "showDecline" : "nonShow"} style={{ color: "red", margin: "5px 5px", fontSize: "13.9px" }}>
                      {declineMessage} <Icon style={{ fontSize: "15px", margin: "5px", color: "red" }} icon="subway:call-3" />
                    </span>
                  ) : (
                   <div> 
                   { callRejected  ?(<span  className={item.userId_user=== declineId ? "showDecline" :"nonShow"} style={{color:"red" ,fontSize:"13.9px"}}> {declineMessage} <Icon  style={{fontSize:"15px",margin:"5px",color:"red"}} icon="subway:call-3" /></span>
):(<span>You:<span className={item.userId_user=== callId ? "showM" :"nonShow"} style={{margin:"-20px 50px ",}} >{mess}</span></span>)} </div>



                  )}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Different content based on screen size */}
      
      </div>
      
     )}
     {/* End of incomingCall */}


    </div>
  )}


</div>


<div className="desktop">

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



          heloo
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
      
      <audio ref={audioRef} src={playNotificationTypingSound} />

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
