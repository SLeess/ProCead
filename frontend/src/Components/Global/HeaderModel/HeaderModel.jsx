import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import { useAppContext } from '@/Contexts/AppContext';

export default function HeaderModel({ headerid, children }){
    const { remainingTime } = useAppContext();



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
                            <NavbarToggle className="ml-1 navbar-toggle"/>
                        </div>

                        <NavbarCollapse className="md:hidden">
                            <div className="flex flex-col items-center">
                                { children }
                            </div>
                        </NavbarCollapse>


                    </Navbar>
                    <div className='flex flex-row-reverse min-w-[310px] max-w-screen-xl mt-2 text-black'>
                        {
                        remainingTime !== null && remainingTime !== 0 &&
                        <p className="text-sm my-1">Sua sessão expira em {remainingTime} min.</p>
                        }
                        {
                        remainingTime === 0 &&
                        <p className="text-sm my-1">Sua sessão expirou!</p>
                        }
                        {
                        remainingTime === null &&
                        <p className="text-sm my-1">&nbsp;</p>
                        }
                    </div>
            </header>
    );

}