import React from "react";
import './AI.css'
import { Icon } from '@iconify/react';
import axios  from "axios";
import { useState, useEffect } from "react";

function AI() {

    const [response, setResponse] = useState('');
    const [sendingMsg, setSendingMsg]=useState("")
 

    const sendMessage = async () => {
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
<div className="colAI AI_message">{response}</div>
<div className="colAI AI_footer" >
<textarea 
              id="textAreaPhone"
        className="outline-primary input_AI"
        // value={sendingMsg}
        // ref={inputRef} 
        //  onChange={handleTyping}
     onChange={(e) => setSendingMsg(e.target.value)}
        rows="4"
        cols="40"
      > </textarea>

<button onClick={sendMessage} id="AI_ICON" style={{margin:"0px 100px 0px "}} > <Icon  style={{fontSize:"30px", margin:"-50px 0px"}}  icon="zondicons:send" /></button>
</div>

 </div>
            </div>
        </>
      );
}

export default AI;