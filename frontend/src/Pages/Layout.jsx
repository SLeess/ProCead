import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "@/Components/Candidatos/Header/Header";
import { useContext } from "react";
import { AppContext } from "@/Contexts/AppContext";

export default function Layout()
{
    const { user } = useContext(AppContext);

    return (
        <>
            {
                user && <Header/>
            }
            <main>
                <Outlet />
            </main>
        </>
    );
}


