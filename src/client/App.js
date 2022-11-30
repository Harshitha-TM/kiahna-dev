import React, { useState } from 'react';
import './app.css';
import CompanyLogo from './companyLogo.png';
import HomePage from './components/homepage';
import FinalPage from './components/finalPage';
import Bg_01 from './images/bg_01.png';
import Bg_02 from './images/bg_02.png';
import Bg_03 from './images/bg_03.png';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App(props) {
  const [btnMelaninMix, setBtnMelaninMix] = useState(true);
  const navigate = useNavigate();
  return (
    <div className='container'>
      <header>
        <div className='row'>
          <img className='banner col-sm-1' src={Bg_01} width={150} height={70}></img>
          <img className='company-logo col-sm-10' src={CompanyLogo} alt="KI-AH-NA" />
        </div>
      </header>

      <section className='wrapper'>
        <Routes>
          <Route path="/finalPage" element={<FinalPage />} />
          <Route path="/" element={<HomePage setBtnMelaninMix={setBtnMelaninMix} />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;