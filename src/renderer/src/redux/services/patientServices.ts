import { Patient } from "@renderer/types/Patient";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "patients/"

const getPatients = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};

const createPatient = async (role: Patient) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: role
    });
    return data
};

const uploadPatient = async (values: { data: FormData, id: number }) => {
    const { data } = await axiosInstance.postForm(API_PREFIX + `${values.id}/upload/`, values.data);
    return data
};

const updatePatient = async (role: Patient) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${role.id}/`,
        data: role
    });
    return data
};

const deletePatient = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const patientServices = {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient,
    uploadPatient
};

export default patientServices;