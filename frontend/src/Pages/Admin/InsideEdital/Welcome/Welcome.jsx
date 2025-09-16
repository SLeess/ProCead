import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Welcome.css";

const welcome = () => {
    return (
        <div id="welcome-page">
            <div id="welcome-box">
                <div className="flex justify-center">
                    <FiCheckCircle id="welcome-icon" />
                </div>
                <h1 id="welcome-title">
                    Bem-vindo(a) ao <span className="text-[var(--admin-welcome-style)]">PROCEAD</span>!
                </h1>
                <p id="welcome-subtitle">
                    Seu sistema de gerenciamento de Processos Seletivos.
                </p>
                <p id="welcome-description">
                    Utilize o menu lateral para navegar entre as funcionalidades e gerenciar seus editais.
                </p>
            </div>
        </div>
    );
}

export default welcome;