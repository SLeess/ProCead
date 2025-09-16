import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderModel from '@/Components/Global/HeaderModel/HeaderModel';
import { useAppContext } from '@/Contexts/AppContext';


const Header = () => {
  const { hasGlobalPermission, isSuperAdmin } = useAppContext();
  return (<>
      <HeaderModel headerid={'admin'}>
        <NavLink end to="/admin" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>Editais</NavLink>
        {
          hasGlobalPermission('cadastrar-edital') &&
          <NavLink end to="/admin/edital/create" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>Novo Edital</NavLink>
        }
        {
          isSuperAdmin() &&
          <NavLink end to="/admin/perfis" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>Perfis</NavLink>
        }
        {
          isSuperAdmin()  &&
          <NavLink end to="/admin/usuarios" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link md:border-b-2 border-secondary dark:border-primary" : ""}`}>Usuários</NavLink>
        }
        <NavLink end to="/admin/relatorios-custom" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Relatórios</NavLink>
        <NavLink end to="/admin/anexos" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Anexos</NavLink>
        <NavLink end to="/admin/logs" className={({ isActive }) => `link-page my-2 ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Logs</NavLink>
      </HeaderModel>
  </>);
};

export default Header;