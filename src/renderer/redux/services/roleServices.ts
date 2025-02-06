import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "roles/"

const getRoles = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};

const createRoles = async (role: Role) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: role
    });
    return data
};

const updateRole = async (role: Role) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${role.id}/`,
        data: role
    });
    return data
};

const deleteRole = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const roleServices = {
    getRoles,
    createRoles,
    deleteRole,
    updateRole
};

export default roleServices;