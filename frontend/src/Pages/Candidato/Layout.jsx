import Header from "../../Components/Candidatos/Header/Header";
import Loader from "../../Components/Global/Loader/Loader";
import UserDropdown from "../../Components/Candidatos/UserDropdown/UserDropdown";
import { AppContext } from "../../Contexts/AppContext";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Layout()
{
    const {loading, user} = useContext(AppContext);
    
    if (!loading) {
         return (
            <>
                { user &&
                    <Header/>
                }

                <main>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <div className="min-w-[300px] container relative max-w-screen-xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </>
        );
    }

    return(<Loader/>);
}


