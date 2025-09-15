
import {  Modal, ModalBody,  } from "flowbite-react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css";
import ModalTabs from "../../Tabs/ModalTabs";
import { useAppContext } from "@/Contexts/AppContext";
import { toast } from "react-toastify";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import { IMaskInput } from "react-imask";

export default function InscricaoEditModal({ inscricao, setNeedUpdate }) {
    const { token } = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Informações Básicas');
    const tabs = ['Informações Básicas', 'Endereço', 'Vaga', 'Anexos e Situação'];
    const [formData, setFormData] = useState(() => {
        const { data_nascimento } = inscricao;
        if (data_nascimento && data_nascimento.includes('-')) {
            const [year, month, day] = data_nascimento.split('T')[0].split('-');
            const formattedDate = `${day}/${month}/${year}`;
            return { ...inscricao, data_nascimento: formattedDate };
        }
        return inscricao;
    });

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = { ...formData };

        if (dataToSend.data_nascimento && dataToSend.data_nascimento.includes('/')) {
            const [day, month, year] = dataToSend.data_nascimento.split('/');
            dataToSend.data_nascimento = `${year}-${month}-${day}`;
        }

        dataToSend.cpf = dataToSend.cpf.replace(/[.-]/g, "");
        dataToSend.telefone = dataToSend.telefone.replace(/[().\s-]/g, "");

        try {
            const response = await fetch(`/api/admin/inscricoes/${inscricao.id}`, {

                method: 'PUT',
                
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message || 'Inscrição atualizada com sucesso!');
                if (setNeedUpdate) {
                    setNeedUpdate(prev => !prev);
                }
                onCloseModal();
            } else {
                if (result.errors) {
                    if (Array.isArray(result.errors)) {
                        result.errors.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    } else {
                        toast.error(result.errors);
                    }
                } else if (result.message) {
                    toast.error(result.message);
                } else {
                    toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
                }
            }
        } catch (error) {
            toast.error("Erro ao conectar com o servidor: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}
                {openModal && inscricao && (
                    <>
                        <CabecalhoModal titleModal={"Editar e/ou Avaliar Inscrição"} />

                        <hr className='mb-3 mx-4' />

                        <ModalBody >
                            <form onSubmit={handleSubmit}>
                                <div id="inscricao-data-e-status-div">
                                    <p id="date-inscricao">Data de Inscrição: {new Date(inscricao.created_at).toLocaleDateString()}</p>
                                    <span id="inscricao-status-text">{inscricao.status}</span>
                                </div>

                                <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                                {activeTab === 'Informações Básicas' && (
                                    <div>
                                        <div id='rows-3-input'>
                                            <FormField label="Nome Completo" className="col-span-2">
                                                <TextInput id="nome_completo" value={formData.nome_completo} onChange={(e) => handleOnChangeAttr(e, 'nome_completo')} />
                                            </FormField>
                                            <FormField label="Nº de Inscrição" className="col-span-1">
                                                <TextInput id="n_inscricao" value={formData.n_inscricao} readOnly={true} />
                                            </FormField>
                                            <FormField label="CPF">
                                                <IMaskInput
                                                    mask="000.000.000-00"
                                                    value={formData.cpf}
                                                    disabled
                                                    // onAccept={(value) => handleOnChangeAttr({ target: { value } }, "cpf")}
                                                    placeholder="ex: 000.000.000-00"
                                                    className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                                                />
                                            </FormField>
                                            <FormField label="RG">
                                                <TextInput id="identidade" value={formData.identidade} onChange={(e) => handleOnChangeAttr(e, 'identidade')} />
                                            </FormField>
                                            <FormField label="Data de Nascimento">
                                                <IMaskInput
                                                    mask="00/00/0000"
                                                    value={formData.data_nascimento}
                                                    onAccept={(value) => handleOnChangeAttr({ target: { value } }, "data_nascimento")}
                                                    placeholder="ex: 01/01/2000"
                                                    className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                                                />
                                            </FormField>
                                            <FormField label="E-mail" className="md:col-span-2">
                                                <TextInput id="email" value={formData.email} onChange={(e) => handleOnChangeAttr(e, 'email')} />
                                            </FormField>
                                            <FormField label="Telefone">
                                                <IMaskInput
                                                    mask="(00) 00000-0000"
                                                    value={formData.telefone}
                                                    onAccept={(value) => handleOnChangeAttr({ target: { value } }, "telefone")}
                                                    placeholder="ex: (38) 99999-9999"
                                                    className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                                                />
                                            </FormField>
                                            <FormField label="Estado Civil">
                                                <SelectInput id="estado_civil" value={formData.estado_civil} onChange={(e) => handleOnChangeAttr(e, 'estado_civil')} options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                            </FormField>
                                            <FormField label="Gênero">
                                                <SelectInput id="genero" value={formData.genero} onChange={(e) => handleOnChangeAttr(e, 'genero')} options={['Masculino', 'Feminino', 'Outro']} />
                                            </FormField>
                                            <FormField label="Identidade de Gênero">
                                                <SelectInput id="identidade_genero" value={formData.identidade_genero} onChange={(e) => handleOnChangeAttr(e, 'identidade_genero')} options={['Cisgênero', 'Transgênero', 'Não-binário']} />
                                            </FormField>
                                            <FormField label="Nome Social" className="md:col-span-2">
                                                <TextInput id="nome_social" value={formData.nome_social} onChange={(e) => handleOnChangeAttr(e, 'nome_social')} />
                                            </FormField>
                                            <FormField label="Naturalidade">
                                                <TextInput id="naturalidade" value={formData.naturalidade} onChange={(e) => handleOnChangeAttr(e, 'naturalidade')} />
                                            </FormField>
                                            <FormField label="Nacionalidade">
                                                <TextInput id="nacionalidade" value={formData.nacionalidade} onChange={(e) => handleOnChangeAttr(e, 'nacionalidade')} />
                                            </FormField>
                                            <FormField label="UF">
                                                <SelectInput
                                                    id="uf_naturalidade"
                                                    value={formData.uf_naturalidade}
                                                    onChange={(e) => handleOnChangeAttr(e, 'uf_naturalidade')}
                                                    options={['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']}
                                                />
                                            </FormField>
                                        </div>
                                        <div id="buttons-container">
                                            <button type="button" onClick={onCloseModal} id='modal-white-button'>
                                                Cancelar
                                            </button>
                                            <button type="button" onClick={handleNext} id='modal-purple-button'>
                                                Próximo: Endereço
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'Endereço' && (
                                    <div>
                                        <div id='rows-3-input'>
                                            <FormField label="CEP"><TextInput id="cep" value={formData.cep} onChange={(e) => handleOnChangeAttr(e, 'cep')} /></FormField>
                                            <FormField label="Rua"><TextInput id="rua" value={formData.rua} onChange={(e) => handleOnChangeAttr(e, 'rua')} /></FormField>
                                            <FormField label="Número"><TextInput id="numero" value={formData.numero} onChange={(e) => handleOnChangeAttr(e, 'numero')} /></FormField>
                                            <FormField label="Complemento"><TextInput id="complemento" value={formData.complemento} onChange={(e) => handleOnChangeAttr(e, 'complemento')} /></FormField>
                                            <FormField label="Bairro"><TextInput id="bairro" value={formData.bairro} onChange={(e) => handleOnChangeAttr(e, 'bairro')} /></FormField>
                                            <FormField label="UF"><SelectInput id="uf" value={formData.uf} onChange={(e) => handleOnChangeAttr(e, 'uf')} options={['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']} /></FormField>
                                            <FormField label="Cidade" className="md:col-span-3"><TextInput id="cidade" value={formData.cidade} onChange={(e) => handleOnChangeAttr(e, 'cidade')} /></FormField>
                                        </div>
                                        <div id="buttons-container">
                                            <button type="button" onClick={handleBack} id='modal-white-button'>Voltar</button>
                                            <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo: Vaga</button>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'Vaga' && (
                                    <div>
                                        <div className="space-y-4">
                                            {inscricao.vagas.map((vaga, index) => (
                                                <div key={index} id="inscricao-vaga-content">
                                                    <div id="inscricao-vaga-container">
                                                        <h3 id="inscricao-vaga-title">{vaga.nome}</h3>
                                                        <p id='subtitle-edital'>{vaga.polo}</p>
                                                        <div className="space-y-4">
                                                            <TextInput readOnly defaultValue={"Modalidade: " + vaga.modalidade} />
                                                            <TextInput readOnly defaultValue={"Categoria: " + vaga.categoria} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="buttons-container">
                                            <button type="button" onClick={handleBack} id='modal-white-button'>Voltar</button>
                                            <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo: Anexos</button>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'Anexos e Situação' && (
                                    <div>
                                        <h2 id="inscricao-documentos-title">Anexos</h2>
                                        <div id="inscricao-documentos-grid">
                                            <AnexoButton label="Identidade:" />
                                            <AnexoButton label="Comprovante:" />
                                            <AnexoButton label="Histórico:" />
                                            <AnexoButton label="Auto Declaração:" />
                                        </div>

                                        <h2 id="inscricao-situacao-title">Situação</h2>
                                        <div id='rows-3-input'>
                                            <FormField label="Status" className="md:col-span-1">
                                                <SelectInput id="status" value={formData.status} onChange={(e) => handleOnChangeAttr(e, 'status')} options={['Deferido', 'Indeferido', 'Em análise']} />
                                            </FormField>
                                            <FormField label="Observações" className="md:col-span-3">
                                                <textarea
                                                    rows="4"
                                                    id="motivo"
                                                    value={formData.motivo}
                                                    onChange={(e) => handleOnChangeAttr(e, 'motivo')}
                                                />
                                            </FormField>
                                        </div>

                                        <div id="buttons-container">
                                            <button type="button" onClick={handleBack} id='modal-white-button'>Voltar</button>
                                            <button type='submit' id='modal-purple-button'>Salvar</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </ModalBody>
                    </>
                )}
            </Modal>
        </>
    );
}
