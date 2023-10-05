import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    products: [],
    setProducts: () => {},
    setUser: () => {},
    setToken: () => {},
    logReg: true,
    setLogReg: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });
    const [products, _setProducts] = useState([]);
    const [logReg, setLogReg] = useState(true);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

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

    return (
        <StateContext.Provider value={{
            user,
            token,
            products,
            logReg,
            setProducts,
            setUser,
            setToken,
            setLogReg,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)