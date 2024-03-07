import React from "react";
import './Book.css'

function Book() {
  const handleBooking =()=>{
    alert("confirm your booking")
  }
    return (  <div>
        <h1>Minster Booking</h1>
        
            <form className="formApp" onSubmit={handleBooking}>
        
        <div className='book_ms'>
        <label d='labelMs'>
        Tel:
          <input  className="inputMs" type="tel" required />
        </label>
        <label id='labelMs1'>
          Address:
          <input  className="inputMs"type="text"  required/>
        </label>
            <label id='labelMs'>
          Minster care:
           <select required className="inputMs"> 
            <option value="grapefruit">House keeping</option>
            <option value="lime">Car Wash</option>
            <option value="coconut">Personal Care</option>
          
            
          </select>
        </label>
        </div>
    
        <button className='confirm' type='submit'>Book</button>
        </form>
        </div>

    );
}

export default Book ;