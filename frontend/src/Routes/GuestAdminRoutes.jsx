import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";

export default function GuestRoutes(){
    const { user, isAdmin } = useContext(AppContext);

    return (!user && !isAdmin()) ? <Outlet/> : <Navigate to="/admin" />;
}

