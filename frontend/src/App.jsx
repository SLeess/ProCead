
// import './App.css'
import Login from './Pages/Candidato/Auth/Login';
import Registro from './Pages/Candidato/Auth/Registro';
import Home from './Pages/Candidato/Home/Home';
import Inscricoes from './Pages/Admin/Inscricoes/Inscricoes';
import Layout from './Pages/Layout';
import LayoutAdmin from './Pages/LayoutAdmin';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';
import Sidebar from './Pages/Sidebar/Sidebar';
import { Routes, Route, Link } from 'react-router-dom';
import AuthCandidatoRoutes from './Routes/AuthCandidatoRoutes';
import GuestRoutes from './Routes/GuestRoutes';

function App() {
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

          <Route path='/admin' element={<LayoutAdmin/>}>
            <Route path='/admin/inscricoes' element={<Inscricoes/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
