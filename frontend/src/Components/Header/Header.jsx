import React from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Ícone para o dropdown

const Header = () => {
  return (
    <header className="shadow-sm mt-2.5 rounded-2xl text-white xl:mx-6" style={{ 
        background: "linear-gradient(90deg, #004DA9 0%, #2A83ED 100%)",
    }}>
      <nav className="container mx-auto px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-8">

          <img src="../../../public/img/logo_cead_bg_white.png" alt="" className="text-xl" style={{width: "120px", height: "50px"}}/>
          
          <ul className="hidden md:flex items-center space-x-20 mx-10">
            <li>
              <a href="#" className="text-white border-b-2 pb-1 font-semibold">
                Processos Ativos
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-600">
                Meus Processos
              </a>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-2">
          <select className="bg-gray-50 border border-white text-gray-900 text-sm rounded-xl focus:ring-white focus:border-white block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">    
            <option value="">
                Olá Christine
            </option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;