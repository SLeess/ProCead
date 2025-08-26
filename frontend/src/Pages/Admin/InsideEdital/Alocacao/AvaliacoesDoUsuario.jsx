import { AppContext } from '@/Contexts/AppContext';
import { Undo2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AlocacaoInscricoes from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Inscricoes/AlocacaoInscricoes';
import AlocacaoCotas from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Cotas/AlocacaoCotas';
import AlocacaoRecursos from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Recursos/AlocacaoRecursos';
import AlocacaoMatriculas from '@/Components/Admin/InsideEdital/Modais/Alocacao/Tabs/Matriculas/AlocacaoMatriculas';
import { TabPanel, TabView } from 'primereact/tabview';

const AvaliacoesDoUsuario = () => {
    const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);
    const { editalId } = useParams();
    const navigate = useNavigate();

    // tabs.
    const scrollableTabs = [
        {title: "Avaliação de Inscrições", component: <AlocacaoInscricoes />},
        {title: "Avaliação de Cotas", component: <AlocacaoCotas />},
        {title: "Avaliação de Recursos", component: <AlocacaoRecursos />},
        {title: "Avaliação de Matrículas", component: <AlocacaoMatriculas />},
    ];

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

                <TabView scrollable>
                    {scrollableTabs.map((tab) => {
                        return (
                            <TabPanel className="text-md" header={tab.title}>
                                {tab.component}
                            </TabPanel>
                        );
                    })}
                </TabView>
            </div>


        )
    else {
        return (
            <AccessDenied />
        )
    }
}

export default AvaliacoesDoUsuario