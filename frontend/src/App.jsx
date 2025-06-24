
import './App.css'
import Home from './Pages/Home/Home'
import MeusProcessos from './Pages/MeusProcessos/MeusProcessos';
import Users from './Pages/Users/Users'
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/usuarios">Usuários</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/usuarios" element={<Users />} />
          <Route path="/" element={<MeusProcessos/>}/>
          {/* <Route path="/usuarios/:userId" element={<UserDetail />}/>  */}
        </Routes>
      </div>
    </>
  )
}

export default App
