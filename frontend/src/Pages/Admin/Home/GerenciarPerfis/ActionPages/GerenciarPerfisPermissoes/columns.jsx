import { Checkbox } from "@/Components/Global/ui/modals";

const getColumns = (updatePermission, toggleAllRowPermissions) => {
  return [
    {
      accessorKey: "name_permission",
      header: ({row, col}) => {
        console.log(row, col);
        return (<>
          <Checkbox label={"Permissões"}/>
        </>);
      },
      cell: ({row}) => {
        const { ler, criar, atualizar, deletar } = row.original;
        const areAllChecked = ler && criar && atualizar && deletar;
        
        return (
          <Checkbox
            label={row.original.name_permission}
            checked={areAllChecked}
            onChange={() => toggleAllRowPermissions(row.index, areAllChecked)}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "ler",
      header: () => <>
        <Checkbox label={"Ler"}/>
      </>,
      cell: ({ row, column }) => (
        <Checkbox
          checked={row.original.ler}
          onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "criar",
      header: () => <>
        <Checkbox label={"Criar"}/>
      </>,
      cell: ({ row, column }) => (
        <Checkbox
          checked={row.original.criar}
          onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "atualizar",
      header: () => <>
        <Checkbox label={"Atualizar"}/>
      </>,
      cell: ({ row, column }) => (
        <Checkbox
          checked={row.original.atualizar}
          onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deletar",
      header: () => <>
        <Checkbox label={"Deletar"}/>
      </>,
      cell: ({ row, column }) => (
        <Checkbox
          checked={row.original.deletar}
          onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}

export default getColumns;