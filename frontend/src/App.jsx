
// import './App.css'
import { useContext } from 'react';
import Login from './Pages/Auth/Login';
import Registro from './Pages/Auth/Registro';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout';
import MeusProcessos from './Pages/MeusProcessos/MeusProcessos';
import Users from './Pages/Users/Users';
import { Routes, Route, Link } from 'react-router-dom';
import { AppContext } from './Contexts/AppContext';
import AuthCandidatoRoutes from './Routes/AuthCandidatoRoutes';
import GuestRoutes from './Routes/GuestRoutes';

function App() {
  const { user } = useContext(AppContext);
  return (
    <>
    
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
              
            <Route element={<GuestRoutes/>}>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registro' element={<Registro/>}/>            
            </Route>

            <Route element={<AuthCandidatoRoutes/>}>
              <Route index element={<Home/>}/>
              <Route path='/meus-processos' element={<MeusProcessos/>}/>
            </Route>

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
