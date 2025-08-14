import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import "./HeaderModel.css";


export default function HeaderModel({ headerid, children }){

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
            </header>
    );

}