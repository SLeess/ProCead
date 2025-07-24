import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";

export default function GuestRoutes(){
    const { canAccessAdminArea, token, loading } = useContext(AppContext);
    if (loading) {
        return <Loader/>;
    }
    return (token != null && canAccessAdminArea()) ?  <Navigate to="/admin" />: <Outlet/>;

}

