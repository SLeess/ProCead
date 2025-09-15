import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./QuadroVagasModal.css";
import ModalTabs from "../../Tabs/ModalTabs";
import { MultiSelect } from "primereact/multiselect";
import { useAppContext } from "@/Contexts/AppContext";
import { useParams } from "react-router-dom";


export default function QuadroVagasShowModal({ quadroVaga }) {
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Distribuição de Vagas', 'Categorias Customizadas'];
    const { token } = useAppContext();
    const { editalId } = useParams();
    const [polos, setPolos] = useState([]);
    const [anexos, setAnexos] = useState([]);



    useEffect(() => {
        const fetchPolos = async () => {
            try {
                const res = await fetch(`/api/admin/polos/${editalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await res.json();
                if (!res.ok) {
                    throw new Error(`Erro ao buscar polos: ${res.status} ${res.statusText}`);
                }

                setPolos(result.data);


            } catch (error) {
                setPolos([]);
                throw new Error(`Erro ao buscar Polos: ${error}`)
            }
        };
        if(openModal) fetchPolos();

        const fetchAnexos = async () => {
            try {
                const res = await fetch('/api/admin/anexos', {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'GET'
                })
                const result = await res.json();
                setAnexos(result.data)
                console.log(result.data)
            } catch (error) {
                setAnexos([])
                throw new Error(`Erro ao buscar Anexos: ${error}`)
            }
        }
        fetchAnexos();

    }, [token, editalId, openModal]);


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



    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Eye id='show-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal={"Visualizar Quadro de Vagas"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>

                    {/* Tabs Navigation */}
                    <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Form Content - Only showing the active tab's content */}
                    {activeTab === 'Dados' && (
                        <div>
                            <div id='rows-3-input'>
                                {/* Row 1 */}
                                <FormField label="Código"><TextInput readOnly={true} value={quadroVaga?.codigo || ''} /></FormField>
                                <FormField label="Semestre"><TextInput readOnly={true} value={quadroVaga?.semestre || ''} /></FormField>
                                <FormField label="Edital Referente"><TextInput readOnly={true} value={`Edital Nº ${quadroVaga?.edital_id}`} /></FormField>

                                {/* Row 2 */}
                                <FormField label="Campus" className="md:col-span-3">
                                    <MultiSelect
                                        value={quadroVaga?.campus}
                                        options={polos}
                                        optionLabel="nome"
                                        display="chip"
                                        placeholder="Nenhum campus selecionado"
                                        className=" items-center"
                                        id='multiselect-primereact'
                                        readOnly={true}
                                    />
                                </FormField>
                                <FormField label="Anexos" className="md:col-span-3">
                                    <MultiSelect
                                        value={quadroVaga?.anexos}
                                        options={anexos}
                                        optionLabel="nome"
                                        display="chip"
                                        placeholder="Nenhum Anexo selecionado"
                                        className=" items-center"
                                        id='multiselect-primereact'
                                        readOnly={true}
                                    />
                                </FormField>
                                <FormField label="Vaga" className="md:col-span-2"><TextInput readOnly={true} value={quadroVaga?.vaga.vagable.nome || ''} /></FormField>

                                {/* Row 3 */}
                                <FormField label="Habilitação" className="md:col-span-3"><TextInput readOnly={true} value={quadroVaga?.habilitacao || ''} /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='modal-white-button'>Fechar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Distribuição de Vagas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Distribuição de Vagas */}
                    {activeTab === 'Distribuição de Vagas' && (
                        <div>
                            <div id="distribuicao-vagas-options">
                                {quadroVaga?.vagas_por_modalidade?.map((vagaPorModalidade) => (
                                    <FormField key={vagaPorModalidade.id} label={vagaPorModalidade.sigla}>
                                        <TextInput readOnly={true} value={vagaPorModalidade.quantidade} />
                                    </FormField>
                                ))}
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Categorias Customizadas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Categorias Customizadas */}
                    {activeTab === 'Categorias Customizadas' && (
                        <div>
                            <div id="categorias-customizadas-table">
                                {/* Table Header */}
                                <div id="categorias-customizadas-header">
                                    <div id="categorias-customizadas-header-text" className="w-16">#</div>
                                    <div id="categorias-customizadas-header-text" className="flex-1">Nome da Categoria</div>
                                </div>
                                {/* Table Body */}
                                <div className="bg-white">
                                    {quadroVaga?.categorias_customizadas?.map((category, index) => (
                                        <div key={category.id} className={`flex px-6 py-4 ${index !== quadroVaga.categorias_customizadas.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <div id="categorias-customizadas-body-text" className="w-16">{category.indice + 1}</div>
                                            <div id="categorias-customizadas-body-text" className="flex-1">{category.nome}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={onCloseModal} id='modal-purple-button'>Fechar</button>
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
}
