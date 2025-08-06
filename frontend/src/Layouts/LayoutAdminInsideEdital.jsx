import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/InsideEdital/Sidebar/Sidebar";
import TopBar from "@/Components/Admin/InsideEdital/TopBar/TopBar";

export default function LayoutAdminInsideEdital() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                    <div className="box-border h-[100vh] w-full overflow-y-auto bg-gray-100 px-5 py-3">
                    <TopBar />
                        <Outlet />
                    </div>
            </div>
        </>
    );
}