import axios from "axios";
// import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
    }, (error) => {
    const {response} = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
        console.log("Incorrect token or user has expired");
        // window.location.reload();
    } else if (response.status === 404) {
        console.log("Show not found");
    }

    throw error;
})

export default axiosClient