import axios from "axios";
import { Navigate } from 'react-router-dom'
// import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(!error.response){
            //console.log(error.code)
        }else{
            const {response} = error;
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN')
                return "Incorrect token or user has expired";
                // window.location.reload();
            } else if (response.status === 404) {
                return "Show not found";
            }
        }
        return error;
    }
)

export default axiosClient