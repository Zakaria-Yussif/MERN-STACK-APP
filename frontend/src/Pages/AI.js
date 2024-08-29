import React from "react";
import './AI.css'
import { Icon } from '@iconify/react';
import axios  from "axios";
import { useState, useEffect } from "react";

function AI() {

    const [response, setResponse] = useState('');
    const [sendingMsg, setSendingMsg]=useState("")
  const [userMessage, setUserMessage]=useState([])

    const sendMessage = async () => {
        if(sendingMsg.length ===0){
            alert("Write Something")
            return
        }
setUserMessage([...userMessage,sendingMsg])
setSendingMsg("")

        try {
            const response = await axios.post("http://localhost:9000/chat", sendingMsg);
            console.log("sending", response);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    


    
    return (
        <>
            <div className="AI">
        <div className="AI_image"><img id="AI_imgUrl" src="https://cdn-images-1.medium.com/max/1600/1*PKlBOfhHY3AXbsa0kUf9tA.png"/></div>
 <div className="AI_container">

{userMessage.map((item,k)=>(
    <div className="userMessage">{item}</div>

))}

<div className=" AI_footer" >
<div className="col text">
<textarea 
              id="textAreaPhone"
        className="outline-primary textAreaPhone "
        // value={sendingMsg}
        // ref={inputRef} 
        //  onChange={handleTyping}
     onChange={(e) => setSendingMsg(e.target.value)}
        rows="4"
        className="form-control" aria-label="With textarea"
        cols="40"
      > </textarea>
      
      </div>
      <div className="col send">
<button onClick={sendMessage} id="AI_ICON"  > <Icon  style={{fontSize:"30px", margin:"-50px 0px"}}  icon="zondicons:send" /></button>
</div>
</div>
 </div>
            </div>
        </>
      );
}

export default AI;