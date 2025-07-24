import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";

export default function HeaderModel({ headerid, children }){
    return(
        <header id={headerid}>
            <Navbar fluid rounded>
                <NavbarBrand href="#" className="md:hidden block">
                <img src={`/img/logo_cead_bg_white_full.png`} alt="Logo CEAD" className="w-[120px] h-[50px]"/>
                </NavbarBrand>
                <div className="hidden md:flex space-x-10 items-center">
                <NavbarBrand href="#">
                    <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" className="w-[120px] h-[50px]"/>
                </NavbarBrand>
                <NavbarCollapse className="space-x-10">
                    { children }
                </NavbarCollapse>
                </div>
                <div className="flex md:order-2 space-x-2">
                <ThemeToggleBtn />
                <UserDropdown/>
                <NavbarToggle className="text-white"/>
                </div>
                <NavbarCollapse className="md:hidden">
                    { children }
                </NavbarCollapse>
            </Navbar>
        </header>
    );
}