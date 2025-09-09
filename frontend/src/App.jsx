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
  import MeusProcessos from './Pages/Candidato/Home/MeusProcessos/MeusProcessos';
  import EditalPage from './Pages/Test/EditalPage';
  import ProcessosAtivos from './Pages/Candidato/Home/ProcessosAtivos/ProcessosAtivos';
  /** ------------------------------------ Páginas Candidato de Processo ---------------------------- */
    import VisaoGeral from './Pages/Candidato/InsideProcesso/VisaoGeral';
  /** ----------------------------------------------------------------------------------------------- */
/** ------------------------------------------------------------------------------------------ */


/** ------------------------------------ Páginas de Admin ------------------------------------ */
  import Editais from './Pages/Admin/Home/Editais/Editais';
  import NovoEdital from './Pages/Admin/Home/NovoEdital/NovoEdital';
  
  import GerenciarPerfis from './Pages/Admin/Home/GerenciarPerfis/GerenciarPerfis';
  /** ------------------------------------ Páginas de Gerência de Permissões do Perfil ---------------------------- */
    import GerenciarPerfisPermissoes from './Pages/Admin/Home/GerenciarPerfis/ActionPages/GerenciarPerfisPermissoes/GerenciarPerfisPermissoes';
  /** ------------------------------------ Páginas de Gerência de Permissões do Perfil ---------------------------- */
  
  import GerenciarUsuarios from './Pages/Admin/Home/GerenciarUsuarios/GerenciarUsuarios';
  /** ------------------------------- Páginas de Gerência de Permissões e Perfis do Usuário ----------------------- */
    import GerenciarUsuariosPerfisPermissoes from './Pages/Admin/Home/GerenciarUsuarios/ActionPages/GerenciarUsuariosPerfisPermissoes/GerenciarUsuariosPerfisPermissoes';
    import GerenciarUsuariosPerfisPermissoesPorEdital from './Pages/Admin/Home/GerenciarUsuarios/ActionPages/GerenciarUsuariosPerfisPermissoesPorEdital/GerenciarUsuariosPerfisPermissoesPorEdital';
  /** ------------------------------- Páginas de Gerência de Permissões e Perfis do Usuário ----------------------- */

  import RelatoriosCustom from './Pages/Admin/Home/RelatoriosCustom/RelatoriosCustom';
  import Anexos from './Pages/Admin/Home/Anexos/Anexos';
  import LogsGerais from './Pages/Admin/Home/Logs/Logs';

    /** ------------------------------------ Páginas Adm de Edital ---------------------------- */
    import Inscricoes from './Pages/Admin/InsideEdital/Inscricoes/Inscricoes';
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
    import Edital from './Pages/Admin/InsideEdital/Edital/Edital';
    import PreviewChamadas from './Pages/Admin/InsideEdital/Chamadas/Pre-Visualizacao/PreviewChamadas';
    

    /** --------------------------------------------------------------------------------------- */

/** ------------------------------------------------------------------------------------------ */

// Componentes de Rota
import ProtectedRoute from './Routes/ProtectedRoute';
import GuestRoutes from './Routes/GuestRoutes';
import GuestAdminRoutes from './Routes/GuestAdminRoutes';

// ToastFy
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inscrever from './Pages/Candidato/Inscrever/Inscrever';
import Inscricao from './Pages/Candidato/Inscrever/Inscricao';
import Classificacao from './Pages/Admin/InsideEdital/Classificacao/Classificacao';


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
            <Route path="/edital/:editalId" element={<EditalPage />} />
            <Route path="/edital/:editalId/inscrever" element={<Inscrever />} />
            <Route path="/inscricao/:editalId" element={<Inscricao />} />
            <Route path='meus-processos' element={<MeusProcessos />} />
            <Route path='/edital/:editalId/geral' element={<VisaoGeral />} />
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
            <Route index element={<Editais />} />
            <Route path='edital/create' element={<NovoEdital />} />
            <Route path="perfis" element={<GerenciarPerfis/>} />
            <Route path="perfis/:perfilId/">
              <Route path='permissoes' element={<GerenciarPerfisPermissoes/>}></Route>
            </Route>
            <Route path="usuarios" element={<GerenciarUsuarios/>} />
            <Route path="usuarios/:userId/" >
              <Route path="cargos-e-permissoes">
                <Route index element={<GerenciarUsuariosPerfisPermissoes/>}></Route>
                <Route path=":editalId" element={<GerenciarUsuariosPerfisPermissoesPorEdital/>}></Route>
              </Route>
            </Route>
            <Route path="relatorios-custom" element={<RelatoriosCustom/>} />
            <Route path="anexos" element={<Anexos/>} />
            <Route path="logs" element={<LogsGerais/>} />
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
            <Route path='configuracoes' element={<Edital />} />
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
            <Route path='preview-chamada' element={<PreviewChamadas />} />
            <Route path='classificacao' element={<Classificacao />} />
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
