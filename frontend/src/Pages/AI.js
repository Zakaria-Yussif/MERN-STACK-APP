
// import React from "react";




// function AI() {

//     return ( 

//     <div>
//     <div className="zoom">
//             <div className="rowHeader">
//                 <div className="col_header">
                
//                 <Icon style={{color:"green", fontSize:"18px", zIndex:"10", margin:" 3px -60px 0px -10px"}}  icon="carbon:dot-mark" />
//                 <img
//             style={{margin:"-10px 12px", zIndex:"0"}}
//           className="avatar_img"
//           alt="Profile Image"
          
//           src={imageUrl}
//           className="avatar_img" 
//           title={ decodedName}
//         />
        
//                     {/* <h3>Connect<b style={{ color: "#000080" }}>Z</b><b style={{ marginLeft: "20px" }}>O</b> <b style={{ marginLeft: "35px" }}>O</b><b style={{ marginLeft: "49px" }}>M</b></h3> */}
//                 </div>
//                 <div className="col_header">
//                 <textarea
//         ref={textAreaRef}
//         value={me}
//         readOnly // Make the textarea read-only
//         style={{ position: 'absolute', left: '-9999px' }} // Hide the textarea from view
//       />
//       {/* Multiple buttons to copy the value to the clipboard */}
//       <button variant="contain" onClick={handleCopyToClipboard}>Copy ID</button>

//                 </div>
//                 <div className="col_header">
//                     {callAccepted && !CallEnd ? (
//                         <button variant="contain" onClick={leaveCall} text={me}>CallEnd</button>

//                     ):( <button variant="contain" onClick={()=>CallUser(idToCall)}>call</button>)}
//                 </div>
//                 <div className="col_header">hwoo</div>
//             </div>

//             <div className="rowContent">
//                 <div className="contentHeader list1">
// {myStream && <video playsInline muted ref={myVideo} autoPlay style={{width:"400px"}}/>}
                
//                 {callAccepted && ! CallEnd ? <video playsInline  autoPlay ref={userVideo} style={{width:"400px"}} /> : null}



//                 </div>
//                 <div className="contentHeader list">
//                     <h6 className=" bg-primary te" id="zoom_title">employeee</h6>
//                     {employeeList.map((item, k) => (
//                         <div key={k}>
//                             <table className="  table table-dark " style={{ width: "90%", height: "2.5vh", overflow: "scroll", cursor: "pointer" }}>
//                                 <tbody>
//                                     <tr >
//                                         <td ><Icon  icon="carbon:dot-mark" /></td>
//                                         <td>{item.Name}</td>
//                                         <td><img src={item.Picture} style={{ width: "40px", borderRadius: "50PX", height: "30px" }} /></td>
//                                         <td>invite</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="rowDown">
//                 <div className="col">
//                     <h3><Icon style={{ color: "#1ca9c9" }} icon="flowbite:microphone-solid" /><br></br>
//                         <span style={{ fontSize: "10px" }}>Mic</span>
//                     </h3>
//                 </div>
//                 <div className="col">
//                     <h3><Icon  onClick={VideoShow} style={{ color: "#1ca9c9" }} icon="gg:camera" /> <br></br>
//                         <span style={{ fontSize: "12px" }}>Stop Camera</span>
//                     </h3>
//                 </div>
//                 <div className="col">
//                     <h3><Icon style={{ color: "coral",marginLeft:"10px" }} icon="mdi:record-rec" /> <br></br>
//                         <span style={{ fontSize: "12px", }}>Record</span>
//                     </h3>
//                 </div>
//                 <div className="col">
//                     <h3><Icon style={{ color: "#1ca9c9", marginLeft:"20px" }} icon="fluent:people-community-add-28-filled" /> <br></br>
//                         <span style={{ fontSize: "12px" }}>Participants</span>
//                     </h3>
//                 </div>
//                 <div className="col screen">
//                     <h3><Icon style={{ color: "#7FFFD4" }} icon="fluent:share-screen-person-overlay-24-regular" /><br></br>
//                         <span style={{ fontSize: "12px" }}>Share Screen</span>
//                     </h3>
//                 </div>
//                 <div className="col chat">
//                     <h3 onClick={chat}><Icon style={{ color: "#1ca9c9" }} icon="jam:messages-f" /><br></br>
//                         <span style={{ fontSize: "12px" }}>Chat</span>
//                     </h3>
//                     {!isVisibleChat && (
//                         <div className="chatBox">
//                             {employeeList.map((item, k) => (
//                                 <div key={k}>
//                                     <table className="  table table-dark " style={{ width: "90%", height: "2.5vh", overflow: "scroll", cursor: "pointer" }}>
//                                         <tbody>
//                                             <tr >
//                                                 <td><input type="checkbox" /></td>
//                                                 <td>{item.Name}</td>
//                                                 <td><img src={item.Picture} style={{ width: "40px", borderRadius: "50PX", height: "30px" }} /></td>
//                                                 <td>Chat</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <div className="col security">
//                     <h3><Icon style={{ color: "#1ca9c9" }} icon="ic:outline-security" /><br></br>
//                         <span style={{ fontSize: "12px" }}>Security</span>
//                     </h3>
//                 </div>
//                 <div className="col end">
//                     <h3 className="btn  btn-outline-danger"> End</h3>
//                 </div>
//             </div>
//         </div>
//     </div>


//      );
// }

// export default AI;