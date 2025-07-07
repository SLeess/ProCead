import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import Loader from "@/Components/Global/Loader/Loader";

export default function GuestRoutes(){
    // const { user, isAdmin, loading } = useContext(AppContext);
    const { isAdmin, token, loading } = useContext(AppContext);
    if (loading) {
        return <Loader/>;
    }
    // return (!user && !isAdmin()) ? <Outlet/> : <Navigate to="/admin" />;
    // console.log("isAdmin:", isAdmin(), "token "+ token);
    return (token != null && isAdmin()) ?  <Navigate to="/admin" />: <Outlet/>;

}

