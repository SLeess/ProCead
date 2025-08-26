import React, { useState } from "react";
import { Eye, Undo2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ChamadaShowModal = () => {
    const navigate = useNavigate();
    const { editalId } = useParams();
    const [activeTab, setActiveTab] = useState('Ampla Concorrência');
    const tabs = ['Ampla Concorrência', 'Negros e Pardos', 'Pessoa com Deficiência', 'Transgênero e Travesti', 'Egresso de Escola Pública'];

    function irParaPreview(editalId) {
        const showChamada = {
            title: 'Visualizar Chamada',
            editalref: editalId
        };
        navigate(`/admin/edital/${editalId}/preview-chamada`, {state: showChamada});
    }

    return (
        <button onClick={() => irParaPreview(editalId)} id="acoes-icons">
            <Eye id='show-btn' />
        </button>
    );
}

export default ChamadaShowModal;