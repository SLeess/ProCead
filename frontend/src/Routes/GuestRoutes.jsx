import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";

export default function GuestRoutes(){
    const { user } = useContext(AppContext);

    return !user.email ? <Outlet/> : <Navigate to="/" />;
}

