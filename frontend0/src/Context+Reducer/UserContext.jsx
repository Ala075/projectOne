import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "cookie-universal"

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });

    const cookie = Cookie();

    useEffect(() => {
        const userFromCookie = cookie.get("userId");
        const tokenFromCookie = cookie.get("eShop");

        if (userFromCookie && tokenFromCookie) {
            setAuth({
                user: userFromCookie,
                token: tokenFromCookie
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    );
};

const useAuth = () => {
    return useContext(UserContext);
};

export { UserProvider, useAuth };
