import React, { useContext } from 'react';
import "./ProcessoCard.css";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { AlignJustify } from 'lucide-react';
import { NavigationContext } from '@/Contexts/NavigationContext';

export default function ProcessoCard({ processo }: ProcessoCardProps ){
    const { navigate } = useContext(NavigationContext);

    const onClickBtnEntrar = (editalId) => {
        navigate(`/admin/edital/${editalId}/`);
    };

    return (
        <li className={`ProcessoCard`}>
            <article>
                <aside className={`lateralBar ${processo.status === 'Em andamento' ? `bg-[#28A745]`: `bg-[#6C757D]`}`}></aside>
                <div>
                    <div className='flex justify-between'>
                        <h3 className={`descricao`}>
                            {processo.descricao}
                        </h3>
                        <AlignJustify className='w-[28px] h-[34px] flex-shrink-0 ml-2 dark:text-black'/>
                    </div>
                    <p className={`edital`}>
                        {processo.edital}
                    </p>
                    <div className="flex-grow"></div>
                    <div className={`status`}>
                        <div>
                            <div>
                                <p>Data de início: 27/05/2025</p>
                                <p>Data de término: 27/05/2025</p>
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

interface Processo{
    id: number,
    edital: String,
    descricao: String,
    status: String,
    obs: String,
}

interface ProcessoCardProps {
  processo: Processo
};
