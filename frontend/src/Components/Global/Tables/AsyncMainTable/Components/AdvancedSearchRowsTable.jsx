import { FormField } from "@/Components/Global/ui/modals";
import { MegaMenu, MegaMenuDropdown, MegaMenuDropdownToggle, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function AdvancedSearchRowsTable({columns = {}, setAdvancedSearchTerm, advancedSearchTerm})
{
    const updateAttr = (e) => {
        const attr = e.target.name;
        setAdvancedSearchTerm(f => ({...f, [attr]: e.target.value}));
    }
    
    const [isOpen, setIsOpen] = useState(false);

    return (<MegaMenu style={{padding: "0px 0px"}} className="mb-5">
        <MegaMenuDropdownToggle onClick={() => setIsOpen(!isOpen)} style={{justifyContent: "start", width: "fit-content"}} >
            Busca adicional
            <HiChevronDown className={`ml-2 max-w-xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </MegaMenuDropdownToggle>
        {isOpen && (
        <MegaMenuDropdown className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mt-6 w-full max-w-screen-xl border-y border-gray-200 px-2 py-5">
            {
                Object(columns.filter((col) => col.id !== 'actions' )).map(column => {
                    if(column?.columnVisibility === false || typeof column?.aditionalSearchInput !== 'function')
                        return;

                    return (
                    <FormField key={column.accessorKey} label={column.accessorKey} className="col-span-1 md:col-span-3">
                        {
                            column.aditionalSearchInput({
                                advancedSearchTerm,
                                updateAttr
                            })
                        }
                    </FormField>);
                })
            }
        </MegaMenuDropdown>
        )}
    </MegaMenu>);
}
