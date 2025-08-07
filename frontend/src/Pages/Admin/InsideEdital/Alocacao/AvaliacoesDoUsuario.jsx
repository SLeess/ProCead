import { AppContext } from '@/Contexts/AppContext';
import { Undo2 } from 'lucide-react';
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AlocacaoInscricoes from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Inscricoes/AlocacaoInscricoes';
import AlocacaoCotas from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Cotas/AlocacaoCotas';
import AlocacaoRecursos from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Recursos/AlocacaoRecursos';
import AlocacaoMatriculas from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Matriculas/AlocacaoMatriculas';

const AvaliacoesDoUsuario = () => {
    const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);
    const { editalId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState("Avaliação de Inscrições");
    const tabs = ["Avaliação de Inscrições", "Avaliação de Cotas", "Avaliação de Recursos", "Avaliação de Matrículas"];

    if (hasPermissionForEdital('alocar-inscricoes-para-avaliacao', editalId) || isSuperAdmin())
        return (
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Alocar para Avaliação</h1>
                    <button onClick={() => navigate(-1)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                        <Undo2 className="inline" />
                        <span className='ml-1'>Voltar</span>
                    </button>
                </div>
                <div className="border-b px-2 bg-white mb-2 rounded-md shadow-md" >
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap pt-3 pb-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {activeTab === 'Avaliação de Inscrições' && (
                    <AlocacaoInscricoes />
                )}
                {activeTab === 'Avaliação de Cotas' && (
                    <AlocacaoCotas />
                )}
                {activeTab === 'Avaliação de Recursos' && (
                    <AlocacaoRecursos />
                )}
                {activeTab === 'Avaliação de Matrículas' && (
                    <AlocacaoMatriculas />
                )}
            </div>


        )
    else {
        return (
            <AccessDenied />
        )
    }
}

export default AvaliacoesDoUsuario