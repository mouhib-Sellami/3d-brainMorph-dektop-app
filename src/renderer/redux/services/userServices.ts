import { User } from "@renderer/types/User";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "users/"

const getUsers = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};

const createUser = async (user: User) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: user
    });
    return data
};

const updateUser = async (user: User) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${user.id}/`,
        data: user
    });
    return data
};

const deleteUser = async (pk: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${pk}/`,
    });
    return data
};

const userServices = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

export default userServices;