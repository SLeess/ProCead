import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";

export default function GuestRoutes(){
    const { user, loading } = useContext(AppContext);
    if (loading) {
        return <LoaderPages/>;
    }
    return !user ? <Outlet/> : <Navigate to="/" />;
}

