import React, { useState, useEffect } from 'react';
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useAppContext } from '@/Contexts/AppContext';
import { IMaskInput } from 'react-imask';

const InformacoesBasicas = ({ formData, handleOnChangeAttr, handleNext, setEnabledTabs }) => {
  const user = useAppContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dataNascimentoError, setDataNascimentoError] = useState('');
  const [dataNascimentoBlur, setDataNascimentoBlur] = useState(false);
  const [cpfError, setCpfError] = useState('');
  const [cpfBlur, setCpfBlur] = useState(false);
  const [telefoneError, setTelefoneError] = useState('');
  const [telefoneBlur, setTelefoneBlur] = useState(false);
  

  useEffect(() => {
    const { nome_completo, cpf, email, data_nascimento, telefone, rg, nacionalidade, naturalidade, /*genero,estado_civil, uf_nascimento,*/ } = formData;
    const allFieldsFilled = nome_completo && cpf && email && data_nascimento && telefone && rg && nacionalidade && naturalidade && !emailError && dataNascimentoError === '' && !cpfError && !telefoneError;
    setIsFormValid(allFieldsFilled);
    setEnabledTabs(allFieldsFilled ? ["Informações Básicas", "Endereço"] : ["Informações Básicas"]);
  }, [formData, emailError, dataNascimentoError, cpfError, telefoneError]);

  const validateEmail = () => {
    // Basic email validation regex                                                                   
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !regex.test(formData.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return true;
    }
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }

  const validateTelefone = (telefone) => {
    const justDigits = telefone.replace(/[^\d]+/g, '');
    if (justDigits.length !== 11) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (telefoneBlur) {
      if (!validateTelefone(formData.telefone)) {
        setTelefoneError('Telefone inválido');
      } else {
        setTelefoneError('');
      }
    }
  }, [formData.telefone, telefoneBlur]);

  useEffect(() => {
    if (cpfBlur) {
      if (!validateCpf(formData.cpf)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError('');
      }
    }
  }, [formData.cpf, cpfBlur]);

  const handleEmailBlur = () => {
    setEmailBlur(true);
  }

  useEffect(() => {
    if (emailBlur)
      validateEmail();
  }, [formData.email, emailBlur]);

  useEffect(() => {
    if (dataNascimentoBlur) {
      const dateStr = formData.data_nascimento;
      if (!dateStr) {
        setDataNascimentoError('');
        return;
      }

      const parts = dateStr.split('/');
      if (parts.length === 3 && parts[2].length === 4) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date                     
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);
        const today = new Date();
        const minAge = new Date();
        minAge.setFullYear(today.getFullYear() - 120);

        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month ||
          date.getDate() !== day
        ) {
          setDataNascimentoError('Por favor, insira uma data válida.');
        } else if (date > today) {
          setDataNascimentoError('A data de nascimento não pode ser no futuro.');
        } else if (date < minAge) {
          setDataNascimentoError('A idade não pode ser superior a 120 anos.');
        } else {
          setDataNascimentoError('');
        }
      } else if (dateStr) {
        setDataNascimentoError('Por favor, insira uma data completa.');
      } else {
        setDataNascimentoError('');
      }
    }
  }, [formData.data_nascimento, dataNascimentoBlur]);


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
              <FormField label="Nome Completo" obrigatorio={true}>
                <TextInput value={formData.nome_completo} onChange={(e) => handleOnChangeAttr(e, "nome_completo")} placeholder="ex: Leandro Freitas" />
              </FormField>
              <FormField obrigatorio={true} label="CPF">
                <IMaskInput
                  mask="000.000.000-00"
                  value={formData.cpf}
                  onAccept={(value) => handleOnChangeAttr({ target: { value } }, "cpf")}
                  placeholder="ex: 000.000.000-00"
                  onBlur={() => setCpfBlur(true)}
                  className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                />
                {cpfError && <span className="text-red-500 animate-fade-in text-sm mt-1 ml-1">{cpfError}</span>}
              </FormField>
              <FormField obrigatorio={true} label="E-mail">
                <TextInput value={formData.email} onChange={(e) => handleOnChangeAttr(e, "email")} placeholder="ex: exemplo@gmail.com" onBlur={() => handleEmailBlur()} />
                {emailError && <span className="text-red-500 animate-fade-in text-sm mt-1 ml-1">Insira um email válido.</span>}
              </FormField>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FormField obrigatorio={true} label="Data de Nascimento">
                <IMaskInput
                  mask="00/00/0000"
                  value={formData.data_nascimento}
                  onAccept={(value) => handleOnChangeAttr({ target: { value } }, "data_nascimento")}
                  placeholder="ex: 01/01/2000"
                  onBlur={() => setDataNascimentoBlur(true)}
                  className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                />
                {dataNascimentoError && <span className="text-red-500 text-sm mt-1 ml-1                 
                animate-fade-in">{dataNascimentoError}</span>}
              </FormField>
              <FormField obrigatorio={true} label="Telefone">
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={formData.telefone}
                  onAccept={(value) => handleOnChangeAttr({ target: { value } }, "telefone")}
                  placeholder="ex: (38) 99999-9999"
                  onBlur={() => setTelefoneBlur(true)}
                  className="w-full py-[0.42rem] px-3 border-2 text-sm border-gray-300 rounded-md"
                />
                {telefoneError && <span className="text-red-500 animate-fade-in text-sm mt-1 ml-1">{telefoneError}</span>}
              </FormField>
              <FormField obrigatorio={true} label="Gênero">
                <SelectInput options={["Feminino", "Masculino"]} value={formData.genero} onChange={(e) => handleOnChangeAttr(e, "genero")} placeholder="ex: Masculino" />
              </FormField>
              <FormField label="Nome Social">
                <TextInput value={formData.nome_social} onChange={(e) => handleOnChangeAttr(e, "nome_social")} placeholder="ex: Leandre Freite" />
              </FormField>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FormField obrigatorio={true} label="Identidade de Gênero">
                <TextInput value={formData.identidade_genero} onChange={(e) => handleOnChangeAttr(e, "identidade_genero")} placeholder="ex: Transgênero" />
              </FormField>
              <FormField obrigatorio={true} label="RG">
                <TextInput value={formData.rg} onChange={(e) => handleOnChangeAttr(e, "rg")} placeholder="ex: MG-00.000.000" />
              </FormField>
              <FormField obrigatorio={true} label="Estado Civil">
                <SelectInput options={["Solteiro ", "Casado ", "Divorciado ", "Viúvo", "Separado judicialmente"]} value={formData.estado_civil} onChange={(e) => handleOnChangeAttr(e, "estado_civil")} placeholder="ex: Solteiro" />
              </FormField>
              <FormField obrigatorio={true} label="UF">
                <SelectInput options={[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ]} value={formData.uf_nascimento} onChange={(e) => handleOnChangeAttr(e, "uf_nascimento")} placeholder="ex: MG" />
              </FormField>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField obrigatorio={true} label="Nacionalidade">
                <TextInput value={formData.nacionalidade} onChange={(e) => handleOnChangeAttr(e, "nacionalidade")} placeholder="ex: Brasileira" />
              </FormField>
              <FormField obrigatorio={true} label="Naturalidade">
                <TextInput value={formData.naturalidade} onChange={(e) => handleOnChangeAttr(e, "naturalidade")} placeholder="ex: Belo Horizonte" />
              </FormField>
            </div>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className='text-red-500 text-sm'>* Campos Obrigatórios</span>
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