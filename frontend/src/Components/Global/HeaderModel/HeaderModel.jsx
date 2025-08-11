import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, createTheme, ThemeProvider } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import { useEffect, useState } from "react";


export default function HeaderModel({ headerid, children }){

    return(
            <header id={headerid}>
                    <Navbar fluid rounded>

                        <NavbarBrand href="#">
                            <img src="/img/logo_cead_bg_white_full.png" alt="Logo CEAD" className="w-[92px] h-[40px]"/>
                        </NavbarBrand>

                        <div className="hidden md:flex lg:gap-12 md:gap-6">
                            { children }
                        </div>


                        <div className="hidden md:flex">
                            <ThemeToggleBtn />
                            <UserDropdown/>
                        </div>

                        <div className="md:hidden flex">
                            <ThemeToggleBtn />
                            <UserDropdown/>
                            <NavbarToggle />
                        </div>

                        <NavbarCollapse className="md:hidden">
                            <div className="flex flex-col items-center">
                                { children }
                            </div>
                        </NavbarCollapse>


                    </Navbar>
            </header>
    );

}