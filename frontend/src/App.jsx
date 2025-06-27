
// import './App.css'
import Sidebar from './Pages/Sidebar/Sidebar';

import Login from './Pages/Candidato/Auth/Login';
import Registro from './Pages/Candidato/Auth/Registro';
import Home from './Pages/Candidato/Home/Home';
import Layout from './Pages/Candidato/Layout';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';
import { Routes, Route, Link } from 'react-router-dom';
import AuthCandidatoRoutes from './Routes/AuthCandidatoRoutes';
import GuestRoutes from './Routes/GuestRoutes';
import LayoutAdmin from './Pages/LayoutAdmin';

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
              
            <Route element={<GuestRoutes/>}>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registro' element={<Registro/>}/>            
            </Route>

            <Route element={<AuthCandidatoRoutes/>}>
              <Route index element={<Home/>}/>
              <Route path='/meus-processos' element={<MeusProcessos/>}/>
            </Route>

          </Route>

          <Route path='/admin' element={<LayoutAdmin/>}>
            
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
