import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskState } from "@renderer/types/reduxTypes/taskState";
import taskServices from "../services/taskServices";

const initialState: taskState = {
    tasks: [],
    isError: false,
    isLoading: false,
    message: '',
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetTask: (state) => {
            state.tasks = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getTasks.rejected, (state) => {
                state.tasks = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})


export const getTasks = createAsyncThunk('tasks/getTasks', async (_, thunkAPI) => {
    try {
        const response = await taskServices.getTasks();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetTask } = taskSlice.actions;

export default taskSlice.reducer;
