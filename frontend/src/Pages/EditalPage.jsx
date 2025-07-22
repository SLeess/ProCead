import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Contexts/AppContext';

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
    const { user, hasPermissionForEdital, loading, permissions } = useAppContext();

    console.log("here");
    console.log(permissions);
    
    if (loading) {
        return <div>Carregando permissões...</div>;
    }

    if (!user) {
        return <div>Você precisa estar logado para ver esta página.</div>;
    }

    const canAdmin = hasPermissionForEdital('administrar', editalId);
    const canApply = hasPermissionForEdital('inscrever-se', editalId);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Página do Edital {editalId}</h1>
            <p>Logado como: <strong>{user.email}</strong></p>

            {canAdmin && <AdminDashboard editalId={editalId} />}
            {canApply && <CandidateArea editalId={editalId} />}

            {!canAdmin && !canApply && (
                <div style={{ border: '2px solid red', padding: '20px', marginTop: '20px' }}>
                    <h3>Acesso Negado</h3>
                    <p>Você não tem permissões de administrador ou candidato para este edital.</p>
                </div>
            )}
        </div>
    );
}
