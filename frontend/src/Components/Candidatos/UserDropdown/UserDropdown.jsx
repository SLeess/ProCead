import { useContext, useEffect, useRef, useState } from "react";
import styles from './userDropdown.module.css';
import { AppContext } from "@/Contexts/AppContext";
import { toast } from "react-toastify";
import { NavigationContext } from "@/Contexts/NavigationContext";

export default function UserDropdown({user}){
    const { navigate } = useContext(NavigationContext);
    const { token, logout } = useContext(AppContext);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return; 
                
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    async function handlerLogOut(){
        try {
            const res = await fetch('/api/logout', {
                method: 'post',
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            toast.success('Sessão encerrada.');
            logout();
            navigate('/login');
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <section className={styles.section_profile}>
            <div className="container">
                <div className="flex justify-center">
                <div className="relative inline-block">
                    <button
                    ref={trigger}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`${styles.btnProfile} dark:border-dark-3 dark:bg-dark-2`}
                    >
                        {user.nome.split(" ")[0]}
                        <span
                            className={`duration-100 ${dropdownOpen ? "-scale-y-100" : ""}`}
                        >
                            <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                                fill="currentColor"
                            />
                            </svg>
                        </span>
                    </button>

                    <div
                        ref={dropdown}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                        className={`${styles.callDropDown} dark:bg-slate-900 ${dropdownOpen ? "block" : "hidden"}`}
                    >
                    <div className="flex items-center gap-3 px-4 py-3 ">
                        <div className="relative aspect-square w-10 rounded-full">
                            <img
                                src="https://cdn.tailgrids.com/assets/images/core-components/account-dropdowns/image-1.jpg"
                                alt="account"
                                className="w-full rounded-full object-cover object-center"
                            />
                            <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green dark:border-dark"></span>
                        </div>
                        <div>
                        <p className="text-sm font-semibold text-black dark:text-white">
                            {user.nome}
                        </p>
                        <p className="text-xs text-black dark:text-white">
                            {user.email}
                        </p>
                        </div>
                    </div>
                    <div>
                        <a href="#0">
                        Ver perfil
                        </a>
                        <a href="#0">
                        Configurações
                        </a>
                    </div>
                    <div>
                        <a href="#0">
                        Support
                        </a>
                        <a href="#0">
                        API
                        </a>
                    </div>
                    <div>
                        <button onClick={() => handlerLogOut()} className={`${styles.logout} text-black`}>
                            Sair
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
    );
}