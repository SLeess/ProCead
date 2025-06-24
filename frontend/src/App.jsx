
// import './App.css'
import Login from './Pages/Auth/Login';
import Registro from './Pages/Auth/Registro';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout';
import MeusProcessos from './Pages/MeusProcessos/MeusProcessos';
import Users from './Pages/Users/Users';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
    
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            
            <Route index element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro' element={<Registro/>}/>
            <Route path='/meus-processos' element={<MeusProcessos/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
