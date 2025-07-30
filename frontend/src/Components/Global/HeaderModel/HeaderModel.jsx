import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";

export default function HeaderModel({ headerid, children }){
    return(
        <header id={headerid}>
            <Navbar fluid rounded>
                <NavbarBrand href="#" className="md:hidden block">
                    <img src={`/img/logo_cead_bg_white_full.png`} alt="Logo CEAD" className="w-[100px] h-[42px]"/>
                </NavbarBrand>
                <div className="hidden md:flex space-x-4 items-center flex-nowrap lg:w-[88%]">
                    <NavbarBrand href="#">
                        <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" className="w-[100px] h-[42px]"/>
                    </NavbarBrand>
                    <NavbarCollapse id="div-ul-header" className="lg:w-full">
                        { children }
                    </NavbarCollapse>
                </div>
                <div className="flex md:order-2 space-x-2">
                    <ThemeToggleBtn />
                    <UserDropdown/>
                    <NavbarToggle className="text-white hover:text-[#29166F] hover:cursor-pointer"/>
                </div>
                <NavbarCollapse className="md:hidden">
                    { children }
                </NavbarCollapse>
            </Navbar>
        </header>
    );
}