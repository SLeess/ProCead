import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { LogOut, ChevronsLeftRight, AlignJustify } from "lucide-react";
import { useParams } from "react-router-dom";
import { ChevronDown } from 'lucide-react'
import { useState } from "react";
import "./TopBar.css";
import AdminProfileModal from "../Modais/AdminProfile/AdminProfileModal";

import logo from "@/assets/img/logo_cead_bg.png";

export default function TopBar({setOpenSidebar}) {
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
        <>
            <div id="header-container">
                {/* Left Item */}
                <div id="header-edital">
                    <p>Edital: {editalId}</p>
                </div>


                {/* Spacer */}
                <div className="flex-1" />

                <AdminProfileModal openModal={openModal} onCloseModal={onCloseModal} user={user}/>

                {/* Right Item */}
                <div>
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div className="dropdown-close">
                                <span className="dropdown-close-nome">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</span>
                                <ChevronDown />
                            </div>
                        }
                        >
                    <button onClick={() => setOpenModal(true)}>
                        <DropdownHeader className="dropdown-profile">
                            <span className="dropdown-open-nome">{user?.nome}</span>
                            <span className="dropdown-open-email">{user?.email}</span>
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
            </div>

            {/* ---------- RESPONSIVE ---------- */}

            <div id="header-container-mobile">
                <div>
                    <button onClick={() => setOpenSidebar(true)} className='p-2'>
                        <AlignJustify color={"#2A1670"} strokeWidth={"2.5px"} size={"32px"} />
                    </button>
                </div>

                <div className="ml-8" onClick={() => navigate(`/admin`)}>
                    <img src={logo} width="80px" />
                </div>

                <div>
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div className="dropdown-close">
                                <span className="dropdown-close-nome">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</span>
                                <ChevronDown />
                            </div>
                        }
                        >
                    <button onClick={() => setOpenModal(true)}>
                        <DropdownHeader className="dropdown-profile">
                            <span className="dropdown-open-nome">{user?.nome}</span>
                            <span className="dropdown-open-email">{user?.email}</span>
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
            </div>
        </>
    );
}
