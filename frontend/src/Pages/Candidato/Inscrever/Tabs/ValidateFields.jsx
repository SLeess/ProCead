import React, { useEffect } from 'react'

const ValidateFields = ([setIsFormValid,setEnabledTabs,formData,emailError,dataNascimentoError,cpfError,setEmailError,cpfBlur,
    setCpfError,emailBlur,setDataNascimentoError,dataNascimentoBlur,telefoneError,telefoneBlur,setTelefoneError]) => {



    useEffect(() => {
        const { nome_completo, cpf, email, data_nascimento, telefone, rg, nacionalidade, naturalidade, /*genero,estado_civil, uf_nascimento,*/ } = formData;
        const allFieldsFilled = nome_completo && cpf && email && data_nascimento && telefone && rg && nacionalidade && naturalidade && !emailError && dataNascimentoError === '' && !cpfError && !telefoneError;
        setIsFormValid(allFieldsFilled);
        setEnabledTabs(allFieldsFilled ? ["Informações Básicas", "Endereço"] : ["Informações Básicas"]);
    }, [formData, emailError, dataNascimentoError, cpfError,telefoneError]);

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

    useEffect(() => {
        if (cpfBlur) {
            if (!validateCpf(formData.cpf)) {
                setCpfError('CPF inválido');
            } else {
                setCpfError('');
            }
        }
    }, [formData.cpf, cpfBlur]);

    
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

}

export default ValidateFields