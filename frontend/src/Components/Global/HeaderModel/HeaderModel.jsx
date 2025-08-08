import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import { useContext } from "react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { Link } from "react-router-dom";

export default function HeaderModel({ headerid, children }){
    const { navigate } = useContext(NavigationContext);

    return(
        // <header id={headerid}>
        //     <Navbar fluid rounded>
        //         <NavbarBrand href="#" onClick={() => navigate('/')} className="lg:hidden block">
        //             <img src={`/img/logo_cead_bg_white_full.png`} alt="Logo CEAD" className="w-[100px] h-[42px]"/>
        //         </NavbarBrand>
        //         <div className="hidden lg:flex space-x-4 items-center flex-nowrap lg:w-[88%]">
        //             <NavbarBrand href="#" onClick={() => navigate('/')}>
        //                 <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" className="w-[100px] h-[42px]"/>
        //             </NavbarBrand>
        //             <NavbarCollapse id="div-ul-header" className="lg:w-full">
        //                 { children }
        //             </NavbarCollapse>
        //         </div>
        //         <div className="flex md:order-2 space-x-2">
        //             <ThemeToggleBtn />
        //             <UserDropdown/>
        //             <NavbarToggle className="text-white hover:text-[var(--header-admin-primary)] hover:cursor-pointer"/>
        //         </div>
        //         <NavbarCollapse id="row-ul-header" className="md:hidden">
        //             { children }
        //         </NavbarCollapse>
        //     </Navbar>
        // </header>
        <header id={headerid}>
            <Navbar fluid rounded>
            <NavbarBrand onClick={() => navigate('/')} >
                <img src={`/img/logo_cead_bg_white_full.png`} className="mr-3 h-9" alt="Flowbite React Logo" />
            </NavbarBrand>
            <div className="flex md:order-2 space-x-2">
                <ThemeToggleBtn />
                <UserDropdown/>
                <NavbarToggle />
            </div>
            <NavbarCollapse className="text-white">
                { children }
            </NavbarCollapse>
            </Navbar>
        </header>
    );
}