import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";

export default function LayoutAdmin()
{
    return (
        <>
            <Sidebar></Sidebar>
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


