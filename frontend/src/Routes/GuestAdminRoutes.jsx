import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";

export default function GuestRoutes(){
    const { isAdmin, token } = useContext(AppContext);
    // console.log("isAdmin:", isAdmin(), "token "+ token);
    return (token != null && isAdmin()) ?  <Navigate to="/admin" />: <Outlet/>;

}

