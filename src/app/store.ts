import {configureStore} from '@reduxjs/toolkit';
import {toDoTaskReducer} from '../containers/ToDoTask/ToDoTaskSlice';

export const store = configureStore({
  reducer: {
    todoTask: toDoTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

