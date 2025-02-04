import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import patientServices from "../services/patientServices";
import { PatientState } from "@renderer/types/reduxTypes/PatientState";
import { Patient } from "@renderer/types/Patient";

const initialState: PatientState = {
    patients: [],
    isError: false,
    isLoading: false,
    message: '',
    selectedPatient: null
};

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        resetPatient: (state: PatientState) => {
            state.patients = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.selectedPatient = null
        },
        updateSelectedPatient: (state: PatientState, action) => {
            state.selectedPatient = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.patients = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getPatients.rejected, (state) => {
                state.patients = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createPatients.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createPatients.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createPatients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deletePatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deletePatient.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deletePatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updatePatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updatePatient.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updatePatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(uploadPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(uploadPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.selectedPatient = action.payload
            })
            .addCase(uploadPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(startPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(startPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.selectedPatient = action.payload
            })
            .addCase(startPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.selectedPatient = action.payload
            })
            .addCase(getPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(pendingPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(pendingPatient.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';

            })
            .addCase(pendingPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(processingPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(processingPatient.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';

            })
            .addCase(processingPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(processedPatient.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(processedPatient.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';

            })
            .addCase(processedPatient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const getPatients = createAsyncThunk('patients/getPatients', async (_, thunkAPI) => {
    try {
        const response = await patientServices.getPatients();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createPatients = createAsyncThunk('patients/createPatient', async (data: Patient, thunkAPI) => {
    try {
        const response = await patientServices.createPatient(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deletePatient = createAsyncThunk('patients/deletePatient', async (data: number, thunkAPI) => {
    try {
        const response = await patientServices.deletePatient(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async (data: Patient, thunkAPI) => {
    try {
        const response = await patientServices.updatePatient(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const uploadPatient = createAsyncThunk('patients/uploadPatient', async (values: { data: FormData, id: number }, thunkAPI) => {
    try {
        const response = await patientServices.uploadPatient(values);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const startPatient = createAsyncThunk('patients/startPatient', async (id: number, thunkAPI) => {
    try {
        const response = await patientServices.startProcessPatient(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const getPatient = createAsyncThunk('patients/getPatient', async (id: number, thunkAPI) => {
    try {
        const response = await patientServices.getPatient(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const pendingPatient = createAsyncThunk('patients/pendingPatient', async (_, thunkAPI) => {
    try {
        const response = await patientServices.pendingPatient();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const processingPatient = createAsyncThunk('patients/processingPatient', async (_, thunkAPI) => {
    try {
        const response = await patientServices.processingPatient();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const processedPatient = createAsyncThunk('patients/processedPatient', async (_, thunkAPI) => {
    try {
        const response = await patientServices.processedPatient();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetPatient, updateSelectedPatient } = patientSlice.actions;

export default patientSlice.reducer;