import { Checkbox } from "@/Components/Global/ui/modals";

const getColumns = (updatePermission, toggleAllRowPermissions, toggleAllPermissions, getAreAllChecked) => {
  return [
    {
      accessorKey: "name_permission",
      header: () => {
        return (<>
          <Checkbox 
            label={"Permissões"} 
            // checked={getAreAllChecked}
            // checked={getAreAllChecked}
            checked={getAreAllChecked() === false ? true : false}
            onChange={(e) => toggleAllPermissions(!e.target.checked)}
          />
        </>);
      },
      cell: ({row}) => {
        const { ler, criar, atualizar, deletar } = row.original;
        const areAllInRowChecked = ler && criar && atualizar && deletar;
        
        return (
          <Checkbox
            label={row.original.name_permission}
            checked={areAllInRowChecked}
            onChange={() => toggleAllRowPermissions(row.index, areAllInRowChecked)}
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