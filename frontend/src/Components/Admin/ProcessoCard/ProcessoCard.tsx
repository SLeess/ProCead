import React, { useContext } from 'react';
import "./ProcessoCard.css";
import { NavigationContext } from '@/Contexts/NavigationContext';
import { EditalCardProps } from './interfaces';
import CardDropdown from './CardDropdown';

export default function ProcessoCard({ processo }: EditalCardProps ){
    const { navigate } = useContext(NavigationContext);

    const onClickBtnEntrar = (editalId) => {
        navigate(`/admin/edital/${editalId}/`);
    };

    return (
        <li className={`ProcessoCard`}>
            <article>
                <aside className={`lateralBar ${processo.status === 'Inscrições Abertas' || processo.status === 'Em Avaliação' ? `bg-[#28A745]`: `bg-[#6C757D]`}`}></aside>
                <div>
                    <div className='flex justify-between'>
                        <h3 className={`descricao`}>
                            {processo.descricao}
                        </h3>
                        <CardDropdown editalId={processo.id}/>
                    </div>
                    <p className={`edital`}>
                        EDITAL N.º {processo.edital}
                    </p>
                    <div className="flex-grow"></div>
                    <div className={`status`}>
                        <div>
                            <div>
                                <p>Data de início: {processo?.datas?.inscricoes?.inicio}</p>
                                <p>Data de término: {processo?.datas?.resultados?.final}</p>
                            </div>
                            <button className={`entrarBtn`} onClick={() => onClickBtnEntrar(processo.id)}>
                                Entrar no edital
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    )
};