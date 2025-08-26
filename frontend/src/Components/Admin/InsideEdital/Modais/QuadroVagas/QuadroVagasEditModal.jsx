import { Modal, ModalBody } from "flowbite-react";
import { Pencil, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./QuadroVagasModal.css";
import ModalTabs from "../../Tabs/ModalTabs";
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function QuadroVagasEditModal({ quadroVaga, setNeedUpdate }) {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const { editalId } = useParams();
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Distribuição de Vagas', 'Categorias Customizadas'];
    const [modalidades, setModalidades] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [polos, setPolos] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    const [formData, setFormData] = useState({
        codigo: '',
        semestre: '1',
        campus: '',
        vaga: '',
        habilitacao: '',
        modalidades: [],
        categoriasCustomizadas: [],
    });

    useEffect(() => {
        if (!openModal) return;
        const fetchData = async (url, setter) => {
            try {
                const res = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const result = await res.json();
                if (res.ok) {
                    setter(result.data);
                } else {
                    throw new Error(result.message || 'Erro ao buscar dados.');
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        const fetchAllData = async () => {
            setLoading(true);
            await fetchData(`/api/admin/vagas/${editalId}`, setVagas);
            await fetchData(`/api/admin/polos/${editalId}`, setPolos);
            await fetchData(`/api/admin/modalidades/${editalId}`, setModalidades);
            setLoading(false);
        }
        fetchAllData();
    }, [openModal, token, editalId]);

    useEffect(() => {
        if (quadroVaga) {
            const initialModalidades = quadroVaga.vagas_por_modalidade.map(vpm => ({
                [vpm.sigla]: vpm.quantidade
            }));

            setFormData({
                codigo: quadroVaga.codigo || '',
                semestre: quadroVaga.semestre || '1',
                campus: quadroVaga.polo_id || '',
                vaga: quadroVaga.vaga_id || '',
                habilitacao: quadroVaga.habilitacao || '',
                modalidades: initialModalidades || [],
                categoriasCustomizadas: quadroVaga.categorias_customizadas || [],
            });
        }
    }, [quadroVaga]);


    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleModalidadeSiglaChange = (e, modalidadeSigla) => {
        const { value } = e.target;
        setFormData(f => {
            const updatedModalidades = [...f.modalidades];
            const index = updatedModalidades.findIndex(m => Object.prototype.hasOwnProperty.call(m, modalidadeSigla));
            if (index > -1) {
                updatedModalidades[index] = { [modalidadeSigla]: value };
            } else {
                updatedModalidades.push({ [modalidadeSigla]: value });
            }
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
            const newCategory = { nome: newCategoryName.trim() };
            setFormData(f => ({
                ...f,
                categoriasCustomizadas: [...f.categoriasCustomizadas, newCategory]
            }));
            setNewCategoryName("");
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
        [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
        setFormData(f => ({ ...f, categoriasCustomizadas: newCategories }));
    };
    // --- End of Category Handlers ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/quadro-vagas/${quadroVaga.id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...formData, edital_id: editalId }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (!result.success || !res.ok) {
                toast.error(result.message || "Ocorreu um erro ao atualizar.");
            } else {
                toast.success(result.message || "Quadro de vagas atualizado com sucesso!");
                setNeedUpdate(prev => !prev);
                onCloseModal();
            }
        } catch (error) {
            toast.error(error.toString());
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
                <CabecalhoModal titleModal={"Editar Quadro de Vagas"} />
                <hr className='mb-3 mx-4' />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <p id='subtitle-edital'>
                            Edital Referente: Processo de Seleção de Discentes...
                        </p>
                        <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                        {activeTab === 'Dados' && (
                            <div>
                                <div className='rows-3-input'>
                                    <FormField label="Código"><TextInput value={formData.codigo} onChange={(e) => handleOnChangeAttr(e, "codigo")} /></FormField>
                                    <FormField label="Semestre"><SelectInput options={[1, 2]} value={formData.semestre} onChange={(e) => handleOnChangeAttr(e, "semestre")} /></FormField>
                                    <FormField label="Edital Referente"><TextInput disabled value={`Edital Nº ${editalId}`} /></FormField>
                                    <FormField label="Campus" className="md:col-span-1">
                                        <SelectInput
                                            value={formData.campus}
                                            onChange={(e) => handleOnChangeAttr(e, "campus")}
                                            defaultOption={true}
                                            options={polos.map(polo => ({ value: polo.id, label: polo.nome }))}
                                        />
                                    </FormField>
                                    <FormField label="Vaga" className="md:col-span-2">
                                        <SelectInput
                                            value={formData.vaga}
                                            onChange={(e) => handleOnChangeAttr(e, "vaga")}
                                            defaultOption={true}
                                            options={vagas.map(vaga => ({ value: vaga.id, label: vaga.nome }))}
                                        />
                                    </FormField>
                                    <FormField label="Habilitação" className="md:col-span-3"><TextInput value={formData.habilitacao} onChange={(e) => handleOnChangeAttr(e, "habilitacao")} /></FormField>
                                </div>
                                <div id="buttons-container">
                                    <button type="button" onClick={onCloseModal} id='modal-white-button'>Fechar</button>
                                    <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo</button>
                                </div>
                            </div>
                        )}

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
                                    <button type="button" onClick={handleNext} id='modal-purple-button'>Próximo</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Categorias Customizadas' && (
                            <div>
                                <div className="flex items-end gap-2 mb-4">
                                    <div className="flex-grow">
                                        <FormField label="Nome da Categoria">
                                            <TextInput
                                                placeholder="Ex: Comunidade em Geral"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory(); } }}
                                            />
                                        </FormField>
                                    </div>
                                    <button type="button" onClick={handleAddCategory} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
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
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900">{category.nome}</th>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button type="button" onClick={() => handleMoveCategory(index, -1)} disabled={index === 0} className="p-1 rounded-full disabled:opacity-30"><ChevronUp className="w-5 h-5" /></button>
                                                                <button type="button" onClick={() => handleMoveCategory(index, 1)} disabled={index === formData.categoriasCustomizadas.length - 1} className="p-1 rounded-full disabled:opacity-30"><ChevronDown className="w-5 h-5" /></button>
                                                                <button type="button" onClick={() => handleDeleteCategory(index)} className="p-1 text-red-600 rounded-full"><Trash2 className="w-5 h-5" /></button>
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
                                        {loading ? 'Salvando...' : 'Salvar Alterações'}
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