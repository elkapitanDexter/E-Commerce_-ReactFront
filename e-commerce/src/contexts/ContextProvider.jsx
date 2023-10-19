import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    products: [],
    lightMode: true,
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
    const [lightMode, _setLightMode] = useState(true);
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
        _setLightMode(bool)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            products,
            logReg,
            lightMode,
            baseUrl,
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