import React, { useState, Component, useEffect } from 'react';
import Canvas from './canvas';
import { ImageCapture } from './imageCapture';
import '../responsive.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './finalPage';
import { config } from '../../../constants';
const URL = config.url;
const homepage = (props) => {

    const [dataFromChild, setDataFromChild] = useState("");
    const [clearImage, setClearImage] = useState(true);
    const [melaninMix, setMelaninMix] = useState("");
    const style = { backgroundColor: melaninMix };
    const navigate = useNavigate();
    const navigateToFinalPage = () => {
        navigate('/finalPage', { replace: true });
    };
    useEffect(() => {
        if (dataFromChild && melaninMix) {

            const formData = new FormData();
            formData.append("demo_image", dataFromChild);
            formData.append("color", melaninMix);
            try {
                fetch(`${URL}image`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    method: 'POST',
                    mode: 'cors',
                    body: formData,
                })
                    .then((res) => res)
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
            catch(err) {
                console.log("error", err);
            }
        }
        });
    return (
        <div className='homepage-section'>

            <div className='image-capture'>
                <ImageCapture
                    setClearImage={setClearImage}
                    setDataFromChild={setDataFromChild}
                    width="300"
                    height="500"
                />
            </div>
            <div className='canvas-section'>
                <Canvas
                    setMelaninMix={setMelaninMix}
                    imageToShow={dataFromChild}
                    width="300"
                    height="500"
                />
            </div>
            <div>
                {!clearImage ?
                    <button
                        onClick={() => navigateToFinalPage()}
                        className="melanin-btn"
                        style={style}>
                        Melanin Mix:
                        {melaninMix}
                    </button>
                    : ''
                }
            </div>
        </div>
    );
};
export default homepage;
