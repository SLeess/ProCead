import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderModel from '@/Components/Global/HeaderModel/HeaderModel';
import { useAppContext } from '@/Contexts/AppContext';

export default function Header(){
  const { canAccessAdminArea } = useAppContext();
  return (
    <HeaderModel headerid={'user'}>
      <NavLink to="/" end className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>
        Processos Ativos
      </NavLink>
      <NavLink to="meus-processos" end className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>
        Meus Processos
      </NavLink>
      {
        canAccessAdminArea() && 
        <NavLink to="/admin" end className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>
          Área Administrativa
        </NavLink>
      }
    </HeaderModel>
  );
};