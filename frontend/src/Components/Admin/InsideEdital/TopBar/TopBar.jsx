import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { LogOut, ChevronsLeftRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { ChevronDown } from 'lucide-react'
import { useState } from "react";
import "./TopBar.css";
import AdminProfileModal from "../Modais/AdminProfile/AdminProfileModal";

export default function TopBar() {
    const { user, token, logout } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const { editalId } = useParams();

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

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
        <div id="header-container">
            {/* Left Item */}
            <div id="header-edital">
                Edital: {editalId}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            <AdminProfileModal openModal={openModal} onCloseModal={onCloseModal}/>

            {/* Right Item */}
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div id="dropdown-close">
                        <span id="dropdown-close-nome">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</span>
                        <ChevronDown />
                    </div>
                }
            >
            <button onClick={() => setOpenModal(true)}>
                <DropdownHeader className="w-56 justify-items-start cursor-pointer">
                    <span id="dropdown-open-nome">{user?.nome}</span>
                    <span id="dropdown-open-email">{user?.email}</span>
                </DropdownHeader>
            </button>
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
