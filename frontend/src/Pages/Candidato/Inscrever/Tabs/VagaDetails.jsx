import React from 'react';

const VagaDetails = ({ vaga, vagas }) => {
  if (vaga.title === "" || vaga.polo === "" || vaga.modalidade === "") {
    return null;
  }

  const vagaDetalhe = vagas.find(v => v.id == vaga.vaga);

  if (!vagaDetalhe) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-bold">{vaga.title}</h3>
        <p className="text-sm text-red-600">Detalhes da vaga não encontrados.</p>
      </div>
    );
  }

  const polo = vagaDetalhe.campus.find(c => c.id == vaga.polo);
  const modalidade = vagaDetalhe.vagas_por_modalidade.find(m => m.modalidade.id == vaga.modalidade);
  const categoria = vagaDetalhe.categorias_customizadas.find(c => c.id == vaga.categoria);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{vaga.title}</h3>
      <p className="text-sm text-gray-600">Campus: {polo ? polo.nome : vaga.polo} | MG</p>
      <p className="text-sm bg-gray-100 dark:bg-slate-600 p-2 rounded-md mt-2">Modalidade: {modalidade ? modalidade.modalidade.descricao : vaga.modalidade}</p>
      {vaga.categoria &&
        <p className="text-sm bg-gray-100 dark:bg-slate-600 p-2 rounded-md mt-2">Categoria: {categoria ? categoria.nome : vaga.categoria}</p>
      }
    </div>
  );
};

export default VagaDetails;