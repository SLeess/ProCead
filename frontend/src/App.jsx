import { Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import LayoutAdmin from './Pages/LayoutAdmin';

// Páginas Públicas
import Login from './Pages/Candidato/Auth/Login/Login';
import Registro from './Pages/Candidato/Auth/Registro/Registro';
import AdminLogin from './Pages/Admin/Auth/AdminLogin';

// Páginas de Candidato
import Home from './Pages/Candidato/Home/Home';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';

// Páginas de Admin
import Inscricoes from './Pages/Admin/Inscricoes/Inscricoes';

// Componentes de Rota
import ProtectedRoute from './Routes/ProtectedRoute';
import GuestRoutes from './Routes/GuestRoutes';
import GuestAdminRoutes from './Routes/GuestAdminRoutes';
import 'react-toastify/dist/ReactToastify.css';

// Nossas novas páginas de exemplo
import HomePage from './Pages/HomePage';
import EditalPage from './Pages/EditalPage';
import ProcessosAtivos from './Pages/Candidato/ProcessosAtivos/ProcessosAtivos';
import EsqueceuSenha from './Pages/Candidato/Auth/EsqueceuSenha/EsqueceuSenha';
import RecuperarSenha from './Pages/Candidato/Auth/RecuperarSenha/RecuperarSenha';
import { ToastContainer } from 'react-toastify';
import UserManagePage from './Pages/UserManagePage';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Routes>
          {/* ======================================= */}
          {/* ========= ROTAS PÚBLICAS/GUEST ======== */}
          {/* ======================================= */}
          
          {/* Rotas para convidados da área de Candidato */}
          <Route element={<GuestRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/esqueceu-senha' element={<EsqueceuSenha />} />
            <Route path='/recuperar-senha' element={<RecuperarSenha />} />
            <Route path='/permissions' element={<UserManagePage userId={1}/>}/>
          </Route>

          {/* Rota para convidados da área de Admin */}
          <Route element={<GuestAdminRoutes />}>
            <Route path='/admin/login' element={<AdminLogin />} />
          </Route>

          {/* ============================================== */}
          {/* ========= ROTAS PROTEGIDAS (CANDIDATO) ========= */}
          {/* ============================================== */}
          <Route 
            path='/' 
            element={
              <ProtectedRoute role="candidato">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProcessosAtivos />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/edital/:editalId" element={<EditalPage />} />
            <Route path='meus-processos' element={<MeusProcessos />} />
          </Route>

          {/* =========================================== */}
          {/* ========= ROTAS PROTEGIDAS (ADMIN) ======== */}
          {/* =========================================== */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute role="admin">
                <LayoutAdmin />
              </ProtectedRoute>
            }
          >
            <Route path='inscricoes' element={<Inscricoes />} />
          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
