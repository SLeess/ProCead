import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/InsideEdital/Sidebar/Sidebar";
import TopBar from "@/Components/Admin/InsideEdital/TopBar/TopBar";
import { useState } from "react";

export default function LayoutAdminInsideEdital() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                    <div className="box-border h-[100vh] w-full overflow-y-auto bg-gray-100 px-5 py-3">
                    <TopBar setOpenSidebar={setOpenSidebar}/>
                        <Outlet />
                    </div>
            </div>
        </>
    );
}