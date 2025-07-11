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

   return (
     <header id='user' className="">
        <nav className={`${isMenuOpen ? `rounded-t-2xl` : `rounded-2xl`}`}>

          {/* Menu para Desktop */}
          <div className={`hidden md:flex items-center`}>
             <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" className="w-[120px] h-[50px]"/>
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
               {/* <li>
                  <NavLink to="/home" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                    Teste Pages
                  </NavLink>
               </li> */}
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
             <img src="/img/logo_cead_bg_white.png" alt="Logo CEAD" className="w-[70px] h-[35px] my-2"/>
          </div>
          <div className="md:hidden flex flex-row justify-center">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
               {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
             </button>
          </div>

          {/* --- INÍCIO DA MUDANÇA --- */}
      {/* Menu Mobile com Animação */}
      <div 
        className={`
          md:hidden absolute top-full left-0 w-full rounded-b-2xl bg-gradient-to-r from-[#004DA9] to-[#2A83ED] shadow-lg p-4 z-20
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <ul id='mobile' className="flex flex-col flex-1/2 space-y-4 items-center">
          <li>
            <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `link-page ${isActive ? "bg-white/10 rounded-md" : "hover:bg-white/5"}`}>
              Processos Ativos
            </NavLink>
          </li>
          <li>
            <NavLink to="meus-processos" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `link-page ${isActive ? "bg-white/10 rounded-md" : "hover:bg-white/5"}`}>
              Meus Processos
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/home" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `link-page ${isActive ? "bg-white/10 rounded-md" : "hover:bg-white/5"}`}>
              Teste Pages
            </NavLink>
          </li> */}
        </ul>
        <div className="flex justify-end items-center space-x-4 mt-6 pt-4 border-t border-white/20">
          <ThemeToggleBtn />
          <UserDropdown user={user}/>
        </div>
      </div>
      {/* --- FIM DA MUDANÇA --- */}
          
      </nav>
    </header>
  );
};

export default Header;