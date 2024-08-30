import React, { useRef, useState, useEffect } from "react";
import './AI.css';
import { Icon } from '@iconify/react';
import axios from "axios";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

function AI() {
    const [response, setResponse] = useState('');
    const [sendingMsg, setSendingMsg] = useState("");
    const [userMessage, setUserMessage] = useState([]);
    const textareaRef = useRef(null);
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [image, setImage] = useState(null);

    // Load the MobileNet model when the component mounts
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
            console.log('Model loaded');
        };
        loadModel();
    }, []); // Empty dependency array to ensure it runs once on mount

    // Adjust textarea height based on input
    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to recalculate
            textareaRef.current.style.height = 'auto';
            // Set the height based on the scroll height, but constrained by CSS max-height
            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = parseInt(window.getComputedStyle(textareaRef.current).maxHeight, 10);
            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [sendingMsg]); // Run effect when `sendingMsg` changes

    const handleChange = (event) => {
        setSendingMsg(event.target.value);
    };

    const sendMessage = async () => {
        if (sendingMsg.length === 0) {
            alert("Write Something");
            return;
        }
        setUserMessage([...userMessage, sendingMsg]);
        setSendingMsg("");

        try {
            const response = await axios.post("http://localhost:9000/chat", { message: sendingMsg });
            console.log("sending", response);
            setResponse(response.data); // assuming the response has data you want to use
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const classifyImage = async () => {
        if (!model || !image) {
            alert("Model not loaded or image not selected.");
            return;
        }
        const img = document.getElementById('inputImage');
        const predictions = await model.classify(img);
        setPredictions(predictions);
    };

    return (
        <>
            <div className="AI">
                <div className="AI_image">
                    <img id="AI_imgUrl" src="https://cdn-images-1.medium.com/max/1600/1*PKlBOfhHY3AXbsa0kUf9tA.png" alt="AI" />
                </div>
                <div className="AI_container">
                    {userMessage.map((item, k) => (
                        <div key={k} className="userMessage">{item}</div>
                    ))}
                    <div>
                        <h1>Image Classifier using TensorFlow.js</h1>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {image && <img id="inputImage" src={image} alt="Selected" width="300" />}
                        <button onClick={classifyImage} disabled={!model}>Classify Image</button>
                        {predictions.length > 0 && (
                            <ul>
                                {predictions.map((prediction, index) => (
                                    <li key={index}>
                                        {prediction.className}: {Math.round(prediction.probability * 100)}%
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="AI_footer">
                        <div className="col text">
                            <textarea
                                id="textAreaPhone"
                                className="outline-primary textAreaPhone form-control"
                                value={sendingMsg}
                                ref={textareaRef}
                                onChange={handleChange}
                                rows="2"
                                style={{ overflow: 'hidden', resize: 'none' }}
                                aria-label="With textarea"
                            />
                        </div>
                        <div className="col send">
                            <button onClick={sendMessage} id="AI_ICON">
                                <Icon style={{ fontSize: "30px", margin: "-50px 0px" }} icon="zondicons:send" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AI;
