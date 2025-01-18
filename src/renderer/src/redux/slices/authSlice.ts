import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onError } from './errorSlice';
import { store } from '../store';
import { UserAuth } from '@/types/Auth';
import { AuthState } from '@/types/reduxTypes/AuthState';
import axiosInstance from '@renderer/config/AxiosInstance';
import authServices from '../services/authServices';


const initialState: AuthState = {
    user: null,
    isError: false,
    isAuthenticated: false,
    isLoading: false,
    message: '',
    permissions: [],
    organization: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state: AuthState) => {
            state.user = null;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.isError = false;
            state.message = '';
            state.permissions = [];
            state.organization = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.permissions = action.payload.permissions;
                state.organization = action.payload.organization;
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${action.payload.token}`;
                state.message = '';
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.permissions = [];
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isError = false;
                state.message = '';
                state.permissions = [];
                state.organization = null;
            })
            .addCase(logout.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isError = false;
                state.message = '';
                state.permissions = [];
                state.organization = null;
            })

    }
});
export const login = createAsyncThunk('auth/login', async (data: UserAuth, thunkAPI) => {
    try {
        localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN || '@token')
        const response = await authServices.login(data);
        localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN || '@token', response.token)
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            if (error?.response?.status === 400) {
                store.dispatch(onError({
                    content: "E-mail ou mot de passe incorrect.",
                    level: "ERROR",
                    type: "AUTH"
                }))
            }
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await authServices.logout();
        localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN|| '@token')
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
