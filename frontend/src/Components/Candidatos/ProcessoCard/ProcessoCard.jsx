import React from 'react';
import './ProcessoCard.css';

import { FaBookmark } from 'react-icons/fa';


export default function ProcessoCard({ processo }){
  const { edital, descricao, inscrito } = processo;

  const limitarString = (text, maxLength) => {
    if(text.length <= maxLength){
      return text;
    } 
    return text.slice(0, maxLength) + "...";
  }


  return (
    <div className={`cardBase ${inscrito ? 'cardBorderInscrito' : 'cardBorderNaoInscrito'}`}>
      {
        inscrito && (
          <div className={'bookmarkIcon'}>
           <FaBookmark size="1.75em" className='text-[#f1b500] dark:text-yellow-500'/>
          </div>
        )
      }
      <div className={`cardContentWrapper`}>
        <h3 className={`cardName`}>{edital}</h3>
        <p className={`cardContent`} >{ limitarString(descricao, 115) }</p>
      </div>

      <button className={`buttonBase ${inscrito ? `buttonInscrito` : `buttonNaoInscrito`}`}>
        {inscrito ? 'Ver Inscrição' : 'Inscreva-se'}
      </button>
    </div>
  );
};