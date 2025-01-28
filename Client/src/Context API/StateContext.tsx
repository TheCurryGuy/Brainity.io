import React, { createContext, useState, ReactNode } from 'react';


// Create the context with a default value
export const StateContext = createContext<any>(undefined);

// Define the provider component with children prop
interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModal] = useState(false)
    const [isDashboard, setDashboard] = useState(true)
    const [isYoutube, setYoutube] = useState(false)
    const [isTwitter, setTwitter] = useState(false)
    const [isContent, setContent] = useState(false)

    return (
        <StateContext.Provider value={{
            isOpen, setIsOpen,
            modalOpen, setModal,
            isYoutube, setYoutube,
            isTwitter, setTwitter,
            isContent, setContent,
            isDashboard, setDashboard
        }}>
            {children}
        </StateContext.Provider>
    );
};
