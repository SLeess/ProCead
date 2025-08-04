import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderModel from '@/Components/Global/HeaderModel/HeaderModel';

export default function Header(){

  return (
    <HeaderModel headerid={'user'}>
      <NavLink to="/" end className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>
        Processos Ativos
      </NavLink>
      <NavLink to="meus-processos" end className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>
        Meus Processos
      </NavLink>
      {/* <NavLink to="/home" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : "hover:bg-white/5"}`}>
        Teste Pages
      </NavLink> */}
    </HeaderModel>
  );
};