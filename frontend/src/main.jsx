import { React } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import jQuery from 'jquery';

Object.assign(window, { $: jQuery, jQuery });

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ///* </React.StrictMode> */
);
