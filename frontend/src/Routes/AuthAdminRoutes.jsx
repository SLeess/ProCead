import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";

export default function AuthCandidatoRoutes(){
    const {isAdmin, loading} = useContext(AppContext);
    
    if (loading) {
        return <Loader/>;
    }

    return isAdmin()? <Outlet/> : <Navigate to="/admin/login" />;
}

