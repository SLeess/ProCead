import React from 'react';
import styles from './ProcessoCard.module.css';

// O ícone de marcador é opcional, mas adiciona um detalhe visual
import { FaBookmark } from 'react-icons/fa';

const ProcessoCard = ({ processo }) => {
  const { edital, descricao, inscrito } = processo;

  const cardBaseStyle = 'relative bg-white p-6 rounded-xl shadow-md border transition-transform transform hover:-translate-y-1';
  const cardBorderStyle = inscrito ? 'border-yellow-400 border-2' : 'border-gray-200';
  
  const buttonBaseStyle = 'w-full py-2 px-4 rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2';
  const buttonStyle = inscrito 
    ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400' 
    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';

  return (
    <div className={`${cardBaseStyle} ${cardBorderStyle}`}>
      {inscrito && (
        <div className="absolute top-0 right-0 p-2 text-yellow-500">
           <FaBookmark size="1.5em" />
        </div>
      )}
      {/* text-xl font-bold text-gray-800 mb-2 */}
      
      <h3 className={`${styles.cardName}`}>{edital}</h3>
      <p className="text-gray-500 text-sm mb-6" 
        style={{fontFamily: "Sora, sans-serif", fontSize: "16px", fontStyle: "normal", lineHeight: "20px", textAlign: "justify"}}
      >{descricao}</p>
      
      <button className={`${buttonStyle} bg-[#FFC107]`}>
        {inscrito ? 'Ver Inscrição' : 'Inscreva-se'}
      </button>
    </div>
  );
};

export default ProcessoCard;