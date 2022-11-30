import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './responsive.css';
import { render } from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom';



const root = document.getElementById("root");
render(<Router>
        <App />
      </Router>, root);
