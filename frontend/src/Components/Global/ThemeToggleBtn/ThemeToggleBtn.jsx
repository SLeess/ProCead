import { AppContext } from "../../../Contexts/AppContext";
import { useContext } from "react";
import { HiMoon, HiSun } from 'react-icons/hi';


export default function ThemeToggleBtn(){
    const {theme, toggleTheme} = useContext(AppContext);

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="
                hover:cursor-pointer 
                rounded-lg text-sm p-2.5
                focus:ring-0
            "
            aria-label="Toggle dark mode"
            >
            {
                theme === 'light' ? 
                <HiMoon className="h-6 w-6 text-slate-600 hover:text-slate-900" /> : 
                <HiSun className="h-6 w-6 dark:text-white dark:hover:text-[#81b4f1]" />
            }
        </button>
    );
}