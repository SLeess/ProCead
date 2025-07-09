import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";
import { ToastContainer } from "react-toastify";

export default function GuestRoutes(){
    const { user, loading } = useContext(AppContext);
    if (loading) {
        return <Loader/>;
    }
    return !user ? 
            <>
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
                <Outlet/>
            </> : 
            <Navigate to="/" />;
}

