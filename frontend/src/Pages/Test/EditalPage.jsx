import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../Contexts/AppContext';

const AdminDashboard = ({ editalId }) => (
    <div style={{ border: '2px solid green', padding: '20px', marginTop: '20px' }}>
        <h3>Painel do Administrador</h3>
        <p>Você tem permissões de <strong>administrador</strong> para o Edital ID: {editalId}.</p>
        <p>Aqui você pode gerenciar inscrições, publicar resultados, etc.</p>
    </div>
);

const CandidateArea = ({ editalId }) => (
    <div style={{ border: '2px solid blue', padding: '20px', marginTop: '20px' }}>
        <h3>Área do Candidato</h3>
        <p>Você tem permissões de <strong>candidato</strong> para o Edital ID: {editalId}.</p>
        <p>Aqui você pode fazer sua inscrição, ver seus dados, etc.</p>
    </div>
);

export default function EditalPage() {
    const { editalId } = useParams();
    const { user, loading, permissions } = useAppContext();

    console.log(permissions);
    
    if (loading) {
        return <div>Carregando permissões...</div>;
    }

    if (!user) {
        return <div>Você precisa estar logado para ver esta página.</div>;
    }


    return (
        <div style={{ padding: '20px' }}>
            <h1>Inscrito no edital {editalId}</h1>
        </div>
    );
}
