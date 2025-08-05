import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/InsideEdital/Sidebar/Sidebar";
import TopBar from "@/Components/Admin/InsideEdital/TopBar/TopBar";

export default function LayoutAdminInsideEdital() {
    return (
        <>
            <div className="flex min-h-screen gap-5 bg-gray-100">
                <Sidebar />
                    <div className="box-border h-[100vh] w-full overflow-y-auto rounded-2xl bg-gray-100 p-5  mr-[2vh]">
                    <TopBar />
                        <Outlet />
                    </div>
            </div>
        </>
    );
}