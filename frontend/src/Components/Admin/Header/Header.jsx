import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderModel from '@/Components/Global/HeaderModel/HeaderModel';


const Header = () => {
  return (
    <HeaderModel headerid={'admin'}>
      <NavLink end to="/admin" className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Editais</NavLink>
      <NavLink end to="/admin/edital/create" className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Novo Edital</NavLink>
      <NavLink end to="/admin/perfis" className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Gerenciar Perfis</NavLink>
      <NavLink end to="/admin/usuarios" className={({ isActive }) => `link-page ${isActive ? "active-link border-b-2 border-secondary dark:border-primary" : ""}`}>Gerenciar Usuários</NavLink>
    </HeaderModel>
  );
};

export default Header;