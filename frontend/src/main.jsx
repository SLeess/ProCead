import { React } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import AppProvider from './Contexts/AppContext';
import { NavigationProvider } from './Contexts/NavigationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </BrowserRouter>
    </AppProvider>
  ///* </React.StrictMode> */
);
