/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://blog.kata.academy/api";

export const getArticles = createAsyncThunk(
  'data/getArticles',
  async (pageNum, { rejectWithValue, getState }) => {
    const { user } = getState().user;
    const options = user ? {
      method: "GET",
      headers: {
        Authorization: `Token ${user.token}`,
      },
    } : {};
    try {
      const response = await fetch(`${baseURL}/articles?limit=${20}&offset=${20 * pageNum}`, options);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getArticle = createAsyncThunk(
  'data/getArticle',
  async (slug, { rejectWithValue, getState }) => {
    const { user } = getState().user;
    const options = user ? {
      method: "GET",
      headers: {
        Authorization: `Token ${user.token}`,
      },
    } : {};

    try {
      const response = await fetch(`${baseURL}/articles/${slug}`, options);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createArticle = createAsyncThunk(
  'data/createArticle',
  async (article, { rejectWithValue, getState }) => {
    const { token } = getState().user.user;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/articles`, options);
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

export const updateArticle = createAsyncThunk(
  'data/updateArticle',
  async ({ slug, article }, { rejectWithValue, getState }) => {
    const { token } = getState().user.user;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/articles/${slug}`, options);
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

export const deleteArticle = createAsyncThunk(
  'data/deleteArticle',
  async (slug, { rejectWithValue, getState }) => {
    const { token } = getState().user.user;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await fetch(`${baseURL}/articles/${slug}`, options);
      const data = await response.json().catch(() => {});
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

export const favouriteArticle = createAsyncThunk(
  'data/favouriteArticle',
  async (slug, { rejectWithValue, getState }) => {
    const { token } = getState().user.user;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await fetch(`${baseURL}/articles/${slug}/favorite`, options);
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

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    articles: [],
    article: null,
    page: 1,
    articlesCount: null,
    pagesCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    navigateToPage(state, action) {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.pagesCount = Math.floor(state.articlesCount / 20);
      })
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload.article;
      })
      .addCase(getArticle.pending, (state) => {
        state.loading = true;
        state.article = null;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload.article;
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload.article;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.article = null;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(favouriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload.article;
      })
      .addCase(favouriteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(favouriteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { navigateToPage } = dataSlice.actions;

export default dataSlice.reducer;
