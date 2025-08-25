/**
 * Formata uma string de CPF (apenas números) para o formato 123.456.789-00.
 * @param {string | number} cpf - O CPF a ser formatado.
 * @returns {string} O CPF formatado ou o valor original se não for válido.
 */
export const formatCPF = (cpf) => {
    // Garante que o valor de entrada é uma string e remove caracteres não numéricos
    const cpfValue = String(cpf).replace(/\D/g, '');

    // Se o CPF não tiver 11 dígitos, retorna o valor limpo sem a máscara
    if (cpfValue.length !== 11) {
        return cpfValue;
    }

    // Aplica a máscara usando regex
    // Captura 4 grupos de dígitos e os remonta com a pontuação
    return cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};


export function toTitleCase(str) {
  if (!str) {
    return ""; // Handle empty or null strings
  }

  // Convert the entire string to lowercase first
  const lowerCaseStr = str.toLowerCase();

  // Split the string into an array of words
  const words = lowerCaseStr.split(" ");

  // Map over the array to capitalize the first letter of each word
  const titleCasedWords = words.map(word => {
    if (word.length === 0) {
      return ""; // Handle empty words if any
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back into a single string
  return titleCasedWords.join(" ");
}

export const maskCPF = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};