/* eslint-disable no-empty-pattern */
/* eslint-disable no-empty */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

export const register = createAsyncThunk(
  "admin/register",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/register",data);
      if(res.data){
        return res.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const login = createAsyncThunk(
  "admin/login",
  async (loginCredentails, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/login",loginCredentails);
      if(res.data){
        return res.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "admin/logOutUser",
  async (_, thunkAPI) => {
    try {
     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { } = adminSlice.actions;

export default adminSlice.reducer;
