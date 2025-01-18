
import { UserAuth } from "@/types/Auth";
import axiosInstance from "@renderer/config/AxiosInstance";

const API_PREFIX = "auth/"

const login = async (user: UserAuth) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + "login/",
        data: user,
    });
    return data
};

const logout = async () => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + "logout/",
    });
    return data
};


const authServices = {
    login,
    logout,
};

export default authServices;