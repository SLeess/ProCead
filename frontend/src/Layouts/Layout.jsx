import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Header from "@/Components/Candidatos/Header/Header";
import { useContext } from "react";
import { AppContext, useAppContext } from "@/Contexts/AppContext";
import SubHeader from "@/Components/Candidatos/SubHeader/SubHeader";

export default function Layout()
{
    const { user } = useContext(AppContext);
    const { editalId } = useParams();
    const { remainingTime } = useAppContext();
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
            <div className='flex flex-row-reverse min-w-[310px] max-w-screen-xl mt-2 text-black'>
                {
                    remainingTime !== null && remainingTime !== 0 &&
                    <p className="text-sm my-1">Sua sessão expira em {remainingTime} min.</p>
                }
                {
                    remainingTime === 0 &&
                    <p className="text-sm my-1">Sua sessão expirou!</p>
                }
                {
                    remainingTime === null &&
                    <p className="text-sm my-1">&nbsp;</p>
                }
            </div>

            <main>
                <div className="min-w-[300px] container relative max-w-screen-xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </>
    );
}


