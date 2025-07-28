import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/InsideEdital/Sidebar/Sidebar";

export default function LayoutAdminInsideEdital() {
    return (
        <>
            <div className="flex min-h-screen gap-5 bg-gray-100">
                <Sidebar />
                <div className="box-border h-[94vh] w-full overflow-y-auto rounded-2xl bg-gray-100 p-5 mt-[3vh] mb-[2vh] mr-[2vh]">
                    <Outlet />
                </div>
            </div>
        </>
    );
}