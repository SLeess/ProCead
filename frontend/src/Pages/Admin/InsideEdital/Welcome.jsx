import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const welcome = () => {
    return (
        <div className="flex items-center justify-center min-h-180 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-2xl w-full p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
                <div className="flex justify-center">
                    <FiCheckCircle className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Bem-vindo(a) ao <span className="text-purple-600 dark:text-purple-400">PROCEAD</span>!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Seu sistema de gerenciamento de Processos Seletivos.
                </p>
                <p className="pt-4 text-md text-gray-500 dark:text-gray-400">
                    Utilize o menu lateral para navegar entre as funcionalidades e gerenciar seus editais.
                </p>
            </div>
        </div>
    );
}

export default welcome;