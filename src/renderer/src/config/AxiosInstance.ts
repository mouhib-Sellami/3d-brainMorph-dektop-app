import axios, { AxiosError, AxiosResponse } from "axios";
import { onError } from "../redux/slices/errorSlice";
import { handleSessionExpired } from "@renderer/redux/slices/sessionSlice";

export let store: any

export const injectStore = (_store: any) => {
    store = _store
}
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_SERVER_API_URL,
    timeout: 15000,
    // withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

export const setAuthToken = async (config: any) => {
    try {
        const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || "@token");
        console.log("token");
        console.log(token);
        
        if (token) {
            console.log("heree");
            
            config.headers.Authorization = `Bearer ${token}`
        } else {
            delete config.headers.Authorization;
        }
    } catch (error) {
        // saving error
    }

}

const responseHandler = (response: AxiosResponse) => {
    return response;
};

const errorHandler = async (error: AxiosError) => {
    try {
        const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || "@token");
        console.log(token);
        
        if (error.code === AxiosError.ERR_NETWORK || error.code === AxiosError.ETIMEDOUT) {
            await store.dispatch(onError({
                content: "Network error, check your Internet connection.",
                level: "ERROR",
                type: "NETWORK",
            }));
        }
        if (token && error.response?.status === 401) {
            await store.dispatch(onError({
                content: "Your session has expired.",
                level: "WARNING",
                type: "AUTH",
            }));
            await store.dispatch(handleSessionExpired());
        }
        if (error.response?.status === 500) {
            await store.dispatch(onError({
                content: "Error has occurred, try again later.",
                level: "ALERT",
                type: "users",
                render: "NOTIFICATION"
            }))
        }
        return Promise.reject(error);
    } catch (error) {
        return Promise.reject(error);
    }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    await setAuthToken(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    async (response) => await responseHandler(response),
    async (error) => await errorHandler(error)
);
export default axiosInstance;