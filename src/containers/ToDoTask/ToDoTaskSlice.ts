import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

interface Task {
  id: string;
  title: string;
  status: boolean;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: false,
};



export const fetchTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  'tasks/fetch',
  async () => {
    const response = await axiosApi.get<Task[] | null>('/tasks.json');
    return response.data || [];
  }
);


export const addTask = createAsyncThunk<Task, string, { state: RootState }>('tasks/addTask', async (title: string) => {
  const response = await axiosApi.post<Task>('/tasks.json', { title, status: false });
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
      });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    })
  }
});

export const toDoTaskReducer = ToDoTaskSlice.reducer;
