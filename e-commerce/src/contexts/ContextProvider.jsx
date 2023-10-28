import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    products: [],
    lightMode: localStorage.getItem('lightModeLocal'),
    formattedDate: null,
    setProducts: () => {},
    setUser: () => {},
    setToken: () => {},
    logReg: true,
    setLogReg: () => {},
    setLightMode: () => {},
    baseUrl: null,
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });
    const [products, _setProducts] = useState([]);
    const [lightMode, _setLightMode] = useState(localStorage.getItem('lightModeLocal'));
    const [logReg, setLogReg] = useState(true);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const baseUrl = window.location.origin;

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const setProducts = (products) => {
        _setProducts(products);
    }
    const setLightMode = (bool) => {
        localStorage.removeItem('lightModeLocal')
        localStorage.setItem('lightModeLocal', bool)
        _setLightMode(bool)
    }

    // get current Date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <StateContext.Provider value={{
            user,
            token,
            products,
            logReg,
            lightMode,
            baseUrl,
            formattedDate,
            setProducts,
            setUser,
            setToken,
            setLogReg,
            setLightMode,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)