
import Login from './Pages/Candidato/Auth/Login/Login';
// import './App.css'
import AdminLogin from './Pages/Admin/Auth/AdminLogin';
import Registro from './Pages/Candidato/Auth/Registro/Registro';
import Home from './Pages/Candidato/Home/Home';
import Inscricoes from './Pages/Admin/Inscricoes/Inscricoes';
import Layout from './Pages/Layout';
import LayoutAdmin from './Pages/LayoutAdmin';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';
import Sidebar from './Pages/Sidebar/Sidebar';
import { Routes, Route, Link } from 'react-router-dom';
import AuthCandidatoRoutes from './Routes/AuthCandidatoRoutes';
import AuthAdminRoutes from './Routes/AuthAdminRoutes';
import GuestRoutes from './Routes/GuestRoutes';
import ProcessosAtivos from './Pages/Candidato/ProcessosAtivos/ProcessosAtivos';
import GuestAdminRoutes from './Routes/GuestAdminRoutes';

function App() {
  return (
    <>

      <div className="App">
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route element={<GuestRoutes />}>
              <Route path='/login' element={<Login />} />
              <Route path='/registro' element={<Registro />} />
            </Route>

            <Route element={<AuthCandidatoRoutes/>}>
              {/* <Route index element={<ProcessosAtivos/>}/> */}
              <Route index element={<Home/>}/>
              <Route path='/meus-processos' element={<MeusProcessos/>}/>
            </Route>
            
            <Route element={<GuestAdminRoutes />}>
              <Route path='/admin/login' element={<AdminLogin />} />
            </Route>
            
          </Route>
          
          <Route element={<AuthAdminRoutes />}>
            <Route path='/admin' element={<LayoutAdmin />}>
              <Route path='/admin/inscricoes' element={<Inscricoes />} />
            </Route>
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
