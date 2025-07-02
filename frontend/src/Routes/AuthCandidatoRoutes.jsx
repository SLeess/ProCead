import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";

export default function AuthCandidatoRoutes(){
    const { user } = useContext(AppContext);

    return user ? <Outlet/> : <Navigate to="/login" />;
}

