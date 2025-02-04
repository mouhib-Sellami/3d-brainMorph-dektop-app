import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "tasks/"

const getTasks = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};



const taskServices = {
    getTasks
};

export default taskServices;