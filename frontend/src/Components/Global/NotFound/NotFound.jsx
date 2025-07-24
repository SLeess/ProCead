import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Página Não Encontrada</h1>
            <p className={styles.message}>A página que você está procurando não existe.</p>
            <button onClick={() => navigate(-1)} className={styles.button}>
                Voltar
            </button>
        </div>
    );
};

export default NotFound;
