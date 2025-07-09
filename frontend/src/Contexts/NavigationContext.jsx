import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();

    const navigationExportValue = { 
        navigate
    };

    return (
    <NavigationContext.Provider value={navigationExportValue}>
        {children}
    </NavigationContext.Provider>
    );
};