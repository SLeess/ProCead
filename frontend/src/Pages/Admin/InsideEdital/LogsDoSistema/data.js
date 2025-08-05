const nomes = [
    "NEIDE DA ROCHA DO NASCIMENTO",
    "JOÃO CARLOS SOUZA",
    "MARIA APARECIDA LIMA",
    "PEDRO HENRIQUE ALVES",
    "ANA PAULA FERREIRA",
    "CARLOS EDUARDO MORAES",
    "LUIZA HELENA SANTOS",
    "FERNANDO OLIVEIRA",
    "JULIANA PEREIRA",
    "RICARDO MARTINS"
];

const tiposObjeto = [
    "Opção de prova",
    "Documento",
    "Inscrição",
    "Pagamento",
    "Solicitação",
    "Recurso",
    "Avaliação",
    "Resultado",
    "Perfil",
    "Cadastro"
];

const tiposUsuario = [
    "Candidato",
    "Administrador",
    "Fiscal",
    "Coordenador",
    "Supervisor"
];

const descricoes = [
    "Criação",
    "Atualização",
    "Exclusão",
    "Consulta",
    "Envio",
    "Recebimento",
    "Validação",
    "Rejeição",
    "Aprovação",
    "Alteração"
];

const statusList = [
    "INDEFERIDO",
    "DEFERIDO",
    "PENDENTE",
    "APROVADO",
    "REJEITADO"
];

function randomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('pt-BR') + " " + date.toLocaleTimeString('pt-BR');
}

const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    descricao: descricoes[Math.floor(Math.random() * descricoes.length)],
    tipo_objeto: tiposObjeto[Math.floor(Math.random() * tiposObjeto.length)],
    tipo_usuario: tiposUsuario[Math.floor(Math.random() * tiposUsuario.length)],
    responsavel: nomes[Math.floor(Math.random() * nomes.length)],
    data_registro: randomDate(new Date(2024, 0, 1), new Date(2025, 11, 31)),
    status: statusList[Math.floor(Math.random() * statusList.length)]
}));

export default data;
