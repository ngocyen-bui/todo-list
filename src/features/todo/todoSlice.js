import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createData, deleteData } from './todoAPI';

const initialState = {
  data: [],
  status: 'idle',
};

export const createTodoAsync = createAsyncThunk(
  'todo/createData',
  async (amount) => {
    const response = await createData(amount);
    return response.data;
  }
);
export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteData',
  async (amount) => {
    const response = await deleteData(amount);
    return response.data;
  }
);
export const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearDataTodo: (state) => {
      state.data = [];
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data.push(action.payload);
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload || [];
        console.log(state.data)
      });
  },
});

export const { clearDataTodo,removeTodo } = todoReducer.actions;
export const selectData = (state) => state.todos.data;

export default todoReducer.reducer;
