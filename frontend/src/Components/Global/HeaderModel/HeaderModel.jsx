import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import "./HeaderModel.css";

import { useAppContext } from '@/Contexts/AppContext';

export default function HeaderModel({ headerid, children }){
    const { remainingTime } = useAppContext();



    return(
            <header id={headerid}>
                <Navbar fluid rounded>

                    <NavbarBrand href="#">
                        <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" id="img-logo"/>
                    </NavbarBrand>

                    <div id="nav-item">
                        { children }
                    </div>


                    <div id="desktop-buttons-div">
                        <ThemeToggleBtn />
                        <UserDropdown/>
                    </div>

                    <div id="mobile-buttons-div">
                        <ThemeToggleBtn />
                        <UserDropdown/>
                        <NavbarToggle className="ml-1 navbar-toggle"/>
                    </div>

                    <NavbarCollapse className="md:hidden">
                        <div id="menu-responsive">
                            { children }
                        </div>
                    </NavbarCollapse>


                </Navbar>
                <div className='flex flex-row-reverse max-w-screen-xl mx-auto mt-2 text-black'>
                    {
                    remainingTime !== null && remainingTime !== 0 &&
                    <p className="text-sm my-1 w-full text-end mr-5">Sua sessão expira em {remainingTime} min.</p>
                    }
                    {
                    remainingTime === 0 &&
                    <p className="text-sm my-1 w-full text-end mr-5">Sua sessão expirou!</p>
                    }
                    {
                    remainingTime === null &&
                    <p className="text-sm my-1 w-full text-end mr-5">&nbsp;</p>
                    }
                </div>
            </header>
    );

}