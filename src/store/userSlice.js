/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://blog.kata.academy/api";

export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/users/login`, options);
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data?.errors ? JSON.stringify(data.errors) : response.status;
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signup = createAsyncThunk(
  'user/signup',
  async (user, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/users`, options);
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data?.errors ? JSON.stringify(data.errors) : response.status;
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (user, { rejectWithValue, getState }) => {
    const { token } = getState().user.user;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/user`, options);
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data?.errors ? JSON.stringify(data.errors) : response.status;
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
