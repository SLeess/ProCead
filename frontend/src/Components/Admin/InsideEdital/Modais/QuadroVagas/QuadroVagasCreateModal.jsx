import { Modal, ModalBody } from "flowbite-react";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormField, CheckboxMultiSelect, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./QuadroVagasModal.css";
import ModalTabs from "../../Tabs/ModalTabs";
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MultiSelect } from "primereact/multiselect";

export default function QuadroVagasCreateModal({ setNeedUpdate }) {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const { editalId } = useParams();
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Distribuição de Vagas', 'Categorias Customizadas'];
    const [modalidades, setModalidades] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [polos, setPolos] = useState([]);
    const [anexos, setAnexos] = useState([])
    const [newCategoryName, setNewCategoryName] = useState("");

    const [formData, setFormData] = useState({
        codigo: '',
        semestre: '1',
        campus: [],
        vaga: '',
        habilitacao: '',
        modalidades: [],
        categoriasCustomizadas: [],
        anexos: []
    });

    useEffect(() => {
        const fetchModalidades = async () => {
            try {
                const res = await fetch(`/api/admin/modalidades/${editalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(`Erro ao buscar modalidades: ${res.status} ${res.statusText}`);
                }

                setModalidades(result.data);
                const initialModalidadesArray = result.data.map(modalidade => ({
                    [modalidade.sigla]: '',
                }));
                setFormData(f => ({ ...f, modalidades: initialModalidadesArray }));

            } catch (error) {
                setModalidades([]);
                throw new Error(`Erro ao buscar modalidades: ${error}`)
            }
        };
        fetchModalidades();

        const fetchVagas = async () => {
            try {
                const res = await fetch(`/api/admin/vagas/${editalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await res.json();
                if (!res.ok) {
                    throw new Error(`Erro ao buscar vagas: ${res.status} ${res.statusText}`);
                }

                setVagas(result.data);


            } catch (error) {
                setVagas([]);
                throw new Error(`Erro ao buscar vagas: ${error}`)
            }
        };
        fetchVagas();

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
        fetchPolos();

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
    }, [token, editalId]);


    const handleOnChangeAttr = (e, attr) => {
        if (attr === 'campus') {
            setFormData(f => ({ ...f, campus: e }));
        }
        if (attr === 'anexos') {
            setFormData(f => ({ ...f, anexos: e }));
        } else {
            const { value } = e.target;
            setFormData(f => ({ ...f, [attr]: value }));
        }
    };

    const handleModalidadeSiglaChange = (e, modalidadeSigla) => {
        const { value } = e.target;
        setFormData(f => {
            const updatedModalidades = f.modalidades.map(m => {
                if (Object.prototype.hasOwnProperty.call(m, modalidadeSigla)) {
                    return { [modalidadeSigla]: value };
                }
                return m;
            });
            return { ...f, modalidades: updatedModalidades };
        });
    };

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

    // --- Category Handlers ---
    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            const newCategory = {
                // The index is implicitly its position in the array
                nome: newCategoryName.trim()
            };
            setFormData(f => ({
                ...f,
                categoriasCustomizadas: [...f.categoriasCustomizadas, newCategory]
            }));
            setNewCategoryName(''); // Clear input after adding
        }
    };

    const handleDeleteCategory = (indexToDelete) => {
        setFormData(f => ({
            ...f,
            categoriasCustomizadas: f.categoriasCustomizadas.filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleMoveCategory = (index, direction) => {
        const newCategories = [...formData.categoriasCustomizadas];
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= newCategories.length) return;

        // Swap elements
        [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];

        setFormData(f => ({
            ...f,
            categoriasCustomizadas: newCategories
        }));
    };
    // --- End of Category Handlers ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = {
            ...formData,
            campus: formData.campus.map(polo => polo.id),
            edital_id: editalId
        };

        try {
            const res = await fetch('/api/admin/quadro-vagas', {
                method: 'post',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (!result.success || !res.ok) {
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
            } else {
                toast.success((result.message || "Quadro de vagas cadastrado com sucesso!"));
            }
        } catch (error) {
            toast.error(error.toString());
        } finally {
            setNeedUpdate(prev => !prev);
            setLoading(false);
            onCloseModal();
        }
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id='create-btn'>
                <Plus className="inline" />
                <span className='ml-1'>Novo Quadro de Vagas</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}
                <CabecalhoModal titleModal={"Criar Quadro de Vagas"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    <form onSubmit={handleSubmit}>
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
                                    <FormField label="Código"><TextInput value={formData.codigo} onChange={(e) => handleOnChangeAttr(e, "codigo")} /></FormField>
                                    <FormField label="Semestre"><SelectInput options={[1, 2]} value={formData.semestre} onChange={(e) => handleOnChangeAttr(e, "semestre")} /></FormField>
                                    <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
                                    <FormField label="Campus" className="md:col-span-3">

                                        <MultiSelect
                                            value={formData.campus}
                                            onChange={(e) => handleOnChangeAttr(e.value, "campus")}
                                            options={(polos)}
                                            optionLabel="nome"
                                            display="chip"
                                            placeholder="Selecione os Cursos"
                                            className=" items-center"
                                            id='multiselect-primereact'
                                        />
                                    </FormField>
                                    <FormField label="Anexos" className="md:col-span-3">

                                        <MultiSelect
                                            value={formData.anexos}
                                            onChange={(e) => handleOnChangeAttr(e.value, "anexos")}
                                            options={(anexos)}
                                            optionLabel="nome"
                                            display="chip"
                                            placeholder="Selecione os Anexos"
                                            className=" items-center"
                                            id='multiselect-primereact'
                                        />
                                    </FormField>
                                    <FormField label="Vaga" className="md:col-span-2">
                                        <SelectInput
                                            value={formData.vaga}
                                            onChange={(e) => handleOnChangeAttr(e, "vaga")}
                                            defaultOption={true}
                                            options={[...vagas.map(vaga => ({ value: vaga.id, label: vaga.nome }))]}
                                        />
                                    </FormField>
                                    <FormField label="Habilitação" className="md:col-span-3"><TextInput value={formData.habilitacao} onChange={(e) => handleOnChangeAttr(e, "habilitacao")} /></FormField>
                                </div>
                                <div id="buttons-container">
                                    <button type="button" onClick={onCloseModal} id='modal-white-button'>Fechar</button>
                                    <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo: Distribuição de Vagas</button>
                                </div>
                            </div>
                        )}
                        { } {/* Tab Content: Distribuição de Vagas */}
                        {activeTab === 'Distribuição de Vagas' && (
                            <div>
                                <div id="distribuicao-vagas-options">
                                    {modalidades.map((modalidade) => (
                                        <FormField key={modalidade.id} label={modalidade.sigla}>
                                            <TextInput
                                                value={formData.modalidades.find(m => Object.hasOwn(m, modalidade.sigla))?.[modalidade.sigla] || ''}
                                                onChange={(e) => handleModalidadeSiglaChange(e, modalidade.sigla)}
                                            />
                                        </FormField>
                                    ))}
                                </div>
                                <div id="buttons-container">
                                    <button type="button" onClick={handleBack} id='modal-white-button'>Voltar</button>
                                    <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo: Categorias Customizadas</button>
                                </div>
                            </div>
                        )}
                        {/* Tab Content: Categorias Customizadas */}
                        {activeTab === 'Categorias Customizadas' && (
                            <div>
                                <div className="flex items-end gap-2 mb-4">
                                    <div className="flex-grow">
                                        <FormField label="Nome da Categoria">
                                            <TextInput
                                                placeholder="Ex: Comunidade em Geral"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                            />
                                        </FormField>
                                    </div>
                                    <button type="button" onClick={handleAddCategory} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300">
                                        Adicionar
                                    </button>
                                </div>

                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 w-16">Índice</th>
                                                <th scope="col" className="px-6 py-3">Nome da Categoria</th>
                                                <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.categoriasCustomizadas.length > 0 ? (
                                                formData.categoriasCustomizadas.map((category, index) => (
                                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                        <td className="px-4 py-4 text-center">{index + 1}</td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category.nome}</th>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button type="button" onClick={() => handleMoveCategory(index, -1)} disabled={index === 0} className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200">
                                                                    <ChevronUp className="w-5 h-5" />
                                                                </button>
                                                                <button type="button" onClick={() => handleMoveCategory(index, 1)} disabled={index === formData.categoriasCustomizadas.length - 1} className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200">
                                                                    <ChevronDown className="w-5 h-5" />
                                                                </button>
                                                                <button type="button" onClick={() => handleDeleteCategory(index)} className="p-1 text-red-600 rounded-full hover:bg-gray-200">
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Nenhuma categoria adicionada.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div id="buttons-container" className="mt-6">
                                    <button type="button" onClick={handleBack} id='modal-white-button'>Voltar</button>
                                    <button type='submit' id='modal-purple-button' disabled={loading}>
                                        {loading ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}