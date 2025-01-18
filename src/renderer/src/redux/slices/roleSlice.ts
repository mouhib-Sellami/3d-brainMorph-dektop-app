import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleServices from "../services/roleServices";

const initialState: RoleState = {
    roles: [],
    isError: false,
    isLoading: false,
    message: '',
};

const RoleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        resetRoles: (state: RoleState) => {
            state.roles = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getRoles.rejected, (state) => {
                state.roles = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createRoles.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createRoles.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createRoles.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteRole.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteRole.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteRole.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateRole.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateRole.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateRole.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const getRoles = createAsyncThunk('roles/getRoles', async (_, thunkAPI) => {
    try {
        const response = await roleServices.getRoles();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createRoles = createAsyncThunk('roles/createRoles', async (data: Role, thunkAPI) => {
    try {
        const response = await roleServices.createRoles(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (data: number, thunkAPI) => {
    try {
        const response = await roleServices.deleteRole(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateRole = createAsyncThunk('roles/updateRole', async (data: Role, thunkAPI) => {
    try {
        const response = await roleServices.updateRole(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetRoles } = RoleSlice.actions;

export default RoleSlice.reducer;