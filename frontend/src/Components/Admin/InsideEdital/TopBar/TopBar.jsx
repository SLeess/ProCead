import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { LogOut, ChevronsLeftRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { ChevronDown } from 'lucide-react'

export default function TopBar() {
    const { user, token, logout } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const { editalId } = useParams();

    async function handlerLogOut() {
        try {
            await fetch('/api/usuario/logout', {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            toast.success('Sessão encerrada.');
            logout();
            navigate('/login');
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar sair." + error);
        }
    }

    function handleChangeEdital() {
        navigate('/admin');
        toast.info("Selecione outro edital.");
    }

    return (
        <div className="flex items-center w-full px-4 py-2 bg-white shadow rounded-md mb-4">
            {/* Left Item */}
            <div className="font-semibold text-[var(--admin-topbar-flag-text)] bg-[var(--admin-topbar-flag)] py-1 px-2 rounded-md">
                Edital: {editalId}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Item */}
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className="flex items-center gap-1 cursor-pointer rounded-2xl bg-white py-2 px-4">
                        <span className="font-semibold text-gray-700">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</span>
                        <ChevronDown />
                    </div>
                }
            >
                <DropdownHeader className="w-56">
                    <span className="block text-sm">{user?.nome}</span>
                    <span className="block truncate text-sm font-medium">{user?.email}</span>
                </DropdownHeader>
                <DropdownItem icon={ChevronsLeftRight} onClick={handleChangeEdital}>
                    Mudar de edital
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={LogOut} onClick={handlerLogOut}>
                    Sair
                </DropdownItem>
            </Dropdown>
        </div>
    );
}
