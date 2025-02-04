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

const getPatient = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const createPatient = async (patient: Patient) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: patient
    });
    return data
};

const uploadPatient = async (values: { data: FormData, id: number }) => {
    const { data } = await axiosInstance.postForm(API_PREFIX + `${values.id}/upload/`, values.data);
    return data
};

const updatePatient = async (patient: Patient) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${patient.id}/`,
        data: patient
    });
    return data
};

const startProcessPatient = async (id: number) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + `${id}/start-patient/`,
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

const processingPatient = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `processing-patient`,
    });
    return data
};

const pendingPatient = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `pending-patient`,
    });
    return data
};

const processedPatient = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `processed-patient`,
    });
    return data
};

const patientServices = {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient,
    uploadPatient,
    startProcessPatient,
    getPatient,
    processingPatient,
    pendingPatient,
    processedPatient
};

export default patientServices;