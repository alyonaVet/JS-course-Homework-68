import {AsyncThunk, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

interface Task {
  title: string;
  status: boolean;
}

export interface TaskState {
  tasks: Record<string, Task>;
  loading: boolean;
  error: boolean;
}

const initialState: TaskState = {
  tasks: {},
  loading: false,
  error: false,
};



export const fetchTasks = createAsyncThunk<Record<string, Task>, void, { state: RootState }>(
  'tasks/fetch',
  async () => {
    const response = await axiosApi.get<Record<string, Task> | null>('/tasks.json');
    console.log(response.data);
    return response.data || {};
  }
);


export const addTask = createAsyncThunk<Task, string, { state: RootState }>(
  'tasks/addTask',
  async (title: string) => {
  const response = await axiosApi.post<Task>('/tasks.json', { title, status: false });
  return response.data;
});


export const deleteTask: AsyncThunk<string, string, { state: RootState }> = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
  const response = await axiosApi.delete(`/tasks/${taskId}.json`);
  return response.data;
});

export const ToDoTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addTask.pending, (state)=>{
        state.error = false;
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(addTask.rejected, (state)=>{
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state)=>{
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state)=>{
        state.error = true;
        state.loading = false;
      });

  }
});

export const toDoTaskReducer = ToDoTaskSlice.reducer;
