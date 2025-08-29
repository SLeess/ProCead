import { FormField } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import VagaDetails from './Tabs/VagaDetails';
import { useNavigate, useParams } from 'react-router-dom';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const Inscricao = () => {
  const navigate = useNavigate();
  const { token, user } = useAppContext();
  const { editalId } = useParams();
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/inscricao/${user?.uuid}/${editalId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, application/pdf',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          // Handle HTTP errors like 404, 500, etc.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data) {
          setFormData(data.data);
        } else {
          toast.error('Dados da inscrição não encontrados.');
          navigate(-1);
        }
      } catch (error) {
        toast.error(error.message || 'Falha na comunicação com a API.');
        console.error("Erro ", error);
      }
    }
    if (user?.uuid && editalId) {
      fetchData();
    }
  }, [token, user?.uuid, editalId])


  if (!formData) {
    return <LoaderPages />;
  }

  return (
    <div className=" dark:bg-slate-800 min-h-screen  md:p-8 font-sans animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <a onClick={() => navigate('/')} className="hover:underline cursor-pointer">Meus Processos</a>
          <span className="mx-2">&gt;</span>
          <a className="text-gray-700 dark:text-gray-200 cursor-default">Edital 04/2025 - Coordenação de Curso de Especialização para Atuar no Âmbito do Sistema Universidade Aberta do Brasil (UAB)</a>
        </div>


        {/* Form Content */}
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6 sm:px-8 sm:py-2 mt-1">
          {/* Tabs */}
          {/* <div className="border-b border-gray-200 mb-4 dark:border-gray-700 overflow-x-auto">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <a href="#" className="shrink-0 border-b-2 border-blue-600 px-1 py-4 text-sm font-medium text-blue-600">
                Alfabetização e Multiletramentos
              </a>
              <a href="#" className="shrink-0 border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Arte e Cultura
              </a>
            </nav>
          </div>
          */}
          <div className="space-y-8 mt-5"> 

            {/* Informações Básicas */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações Básicas</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField label="Nome Completo">
                    <TextInput readOnly={true} value={formData.nome_completo || ''} />
                  </FormField>
                  <FormField label="CPF">
                    <TextInput readOnly={true} value={formData.cpf || ''} />
                  </FormField>
                  <FormField label="E-mail">
                    <TextInput readOnly={true} value={formData.email || ''} />
                  </FormField>
                  <FormField label="Data de Nascimento">
                    <TextInput readOnly={true} value={formData.data_nascimento || ''} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField label="Telefone">
                    <TextInput readOnly={true} value={formData.telefone || ''} />
                  </FormField>
                  <FormField label="Gênero">
                    <TextInput readOnly={true} value={formData.genero || ''} />
                  </FormField>
                  <FormField label="Nome Social">
                    <TextInput readOnly={true} value="Leandre Freite" />
                  </FormField>
                  <FormField label="Identidade de Gênero">
                    <TextInput readOnly={true} value="Transgênero" />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <FormField label="RG">
                    <TextInput readOnly={true} value="MG-00.000.000" />
                  </FormField>
                  <FormField label="Estado Civil">
                    <TextInput readOnly={true} value="Solteiro" />
                  </FormField>
                  <FormField label="Nacionalidade">
                    <TextInput readOnly={true} value="Brasileira" />
                  </FormField>
                  <FormField label="Naturalidade">
                    <TextInput readOnly={true} value="Belo Horizonte" />
                  </FormField>
                  <FormField label="UF">
                    <TextInput readOnly={true} value="MG" />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Endereço</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField label="CEP">
                    <TextInput readOnly={true} value={formData.cep || ''} />
                  </FormField>
                  <FormField label="Rua">
                    <TextInput readOnly={true} value={formData.rua || ''} />
                  </FormField>
                  <FormField label="Número">
                    <TextInput readOnly={true} value={formData.numero || ''} />
                  </FormField>
                  <FormField label="Bairro">
                    <TextInput readOnly={true} value={formData.bairro || ''} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="UF">
                    <TextInput readOnly={true} value="MG" />
                  </FormField>
                  <FormField label="Cidade">
                    <TextInput readOnly={true} value="Montes Claros" />
                  </FormField>
                  <FormField label="Complemento">
                    <TextInput readOnly={true} value="Ap. 700" />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Escolha da Vaga */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Escolha da Vaga</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                {formData.vagas_inscricao && formData.vagas_inscricao.map((vagaInscricao, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3 mb-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{vagaInscricao.vaga.vaga.vagable.nome}</p>
                    {vagaInscricao.polo &&
                      <div className="bg-gray-100 dark:bg-slate-600 p-2 rounded-md text-sm text-gray-700 dark:text-gray-200">
                        <span className="font-medium">Polo: {vagaInscricao.polo.nome} | MG</span>
                      </div>
                    }
                    <div className="bg-gray-100 dark:bg-slate-600 p-2 rounded-md text-sm text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Modalidade: {vagaInscricao.modalidade.id} - </span> {vagaInscricao.modalidade.descricao}
                    </div>
                    {vagaInscricao.categoria && (
                      <div className="bg-gray-100 dark:bg-slate-600 p-2 rounded-md text-sm text-gray-700 dark:text-gray-200">
                        <span className="font-medium">Categoria: {vagaInscricao.categoria.id} - </span> {vagaInscricao.categoria.nome}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Anexos */}
              <div className='mb-5'>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Anexos</h2>
                <div className="grid grid-cols-2  gap-x-6 gap-y-2 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF:</label>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                      Anexo
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comprovante de Residência:</label>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                      Anexo
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Histórico:</label>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                      Anexo
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto declaração:</label>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                      Anexo
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  )
}

export default Inscricao