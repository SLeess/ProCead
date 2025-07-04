import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Outlet />
            </main>
        </>
    );
}


