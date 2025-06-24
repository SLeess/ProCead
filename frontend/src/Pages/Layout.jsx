import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Layout()
{
    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <div className="space-x-4">
                        <Link to="/registro" className="nav-link">Registro</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </div>
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


