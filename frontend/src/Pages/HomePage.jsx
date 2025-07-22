import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Contexts/AppContext';

export default function HomePage() {
    const { user, logout } = useAppContext();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sistema de Editais</h1>
            {user ? (
                <div>
                    <p>Bem-vindo, <strong>{user.name}</strong> ({user.email})!</p>
                    <button onClick={logout}>Sair</button>
                </div>
            ) : (
                <p>Você não está logado. <Link to="/login">Faça o login</Link></p>
            )}

            <hr style={{ margin: '20px 0' }} />

            <h2>Navegue pelos Editais:</h2>
            <ul>
                <li><Link to="/edital/1">Acessar Edital 1</Link></li>
                <li><Link to="/edital/2">Acessar Edital 2</Link></li>
            </ul>
            <p>Tente acessar os editais com usuários diferentes para ver o sistema de permissão em ação.</p>
        </div>
    );
}
