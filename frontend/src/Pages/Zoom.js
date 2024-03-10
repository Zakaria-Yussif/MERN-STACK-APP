import React from "react";
import './zoom.css';
import { Icon } from '@iconify/react';
import { useState, useEffect,useRef } from "react";
import io  from 'socket.io-client'
// import Peer from 'peerjs';
import Peer from 'simple-peer'
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import clipboard from "clipboard"
// import TextField from './TextField'; 

let socket = io.connect("https://render-backend-28.onrender.com")


// const socket = io.connect("http://localhost:8700")
function Zoom() {
   
    const [employeeList, setEmployeeList] = useState([]);
    const [isVisibleChat, setIsVisibleChat] = useState(false);
    const [decodedId, setDecodedId] = useState("");
    const [decodedName, setDecodedName] = useState("");
    const [userIdNew, setUserIdNew] = useState("");
    const [myStream, setMyStream] = useState("");
    const [receiveCall, setReceiveCall] = useState("false");
    const [callAccepted, setCallAccepted] = useState("false");
    const [CallEnd, setCallEnd] = useState("false");
    const[callSignal, setCallSignal]= useState("")
    const[caller, setCaller]= useState("")
    const[idToCall, setIdToCall]= useState("")
    const[name, setName]= useState("")
    const[me,setMe]=useState("")

    const textAreaRef = useRef(null);
    
    const myVideo = useRef();
    const userVideo= useRef()
    const connectionRef = useRef()
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
    
                if (decoded.userId) {
                    socket.emit('setUserId', decoded.userId);
                    const userIdToCheck = decoded.userId; // Use decoded.userId for comparison
    
                    socket.emit("checkOnlineStatus", userIdToCheck, (response) => {
                        console.log("Online status of user:", response);
                        // Handle the response here, e.g., update UI based on online status
                        if (decoded.userId === userIdToCheck && response.isOnline) {
                            setUserIdNew(decoded.userId)
                             
                        }
                    });
                }
                 
                console.log("use",userIdNew)
                socket.on('connectedWithId', (userId) => {
                    console.log(`Successfully connected with ID: ${userId}`);
                });
            }
        } else {
            alert("Token does not exist");
        }
    }, [decodedId, socket,setUserIdNew, userIdNew]); // Include 'socket' in the dependency array if it's coming from props or context
    

 const handleCopyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      // Optionally, you can provide user feedback after copying
      alert('Copied to clipboard: ' + me);
    }
  };

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
                const response = await axios.get("http://localhost:9000/getAllPictures");
                if (response.status === 200) {
                    const newRows2 = response.data.findAllPictures.map((item) => ({
                        userId_user: item.userId,
                        Picture: item.Picture,
                        Name: item.name,
                        email: item.Email,
                    }));
                    setEmployeeList(newRows2);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function chat() {
        setIsVisibleChat(!isVisibleChat);
    }

console.log("me", me)


   

    return (
        <>
        <div className="container-fluid zoom">
            <div className="rowHeader">
                <div className="col_header">
                    <h3>Connect<b style={{ color: "#000080" }}>Z</b><b style={{ marginLeft: "20px" }}>O</b> <b style={{ marginLeft: "35px" }}>O</b><b style={{ marginLeft: "49px" }}>M</b></h3>
                </div>
                <div className="col_header">
                <textarea
        ref={textAreaRef}
        value={me}
        readOnly // Make the textarea read-only
        style={{ position: 'absolute', left: '-9999px' }} // Hide the textarea from view
      />
      {/* Multiple buttons to copy the value to the clipboard */}
      <button variant="contain" onClick={handleCopyToClipboard}>Copy ID</button>

                </div>
                <div className="col_header">
                    {callAccepted && !CallEnd ? (
                        <button variant="contain" onClick={leaveCall} text={me}>CallEnd</button>

                    ):( <button variant="contain" onClick={()=>CallUser(idToCall)}>call</button>)}
                </div>
                <div className="col_header">hwoo</div>
            </div>

            <div className="rowContent">
                <div className="contentHeader list1">
{myStream && <video playsInline muted ref={myVideo} autoPlay style={{width:"400px"}}/>}
                
                {callAccepted && ! CallEnd ? <video playsInline  autoPlay ref={userVideo} style={{width:"400px"}} /> : null}



                </div>
                <div className="contentHeader list">
                    <h6 className=" bg-primary te" id="zoom_title">employeee</h6>
                    {employeeList.map((item, k) => (
                        <div key={k}>
                            <table className="  table table-dark " style={{ width: "90%", height: "2.5vh", overflow: "scroll", cursor: "pointer" }}>
                                <tbody>
                                    <tr >
                                        <td ><Icon  icon="carbon:dot-mark" /></td>
                                        <td>{item.Name}</td>
                                        <td><img src={item.Picture} style={{ width: "40px", borderRadius: "50PX", height: "30px" }} /></td>
                                        <td>invite</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rowDown">
                <div className="col">
                    <h3><Icon style={{ color: "#1ca9c9" }} icon="flowbite:microphone-solid" /><br></br>
                        <span style={{ fontSize: "10px" }}>Mic</span>
                    </h3>
                </div>
                <div className="col">
                    <h3><Icon  onClick={VideoShow} style={{ color: "#1ca9c9" }} icon="gg:camera" /> <br></br>
                        <span style={{ fontSize: "12px" }}>Stop Camera</span>
                    </h3>
                </div>
                <div className="col">
                    <h3><Icon style={{ color: "coral" }} icon="mdi:record-rec" /> <br></br>
                        <span style={{ fontSize: "12px" }}>Record</span>
                    </h3>
                </div>
                <div className="col">
                    <h3><Icon style={{ color: "#1ca9c9" }} icon="fluent:people-community-add-28-filled" /> <br></br>
                        <span style={{ fontSize: "12px" }}>Participants</span>
                    </h3>
                </div>
                <div className="col">
                    <h3><Icon style={{ color: "#7FFFD4" }} icon="fluent:share-screen-person-overlay-24-regular" /><br></br>
                        <span style={{ fontSize: "12px" }}>Share Screen</span>
                    </h3>
                </div>
                <div className="col">
                    <h3 onClick={chat}><Icon style={{ color: "#1ca9c9" }} icon="jam:messages-f" /><br></br>
                        <span style={{ fontSize: "12px" }}>Chat</span>
                    </h3>
                    {!isVisibleChat && (
                        <div className="chatBox">
                            {employeeList.map((item, k) => (
                                <div key={k}>
                                    <table className="  table table-dark " style={{ width: "90%", height: "2.5vh", overflow: "scroll", cursor: "pointer" }}>
                                        <tbody>
                                            <tr >
                                                <td><input type="checkbox" /></td>
                                                <td>{item.Name}</td>
                                                <td><img src={item.Picture} style={{ width: "40px", borderRadius: "50PX", height: "30px" }} /></td>
                                                <td>Chat</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col">
                    <h3><Icon style={{ color: "#1ca9c9" }} icon="ic:outline-security" /><br></br>
                        <span style={{ fontSize: "12px" }}>Security</span>
                    </h3>
                </div>
                <div className="col">
                    <h3 className="btn  btn-outline-danger"> End</h3>
                </div>
            </div>
        </div>
    </>
    );
}

export default Zoom;
