import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Header from "@/Components/Candidatos/Header/Header";
import { useContext } from "react";
import { AppContext, useAppContext } from "@/Contexts/AppContext";
import SubHeader from "@/Components/Candidatos/SubHeader/SubHeader";

export default function Layout()
{
    const { user } = useContext(AppContext);
    const { editalId } = useParams();
    const location =  useLocation();

    const showSubHeader = editalId && !location.pathname.endsWith('/inscrever');

    return (
        <>
            {user && (
                <>
                    <Header showSubHeader={showSubHeader}/>
                    {showSubHeader && (
                        <SubHeader/>
                    )}
                </>
            )}
            <main>
                <div className="min-w-[300px] container relative max-w-screen-xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </>
    );
}


