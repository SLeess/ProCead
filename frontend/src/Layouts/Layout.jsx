import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Pages/Admin/Sidebar/Sidebar";
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
                <div className="min-w-[300px] container relative max-w-screen-xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </>
    );
}


