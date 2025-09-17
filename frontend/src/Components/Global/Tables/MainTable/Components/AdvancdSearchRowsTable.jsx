import { FormField } from "@/Components/Global/ui/modals";
import { MegaMenu, MegaMenuDropdown, MegaMenuDropdownToggle } from "flowbite-react";
import { ListFilter } from "lucide-react";
// import { Filter } from "lucide-react";
import { useState } from "react";
import { HiChevronDown, HiOutlineFilter } from "react-icons/hi";

export default function AdvancedSearchRowsTable({columns = {}, setAdvancedSearchTerm, advancedSearchTerm})
{
    const updateAttr = (e) => {
        const attr = e.target.name;
        setAdvancedSearchTerm(f => ({...f, [attr]: e.target.value}));
    }
    
    const [isOpen, setIsOpen] = useState(false);

    return (<MegaMenu style={{padding: "0px 0px"}} className="mb-5">
        <MegaMenuDropdownToggle onClick={() => setIsOpen(!isOpen)} 
            // style={{justifyContent: "start", width: "fit-content"}} 
            style={{display: "flex", width: "81px", height: "32px", padding: "4px 8px", justifyContent: "center", alignItems: "center", gap: "4px", flexShrink: "0", borderRadius: "5px", border: "0.4px solid rgba(114, 114, 114, 0.50)", background: "#F2F5F7"}} 
            >
            Filtros
            <ListFilter className={`transition-transform`}/>
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
