import { NavigationContext } from "@/Contexts/NavigationContext";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AlignJustify } from "lucide-react";
import React, { useContext } from "react";

export default function CardDropdown({ editalId })
{
    const { navigate } = useContext(NavigationContext);

    const handleAlterarEdital = () => {
        navigate(`admin/edital/update/${editalId}`)
    }

    return (
        <Dropdown 
            label={<AlignJustify />} 
            dismissOnClick={false} 
            arrowIcon={false}
            className="p-2 text-black hover:bg-gray-100 rounded-md bg-gray-50 cursor-pointer"
        >
            <DropdownItem className="h-4" onClick={handleAlterarEdital}>Alterar configurações ...</DropdownItem>
        </Dropdown>
    );
}