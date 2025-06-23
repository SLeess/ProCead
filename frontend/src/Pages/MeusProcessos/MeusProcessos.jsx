import Header from '@/Components/Header/Header';
import Processos from '@/Components/Processos/Processos';
import React from 'react';

function MeusProcessos() {
  return (
    // Definindo uma cor de fundo para a página inteira
    <div className="min-h-screen">
      <Header />
      <Processos />
    </div>
  );
}

export default MeusProcessos;