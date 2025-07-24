import { useAppContext } from "@/Contexts/AppContext";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";

export default function UserDropdown()
{
    const { user } = useAppContext();

    return (
        <Dropdown
            arrowIcon={false}
            inline
            
            label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
        >
            <DropdownHeader>
                <span className="block text-sm">{user.nome}</span>
                <span className="block truncate text-sm font-medium">{user.email}</span>
            </DropdownHeader>
            <DropdownItem>Ver Perfil</DropdownItem>
            <DropdownItem>Configurações</DropdownItem>
                <DropdownDivider />
            <DropdownItem>Suporte</DropdownItem>
            <DropdownItem>Api</DropdownItem>
                <DropdownDivider />
            <DropdownItem>Sair</DropdownItem>
        </Dropdown>
    );
}