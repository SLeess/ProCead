import React, { useState, useEffect } from 'react';
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useAppContext } from '@/Contexts/AppContext';
import { IMaskInput } from 'react-imask';

const InformacoesBasicas = ({ formData, handleOnChangeAttr, handleNext, setEnabledTabs }) => {
  const user = useAppContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const { nome_completo, cpf, email, data_nascimento, telefone, genero, rg, estado_civil, uf_nascimento, nacionalidade, naturalidade } = formData;
    const allFieldsFilled = nome_completo && cpf && email && data_nascimento && telefone && genero && rg && estado_civil && uf_nascimento && nacionalidade && naturalidade
      && !emailError;
    setIsFormValid(allFieldsFilled);
    setEnabledTabs(allFieldsFilled ? ["Informações Básicas", "Endereço"] : ["Informações Básicas"]);
  }, [formData]);

  const validateEmail = () => {
    // Basic email validation regex                                                                   
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !regex.test(formData.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleEmailBlur = () => {
    setEmailBlur(true);
  }

  useEffect(() => {
    if (emailBlur)
      validateEmail();
  }, [formData.email, emailBlur]);

  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans animate-fade-in">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Olá {user?.user.nome}, vamos realizar sua Inscrição no Processo Seletivo?
          </h1>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Informações Básicas</h2>

          <div className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="Nome Completo">
                <TextInput value={formData.nome_completo} onChange={(e) => handleOnChangeAttr(e, "nome_completo")} placeholder="ex: Leandro Freitas" />
              </FormField>
              <FormField label="CPF">
                <IMaskInput
                  mask="000.000.000-00"
                  value={formData.cpf}
                  onAccept={(value) => handleOnChangeAttr({ target: { value } }, "cpf")}
                  placeholder="ex: 000.000.000-00"
                  className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField label="E-mail">
                <TextInput value={formData.email} onChange={(e) => handleOnChangeAttr(e, "email")} placeholder="ex: exemplo@gmail.com" onBlur={() => handleEmailBlur()} />
                {emailError && <span className="text-red-500 animate-fade-in text-sm mt-1 ml-1">Insira um email válido.</span>}
              </FormField>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FormField label="Data de Nascimento">
                <IMaskInput
                  mask="00/00/0000"
                  value={formData.data_nascimento}
                  onAccept={(value) => handleOnChangeAttr({ target: { value } }, "data_nascimento")}
                  placeholder="ex: 01/01/2000"
                  className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                />
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
              <FormField label="Gênero">
                <SelectInput options={["Feminino", "Masculino"]} value={formData.genero} onChange={(e) => handleOnChangeAttr(e, "genero")} placeholder="ex: Masculino" />
              </FormField>
              <FormField label="Nome Social">
                <TextInput value={formData.nome_social} onChange={(e) => handleOnChangeAttr(e, "nome_social")} placeholder="ex: Leandre Freite" />
              </FormField>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FormField label="Identidade de Gênero">
                <TextInput value={formData.identidade_genero} onChange={(e) => handleOnChangeAttr(e, "identidade_genero")} placeholder="ex: Transgênero" />
              </FormField>
              <FormField label="RG">
                <TextInput value={formData.rg} onChange={(e) => handleOnChangeAttr(e, "rg")} placeholder="ex: MG-00.000.000" />
              </FormField>
              <FormField label="Estado Civil">
                <SelectInput options={["Solteiro ", "Casado ", "Divorciado ", "Viúvo", "Separado judicialmente"]} value={formData.estado_civil} onChange={(e) => handleOnChangeAttr(e, "estado_civil")} placeholder="ex: Solteiro" />
              </FormField>
              <FormField label="UF">
                <SelectInput options={[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ]} value={formData.uf_nascimento} onChange={(e) => handleOnChangeAttr(e, "uf_nascimento")} placeholder="ex: MG" />
              </FormField>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Nacionalidade">
                <TextInput value={formData.nacionalidade} onChange={(e) => handleOnChangeAttr(e, "nacionalidade")} placeholder="ex: Brasileira" />
              </FormField>
              <FormField label="Naturalidade">
                <TextInput value={formData.naturalidade} onChange={(e) => handleOnChangeAttr(e, "naturalidade")} placeholder="ex: Belo Horizonte" />
              </FormField>
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              className={`px-8 py-3 text-sm font-semibold text-white rounded-lg ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Próxima Etapa
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default InformacoesBasicas