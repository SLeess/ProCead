import { FormField } from '@/Components/Global/ui/modals'
import { TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import Loader from '@/Components/Global/Loader/Loader';
import { IMaskInput } from 'react-imask';

const Endereco = ({ formData, handleOnChangeAttr, handleNext, handleBack, setEnabledTabs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { cep, rua, bairro, cidade, uf } = formData;
    const allFieldsFilled = cep && rua && bairro && cidade && uf ;
    setIsFormValid(allFieldsFilled);
    setEnabledTabs(allFieldsFilled ? ["Informações Básicas","Endereço", "Escolha da Vaga"] : ["Informações Básicas","Endereço"]);
  }, [formData]);

  const buscaCep = async (cep) => {
    if (!cep) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // Optionally update formData with the fetched address
      if (!result.erro) {
        handleOnChangeAttr({ target: { value: result.logradouro } }, "rua");
        handleOnChangeAttr({ target: { value: result.bairro } }, "bairro");
        handleOnChangeAttr({ target: { value: result.localidade } }, "cidade");
        handleOnChangeAttr({ target: { value: result.uf } }, "uf");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }


return (

  <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans animate-fade-in">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
        <h1 className="text-2xl font-semibold">
          Por favor, preencha as informações do seu endereço
        </h1>
      </div>

      {/* Form Panel */}
      <div className="bg-white rounded-b-2xl shadow-lg p-8 relative">
        {isLoading && <Loader containerClassName="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50" />}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Endereço</h2>
          <div className="space-y-6">
            {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField label="CEP">
                      <IMaskInput
                        mask="00000-000"
                        value={formData.cep}
                        onBlur={(e) => buscaCep(e.target.value)}
                        onAccept={(value) => handleOnChangeAttr({ target: { value } }, "cep")}
                        placeholder="ex: 39400-001"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Rua">
                    <TextInput
                      value={formData.rua}
                      onChange={(e) => handleOnChangeAttr(e, "rua")}
                      placeholder="ex: Rua Doutor Santos"
                    />
                    </FormField>
                    <FormField label="Bairro">
                    <TextInput
                      value={formData.bairro}
                      onChange={(e) => handleOnChangeAttr(e, "bairro")}
                      placeholder="ex: Centro"
                    />
                    </FormField>
                  </div>
                  {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField label="Cidade"><TextInput value={formData.cidade} onChange={(e) => handleOnChangeAttr(e, "cidade")} placeholder="ex: Montes Claros" /></FormField>
              <FormField label="UF"><TextInput value={formData.uf} onChange={(e) => handleOnChangeAttr(e, "uf")} placeholder="ex: MG" /></FormField>
              <FormField label="Número"><TextInput value={formData.numero} onChange={(e) => handleOnChangeAttr(e, "numero")} placeholder="ex: 100" /></FormField>
              <FormField label="Complemento"><TextInput value={formData.complemento} onChange={(e) => handleOnChangeAttr(e, "complemento")} placeholder="ex: Ap. 700" /></FormField>
            </div>
            
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button onClick={handleBack} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Voltar
          </button>
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

export default Endereco