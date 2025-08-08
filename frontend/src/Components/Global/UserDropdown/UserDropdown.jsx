import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function UserDropdown()
{
    const { user, token, logout } = useAppContext();
    const { navigate } = useContext(NavigationContext);

    async function handlerLogOut(){
        try {
            await fetch('/api/usuario/logout', {
                method: 'post',
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            toast.success('Sessão encerrada.');
            logout();
            navigate('/login');
        } catch (error) {
            toast.error(error);
        }
    }
    

    return (
        <Dropdown
            arrowIcon={false}
            inline
            
            label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
        >
            <DropdownHeader className="w-[250px]">
                <span className="block text-sm">{user.nome}</span>
                <span className="block truncate text-sm font-medium line-clamp-2 leading-7">{user.email}</span>
            </DropdownHeader>
            <DropdownItem>Ver Perfil</DropdownItem>
            <DropdownItem>Configurações</DropdownItem>
                <DropdownDivider />
            <DropdownItem>Suporte</DropdownItem>
            <DropdownItem>API</DropdownItem>
                <DropdownDivider />
            <DropdownItem onClick={handlerLogOut}>Sair</DropdownItem>
        </Dropdown>
    );
}