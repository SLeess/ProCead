npm install react-router-dom

Passo 2: Configuração Principal (BrowserRouter)
O React Router precisa "envolver" toda a sua aplicação para que ele possa controlar o histórico de navegação do navegador. O melhor lugar para fazer isso é no seu arquivo de entrada principal, geralmente src/main.jsx ou src/index.js.

JavaScript

// src/main.jsx (ou index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // 1. Importe o BrowserRouter

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolva o seu componente <App> com o <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


npm install tailwindcss @tailwindcss/vite
https://medium.com/@sumitnce1/setting-up-react-19-with-tailwind-css-v4-and-shadcn-ui-without-typescript-b47136d335da

npm install react-icons

npm install react-toastify

npm install -D @types/node



npx flowbite-react@latest init
npm install flowbite