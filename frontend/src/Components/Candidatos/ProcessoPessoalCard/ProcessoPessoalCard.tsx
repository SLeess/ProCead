import React from 'react';
import "./ProcessoPessoalCard.css";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { HiOutlineCheckCircle } from 'react-icons/hi';

export default function ProcessoPessoalCard({ processo }: ProcessoPessoalCardProps ){

    return (
        <li className={`ProcessoPessoalCard`}>
            <article>
                <aside className={`lateralBar ${processo.status === 'Em andamento' ? `bg-[#FFC107]`: `bg-[#6C757D]`}`}></aside>
                <div>
                    <h3 className={`descricao`}>
                        {processo.descricao}
                    </h3>
                    <p className={`edital`}>
                        {processo.edital}
                    </p>
                    <div className="flex-grow"></div>
                    <div className={`status`}>
                        {
                            processo.status === "Em andamento" ? 
                            <>
                                <HiOutlineCheckCircle className={`text-[#FFC107]`} size={22}/>
                                <span className={`text-[#FFC107]`}>
                                    {processo.status}
                                </span>
                            </>
                            :
                            <>
                                <HiOutlineArchiveBoxXMark className={`text-gray-700`} size={22}/>
                                <span className={`text-gray-700`}>
                                    {processo.status}
                                </span>
                            </>
                        }
                        <div>
                            <button className={`entrarBtn`}>
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

interface ProcessoPessoalCardProps {
  processo: Processo
};
