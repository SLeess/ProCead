import { AppContext } from '../../../Contexts/AppContext';
import React, { useContext, useState } from 'react';
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa'; // Ícone para o dropdown
import { NavLink } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';
import ThemeToggleBtn from '../../../Components/Global/ThemeToggleBtn/ThemeToggleBtn';
import './Header.css';

const Header = () => {
  
  const {user} = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyles = "block w-full py-3 text-center text-white font-semibold transition-colors duration-300 rounded-md";
  const activeLinkStyles = "bg-white/10";

  return (
    <header id='user' className="">
      <nav className={`${isMenuOpen ? `rounded-t-2xl` : `rounded-2xl`}`}>
        
        {/* Menu para Desktop */}
        <div className={`hidden md:flex items-center`}>
          <img src="/img/logo_cead_bg_white.png" alt="Logo CEAD" className="w-[120px] h-[50px]"/>
          <ul id='desktop'>
            <li>
              <NavLink to="/" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                Processos Ativos
              </NavLink>
            </li>
            <li>
              <NavLink to="meus-processos" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                Meus Processos
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          <div className="flex items-center space-x-1">
            <ThemeToggleBtn />
            <UserDropdown user={user}/>
          </div>
        </div>

        {/* Botão Sanduíche */}
        <div className="md:hidden flex flex-row justify-center items-center">
          <img src="/img/logo_cead_bg_white.png" alt="Logo CEAD" className="w-[120px] h-[50px]"/>
        </div>
        <div className="md:hidden flex flex-row justify-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full rounded-b-2xl bg-gradient-to-r from-[#004DA9] to-[#2A83ED] shadow-lg p-4 z-20">
            <ul id='mobile' className="flex flex-col flex-1/2 space-y-4 items-center">
              <li>
                <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                  Processos Ativos
                </NavLink>
              </li>
              <li>
                <NavLink to="meus-processos" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                  Meus Processos
                </NavLink>
              </li>
            </ul>
            <div className="flex justify-end items-center space-x-4 mt-6 pt-4 border-t border-white/20">
              <ThemeToggleBtn />
              <UserDropdown user={user}/>
            </div>
          </div>
        )}
        
      </nav>
    </header>
  );
};

export default Header;