const columns = [
  {
    accessorKey: "inscricao",
    header: "Inscrição",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "nome",
    header: "Nome Completo",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "modalidade",
    header: "Modalidade",
    cell: (props) => <span>{props.getValue()}</span>
  },
];

export default columns;