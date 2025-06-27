import { AppContext } from "../../../Contexts/AppContext";
import { useContext } from "react";
import { HiMoon, HiSun } from 'react-icons/hi';


export default function ThemeToggleBtn(){
    const {theme, toggleTheme} = useContext(AppContext);

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            aria-label="Toggle dark mode"
            >
            {theme === 'light' ? <HiMoon className="h-6 w-6" /> : <HiSun className="h-6 w-6" />}
        </button>
    );
}