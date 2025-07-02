import { AppContext } from '../../../Contexts/AppContext';
import React, { useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Ícone para o dropdown
import { NavLink } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';
import ThemeToggleBtn from '../../../Components/Global/ThemeToggleBtn/ThemeToggleBtn';
import './Header.css';

const Header = () => {
  
  const {user} = useContext(AppContext);

  return (
    <header id='user'>
      <nav>
        <div className="flex items-center space-x-8 w-full">
          <img src="/img/logo_cead_bg_white.png" alt="" className="logo-cead"/>
          <ul>
              <li>
                <NavLink to="/" end 
                    className={({ isActive }) =>
                      "link-page" +
                      (isActive ? " border-b-2 border-white" : "")
                    }
                    >Home
                  </NavLink>
              </li>
              <li>
                <NavLink to="meus-processos" end 
                    className={({ isActive }) =>
                      "link-page" +
                      (isActive ? " border-b-2 border-white" : "")
                    }
                  >
                    Meus Processos
                  </NavLink>
              </li>
          </ul>
          
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggleBtn />
          <UserDropdown className="space-x-4" user={user}/>
          {/* <select className="bg-gray-50 border border-white text-gray-900 text-sm rounded-xl focus:ring-white focus:border-white block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">    
            <option value="">
              Olá {user.nome.split(" ")[0]}
            </option>
          </select> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;