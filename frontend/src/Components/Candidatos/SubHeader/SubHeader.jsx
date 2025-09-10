import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import "./SubHeader.css"
import { Navbar } from 'flowbite-react';

export default function SubHeader(){
    const { editalId } = useParams();

  return (
    <header id='sub-header'>

        <Navbar fluid rounded>

            <div id="sub-nav-item">
                <NavLink to={`/edital/${editalId}/geral`} end className={({ isActive }) => `link-page ${isActive ? "text-blue-500" : ""}`}>
                    Visão Geral
                </NavLink>
            </div>

            {/* <div id="mobile-buttons-div">
                <ThemeToggleBtn />
                <UserDropdown/>
                <NavbarToggle className="ml-1 navbar-toggle"/>
            </div> */}

            {/* <NavbarCollapse className="md:hidden">
                <div id="menu-responsive">
                    { children }
                </div>
            </NavbarCollapse> */}
        </Navbar>

    </header>
  );
};