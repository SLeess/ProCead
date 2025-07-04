import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";

export default function AuthCandidatoRoutes(){
    const {isAdmin} = useContext(AppContext);

    return isAdmin()? <Outlet/> : <Navigate to="/admin/login" />;
}

