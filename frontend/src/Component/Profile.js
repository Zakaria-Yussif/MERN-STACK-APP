import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Proofile.css';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';




function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const[decodedEmail, setDecodeEmail]=useState("")
 const[decodedName, setDecodedName]=useState(" ")
 const[decodedId, setDecodedId]=useState(" ")

  const navigate = useNavigate();

  const resizeImage = (image, maxWidth, maxHeight) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = image.width;
    let height = image.height;

    // Calculate new dimensions to maintain aspect ratio
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg'); // You can adjust the format as needed
  };

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
      }else{
        alert("Token not exist")
      }
      //  if (!decoded){
      //   alert("Admin Authentification invalid")
      //  }
      //  setDecodeEmail(decodedEmail)
      //  setDecodedName(decodedName)
    
  }, []);

  const AddImage = async () => {
    if (selectedImage) {
      // Convert the selected image to a Base64-encoded string
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const base64String = event.target.result;
  
        // Create an image element to get the dimensions
        const image = new Image();
        image.src = base64String;
  
        image.onload = async () => {
          // Resize the image
          const resizedBase64String = resizeImage(image, 300, 300); // Adjust dimensions as needed
  
          // Store the resized Base64-encoded string in localStorage
          let profile = {
            userId:decodedId,
            Email:decodedEmail,
            name:decodedName,
            profileImg: resizedBase64String,
          };
  
          try {
            const profilePicture = await axios.post("http://localhost:9000/uploadPicture", profile);
            console.log(profilePicture.data); // Assuming the server sends back some data
            // Implement navigation logic here if needed
          } catch (error) {
            console.error("Error uploading profile picture:", error);
            // Handle the error appropriately
          }
        };
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(selectedImage);
      navigate("/");
    }
  };
  
  
  function RemoveImg(event) {
    // Reset selected image to a default value
   
    setSelectedImage(null);
   
    
    


    // Additional actions after removing the image, such as navigation
  
  }

  return (
    <>
      <div className='selectImage'>
        <h4>Upload Profile Image</h4>
        <div></div>
        {selectedImage && (
          <div className='Img-container'>
            <img id='img' alt='not found' src={URL.createObjectURL(selectedImage)} />
            <br />
            <button id='remove' onClick={RemoveImg}>
              Remove
            </button>
            <button id='submit' onClick={AddImage}>
              Add
            </button>
          </div>
        )}

        <br />
        <br
         />

        <input
          type='file'
          // name='myImage'
          name="profilePicture" accept="image/*"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    </>
  );
}

export default Profile;
