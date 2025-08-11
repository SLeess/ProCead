import { useState, useEffect } from 'react';

// --- Validation Functions ---

const validateEmail = (email) => {
  if (!email) return true; // Not an error if empty, validation triggers on blur
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateCpf = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') {
    return true; // Not an error if empty
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
};

const validateTelefone = (telefone) => {
    if (!telefone) return true; // Not an error if empty
    const justDigits = telefone.replace(/[^\d]+/g, '');
    return justDigits.length === 11;
};

const validateDataNascimento = (dateStr) => {
    if (!dateStr) return ''; // Not an error if empty

    const parts = dateStr.split('/');
    if (parts.length === 3 && parts[2].length === 4) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);
      const today = new Date();
      const maxAge = new Date();
      const minAge = new Date();
      maxAge.setFullYear(today.getFullYear() - 120);
      minAge.setFullYear(today.getFullYear() - 15);
      
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return 'Por favor, insira uma data válida.';
      } else if (date > today) {
        return 'A data de nascimento não pode ser no futuro.';
      } else if (date < maxAge) {
        return 'A idade não pode ser superior a 120 anos.';
      } else if (date > minAge) 
        return 'A idade não pode ser inferior a 15 anos.';
      else {
        return '';
      }
    } else if (dateStr) {
      return 'Por favor, insira uma data completa.';
    }
    return '';
};


// --- Custom Hook ---

export const useFormValidation = (formData, setEnabledTabs) => {
  const [errors, setErrors] = useState({});
  const [blurredFields, setBlurredFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBlur = (field) => {
    setBlurredFields(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    const newErrors = {};

    if (blurredFields.email && !validateEmail(formData.email)) {
      newErrors.email = 'Insira um email válido.';
    }

    if (blurredFields.cpf && !validateCpf(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (blurredFields.telefone && !validateTelefone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }
    
    if (blurredFields.data_nascimento) {
        const errorMessage = validateDataNascimento(formData.data_nascimento);
        if (errorMessage) {
            newErrors.data_nascimento = errorMessage;
        }
    }

    setErrors(newErrors);

  }, [formData, blurredFields]);

  useEffect(() => {
    const { nome_completo, cpf, email, data_nascimento, telefone, rg, nacionalidade, naturalidade, genero, estado_civil, uf_nascimento } = formData;
    const allFieldsFilled = nome_completo && cpf && email && data_nascimento && telefone && rg && nacionalidade && naturalidade && genero && estado_civil && uf_nascimento;

    const hasNoErrors = Object.keys(errors).length === 0;
    const formIsValid = allFieldsFilled && hasNoErrors;

    setIsFormValid(formIsValid);
    setEnabledTabs(formIsValid ? ["Informações Básicas", "Endereço"] : ["Informações Básicas"]);

  }, [formData, errors, setEnabledTabs]);

  return { errors, handleBlur, isFormValid };
};