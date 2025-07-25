import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderModel from '@/Components/Global/HeaderModel/HeaderModel';


const Header = () => {
  return (
    <HeaderModel headerid={'admin'}>
      <NavLink end to="/admin" className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : "hover:bg-white/5"}`}>Editais</NavLink>
      <NavLink end to="/admin/edital/create" className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : "hover:bg-white/5"}`}>Novo Edital</NavLink>
      <NavLink end to="/admin/usuarios" className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : "hover:bg-white/5"}`}>Gerenciar Usuários</NavLink>
    </HeaderModel>
  );
};

export default Header;