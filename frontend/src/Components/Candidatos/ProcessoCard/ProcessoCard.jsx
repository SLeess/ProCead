import React from 'react';
import styles from './ProcessoCard.module.css';

import { FaBookmark } from 'react-icons/fa';


export default function ProcessoCard({ processo }){
  const { edital, descricao, inscrito } = processo;

  const cardBaseStyle = 'relative bg-white p-6 rounded-xl shadow-md border transition-transform transform hover:-translate-y-1 flex flex-col';
  const cardBorderStyle = inscrito ? 'border-yellow-400 border-2' : 'border-gray-200';
  
  const buttonStyle = inscrito 
    ? 'bg-[#FFC107] text-white hover:bg-yellow-600 focus:ring-yellow-400' 
    : 'bg-[#28A745] text-white hover:bg-green-700 focus:ring-green-500';

  const limitarString = (text, maxLength) => {
    if(text.length <= maxLength){
      return text;
    } 
    return text.slice(0, maxLength) + "...";
  }


  return (
    <div className={`${cardBaseStyle} ${cardBorderStyle} min-h-[200px]`}>
      {
        inscrito && (
          <div className="absolute right-0 px-2 pb-2 text-yellow-500 top-0">
           <FaBookmark size="1.75em" />
          </div>
        )
      }
      <div className="flex-grow">
        <h3 className={`${styles.cardName} text-left mb-3`}>{edital}</h3>
        <p className={`${styles.cardContent} text-gray-500 text-sm mb-6`} >{ limitarString(descricao, 115) }</p>
      </div>

      <button className={`${buttonStyle} rounded-[15px] px-3 py-2 w-fit mx-auto hover:cursor-pointer`}>
        {inscrito ? 'Ver Inscrição' : 'Inscreva-se'}
      </button>
    </div>
  );
};
