import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function MainTable() {
  return (
    <div className="overflow-x-auto p-10">
      <Table hoverable style={{textAlign: "center"}}>
        <TableHead>
          {/* A linha do cabeçalho agora tem uma borda inferior para separação visual */}
          <TableRow className="border-b-2 border-gray-200">
            {/* O fundo de cada célula do cabeçalho foi alterado para branco */}
            
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">#</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">Nº de Inscrição</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">Nome do Candidato</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">E-mail</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">CPF</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">Modalidade</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">Status da Inscrição</TableHeadCell>
            <TableHeadCell style={{backgroundColor: "white"}} className="bg-white text-gray-700">Ações</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white">
            <TableCell className="p-4">
              1
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              100035648
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white">
            <TableCell className="p-4">
              2
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              100035648
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white">
            <TableCell className="p-4">
              3
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              100035648
            </TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}