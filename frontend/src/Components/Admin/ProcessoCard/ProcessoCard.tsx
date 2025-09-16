import React, { useContext } from 'react';
import "./ProcessoCard.css";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { AlignJustify } from 'lucide-react';
import { NavigationContext } from '@/Contexts/NavigationContext';
import { EditalCardProps } from './interfaces';

export default function ProcessoCard({ processo }: EditalCardProps ){
    const { navigate } = useContext(NavigationContext);

    const onClickBtnEntrar = (editalId) => {
        navigate(`/admin/edital/${editalId}/`);
    };

    console.log(processo);

    return (
        <li className={`ProcessoCard`}>
            <article>
                <aside className={`lateralBar ${processo.status === 'Inscrições Abertas' || processo.status === 'Em Avaliação' ? `bg-[#28A745]`: `bg-[#6C757D]`}`}></aside>
                <div>
                    <div className='flex justify-between'>
                        <h3 className={`descricao`}>
                            {processo.descricao}
                        </h3>
                        <AlignJustify className='w-[28px] h-[34px] flex-shrink-0 ml-2 dark:text-black'/>
                    </div>
                    <p className={`edital`}>
                        EDITAL N.º {processo.referencia}
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