import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";

export default function AuthCandidatoRoutes(){
    const { user, loading } = useContext(AppContext);
    if (loading) {
        return <Loader/>;
    }
    return user ? <Outlet/> : <Navigate to="/login" />;
}

