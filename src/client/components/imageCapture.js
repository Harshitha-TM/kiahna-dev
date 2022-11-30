import React, { useState } from 'react';
import Webcam from "react-webcam";
import './styles.css';

const videoConstraints = {
    width: 300,
    height: 300,
   // facingMode: "user" //for desktop
    facingMode: "environment" 
};

export const ImageCapture = ({ setDataFromChild, width, height, setClearImage }) => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            setDataFromChild(imageSrc);
            setClearImage(false);
        });

    const refreshImage = () => {
        setDataFromChild("");
        setClearImage(true);
    }

    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam
                    audio={false}
                    height={height}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={width}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                        refreshImage();
                    }}
                        className="webcam-btn">
                        Retake Image
                    </button>
                    :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">
                        Capture
                    </button>
                }
            </div>
        </div>
    );
};