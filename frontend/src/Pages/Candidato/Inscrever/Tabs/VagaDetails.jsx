import React from 'react';

const VagaDetails = ({ vaga }) => {
  if(vaga.categoria != "" && vaga.title != "" && vaga.polo != "" && vaga.modalidade != "")
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{vaga.title}</h3>
      <p className="text-sm text-gray-600">Campus: {vaga.polo} | MG</p>
      <p className="text-sm bg-gray-100 dark:bg-slate-600 p-2 rounded-md mt-2">{vaga.modalidade}</p>
      <p className="text-sm bg-gray-100 dark:bg-slate-600 p-2 rounded-md mt-2">{vaga.categoria}</p>
    </div>
  );
};

export default VagaDetails;
