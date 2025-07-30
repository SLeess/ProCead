import { Routes, Route, Outlet } from 'react-router-dom';

import Layout from './Layouts/Layout';
import LayoutAdmin from './Layouts/LayoutAdmin';
import LayoutAdminInsideEdital from './Layouts/LayoutAdminInsideEdital';

/** ------------------------------------ Páginas Públicas ------------------------------------ */
import Login from './Pages/Candidato/Auth/Login/Login';
import Registro from './Pages/Candidato/Auth/Registro/Registro';
import AdminLogin from './Pages/Admin/Auth/AdminLogin';
import EsqueceuSenha from './Pages/Candidato/Auth/EsqueceuSenha/EsqueceuSenha';
import RecuperarSenha from './Pages/Candidato/Auth/RecuperarSenha/RecuperarSenha';


/** ---------------------------------- Páginas de Candidato ---------------------------------- */
import HomeCandidato from './Pages/Candidato/Home/Home';
import MeusProcessos from './Pages/Candidato/MeusProcessos/MeusProcessos';
import HomePage from './Pages/Test/HomePage';
import EditalPage from './Pages/Test/EditalPage';
import ProcessosAtivos from './Pages/Candidato/ProcessosAtivos/ProcessosAtivos';
import UserManagePage from './Pages/Test/UserManagePage';
/** ------------------------------------------------------------------------------------------ */


/** ------------------------------------ Páginas de Admin ------------------------------------ */
import HomeAdmin from './Pages/Admin/Home/Home';
import NovoEdital from './Pages/Admin/NovoEdital/NovoEdital';
// import UsuariosAdminList from './Pages/Admin/Usuarios/Usuarios';
import Inscricoes from './Pages/Admin/InsideEdital/Inscricoes/Inscricoes';


/** ------------------------------------ Páginas Adm de Edital ---------------------------- */
import QuadroVagas from './Pages/Admin/InsideEdital/QuadroVagas/QuadroVagas';
import Cursos from './Pages/Admin/InsideEdital/Cursos/Cursos';
import Polos from './Pages/Admin/InsideEdital/Polos/Polos';
import Modalidades from './Pages/Admin/InsideEdital/Modalidades/Modalidades';
import Perfis from './Pages/Admin/InsideEdital/Perfis/Perfis';
import Usuarios from './Pages/Admin/InsideEdital/Usuarios/Usuarios';
import Logs from './Pages/Admin/InsideEdital/LogsDoSistema/Logs';
import NotFound from './Components/Global/NotFound/NotFound';
import Disciplinas from './Pages/Admin/InsideEdital/Disciplinas/Disciplinas';
import Cotas from './Pages/Admin/InsideEdital/Cotas/Cotas';
import Recursos from './Pages/Admin/InsideEdital/Recursos/Recursos';
import Chamadas from './Pages/Admin/InsideEdital/Chamadas/Chamadas';
import Alocacao from './Pages/Admin/InsideEdital/Alocacao/Alocacao';
import AvaliacoesDoUsuario from './Pages/Admin/InsideEdital/Alocacao/AvaliacoesDoUsuario';


/** --------------------------------------------------------------------------------------- */

/** ------------------------------------------------------------------------------------------ */

// Componentes de Rota
import ProtectedRoute from './Routes/ProtectedRoute';
import GuestRoutes from './Routes/GuestRoutes';
import GuestAdminRoutes from './Routes/GuestAdminRoutes';

// ToastFy
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <Route path='/permissions' element={<UserManagePage userId={1} />} />
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
              <ProtectedRoute area="candidato">
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
          <Route path='/admin'
            element={
              <ProtectedRoute area="admin">
                <LayoutAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeAdmin />} />
            <Route path='edital/create' element={<NovoEdital />} />
            <Route path="perfis" element={<></>} />
            <Route path="usuarios" element={<></>} />
            {/* <Route path='manejar-usuarios/:userId' element={<UserManagePage />} /> */}
          </Route>

          <Route path='/admin/edital/:editalId/'
            element={
              <ProtectedRoute area="admin">
                <LayoutAdminInsideEdital />
              </ProtectedRoute>
            }
          >
            <Route index element={<Inscricoes />} />
            <Route path='inscricoes' element={<Inscricoes />} />
            <Route path='quadro-vagas' element={<QuadroVagas />} />
            <Route path='cursos' element={<Cursos />} />
            <Route path='disciplinas' element={<Disciplinas />} />
            <Route path='polos' element={<Polos />} />
            <Route path='modalidades' element={<Modalidades />} />
            <Route path='perfis' element={<Perfis />} />
            <Route path='usuarios' element={<Usuarios />} />
            <Route path='logs' element={<Logs />} />
            <Route path='cotas' element={<Cotas />} />
            <Route path='recursos' element={<Recursos />} />
            <Route path='chamadas' element={<Chamadas />} />
            <Route path='alocacao' element={<Alocacao />} />
            <Route path='alocacao/user/:userId' element={<AvaliacoesDoUsuario />} />
          </Route>

          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
