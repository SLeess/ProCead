import React from 'react';
import './MeusProcessos.css'
import { FaSearch } from 'react-icons/fa';

function MeusProcessos() {
  return (
    <div className="px-6 mt-10 py-12 bg-white rounded-2xl" style={{boxShadow: "-1px 0px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 2px 0px rgba(0, 0, 0, 0.25)",}}>
        <div className="text-center mb-12 flex flex-row space-x-6">
          <h1 className="text-4xl text-gray-800 font-normal">Meus Processos Seletivos</h1>
          <div className="inputCustom">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18 18L14.5 14.5" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#727272" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text"/>
          </div>
          <div className="relative">
            <div className="absolute top-3 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-20">

        </div>       */}
    </div>
  );
}

export default MeusProcessos;