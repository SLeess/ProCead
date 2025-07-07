import React from 'react';
import styles from "./ProcessoPessoalCard.module.css"
import { HiOutlineCheckCircle } from 'react-icons/hi';

export default function ProcessoPessoalCard({ processo }: ProcessoPessoalCardProps ){

    return (
        <li className={`${styles.ProcessoPessoalCard}`}>
            <article className="flex flex-row border p-4 rounded-lg shadow-md bg-gray-50 space-x-3">
                <aside className={`${styles.lateralBar} ${processo.status === 'Em andamento' ? `bg-[#FFC107]`: `bg-[#6C757D]`}`}></aside>
                <div className='flex flex-col h-full w-full justify-around'>
                    <h3 className={`${styles.descricao}`}>
                        {processo.descricao}
                    </h3>
                    <p className={`${styles.edital}`}>
                        {processo.edital}
                    </p>
                    <div className="flex-grow"></div>
                    <div className={`mt-7 ${styles.status}`}>
                        <HiOutlineCheckCircle className={` ${processo.status === "Em andamento" ? 'text-[#FFC107]' : 'text-gray-700'}`} size={22}/>
                        <span className={` ${processo.status === "Em andamento" ? 'text-[#FFC107]' : 'text-gray-700'}`}>
                            {processo.status}
                        </span>
                        <div className={`w-full flex flex-row-reverse`}>
                            <button className={`cursor-pointer p-2 rounded-lg bg-[#095ec5] text-white dark:bg-white dark:text-[#29166F]`}>
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
