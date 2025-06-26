import UserDropdown from "../Components/UserDropdown/UserDropdown";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Layout()
{
    const {user} = useContext(AppContext);

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link space-x-4">Home</Link>

                    {
                    user.email ? 
                            <UserDropdown className="space-x-4" user={user}/>
                        :
                        <div className="space-x-4">
                            <Link to="/registro" className="nav-link">Registro</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div>
                    }
                </nav>
            </header>

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
                <Outlet />
            </main>
        </>
    );
}


