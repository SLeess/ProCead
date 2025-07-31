import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { LogOut, ChevronsLeftRight } from "lucide-react";
import { useParams } from "react-router-dom";

export default function TopBar() {
    const { user, token, logout } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const { editalId } = useParams();

    async function handlerLogOut() {
        try {
            await fetch('/api/logout', {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            toast.success('Sessão encerrada.');
            logout();
            navigate('/login');
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar sair.");
        }
    }

    function handleChangeEdital() {
        navigate('/admin/home');
        toast.info("Selecione outro edital.");
    }

    return (
        <div className="flex justify-between items-center w-full">
            {/* Left Item */}
            <div className="bg-white py-2 px-4 rounded-2xl shadow-md">
                <span className="font-semibold text-gray-700">Edital: {editalId}</span>
            </div>

            {/* Right Item */}
            <div className="relative">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <div className="flex items-center gap-3 cursor-pointer rounded-2xl bg-white py-2 px-4 shadow-md transition-all hover:shadow-lg">
                            <span className="font-semibold text-gray-700">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</span>
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
        </div>
    );
}
