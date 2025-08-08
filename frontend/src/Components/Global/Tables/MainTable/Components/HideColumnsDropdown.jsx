import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@radix-ui/react-dropdown-menu";
import { Button } from "flowbite-react";
import { CheckCheck, ChevronDown, ListX } from "lucide-react";

export default function HideColumnsDropdown({table, setColumnVisibility}){
    const showAllColumns = () => {
        setColumnVisibility({});
    };

    const hideAllColumns = () => {
        const allHideableColumnIds = table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .reduce((acc, column) => {
            // Adiciona a entrada { 'columnId': false } ao nosso objeto
            acc[column.id] = false;
            return acc;
        }, {}); // Começa com um objeto vazio

        setColumnVisibility(allHideableColumnIds);
    };
  
    return (
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="columns-button" variant="outline">
                  Colunas <ChevronDown id="chevron" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent id="dropdown-content" align="end">
                <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer" 
                    onSelect={showAllColumns}
                >
                    <CheckCheck className="h-4 w-4" /> {/* Ícone para clareza */}
                    <span>Marcar Todas</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer" 
                    onSelect={hideAllColumns} // Corrigido para chamar a função correta
                >
                    <ListX className="h-4 w-4" /> {/* Ícone para clareza */}
                    <span>Desmarcar Todas</span>
                </DropdownMenuItem>
                
                {/* Separador visual para organizar o menu */}
                <DropdownMenuSeparator /> 
                <DropdownMenuSeparator /> 
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        id="dropdown-checkbox-item"
                        key={column.id}
                        checked={column.getIsVisible()}
                        onClick={() => {column.toggleVisibility(!!column.getIsVisible())}}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        onSelect={(e) => e.preventDefault()} 
                      >
                        <span>{column.id}</span>
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
    );
}