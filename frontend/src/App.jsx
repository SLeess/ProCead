
import Login from './Pages/Candidato/Auth/Login/Login';
import Registro from './Pages/Candidato/Auth/Registro/Registro';
import Home from './Pages/Candidato/Home/Home';
import Layout from './Pages/Candidato/Layout';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';
import { Routes, Route, Link } from 'react-router-dom';
import AuthCandidatoRoutes from './Routes/AuthCandidatoRoutes';
import GuestRoutes from './Routes/GuestRoutes';
import ProcessosAtivos from './Pages/Candidato/ProcessosAtivos/ProcessosAtivos';

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
              <Route index element={<ProcessosAtivos/>}/>
              {/* <Route index element={<Home/>}/> */}
              <Route path='/meus-processos' element={<MeusProcessos/>}/>
            </Route>

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
