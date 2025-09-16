import { Link, Outlet } from "react-router-dom";
import Header from "@/Components/Admin/Header/Header";
import { useContext } from "react";
import { AppContext, useAppContext } from "@/Contexts/AppContext";

export default function LayoutAdmin()
{
    const { user } = useAppContext();

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


