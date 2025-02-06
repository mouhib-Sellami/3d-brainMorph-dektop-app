import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../services/userServices";
import { userState } from "@renderer/types/reduxTypes/userState";
import { User } from "@renderer/types/User";


const initialState: userState = {
    users: [],
    isError: false,
    isLoading: false,
    message: '',
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUsers: (state: userState) => {
            state.users = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getUsers.rejected, (state) => {
                state.users = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
    try {
        const response = await userServices.getUsers();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createUser = createAsyncThunk('users/createUser', async (data: User, thunkAPI) => {
    try {
        const response = await userServices.createUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (data: User, thunkAPI) => {
    try {
        const response = await userServices.updateUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (data: number, thunkAPI) => {
    try {
        const response = await userServices.deleteUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;