import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPosts, postPost } from '../../../services/api';

const initialState = {
  posts: [],
  postsLoading: false,
  total: 0,
  createPostLoading: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params) => {
    return await getPosts(params);
  },
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (params) => {
    return await postPost(params);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsClear: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          postsLoading: true,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const newPosts = action.payload.data.data;
        return {
          ...state,
          postsLoading: false,
          total: action.payload.data.total,
          posts: [...newPosts],
        };
      })
      .addCase(createPost.pending, (state) => {
        return {
          ...state,
          createPostLoading: true,
        };
      })
      .addCase(createPost.fulfilled, (state) => {
        return {
          ...state,
          postsLoading: false,
        };
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = postsSlice;

export default reducer;
export const { postsClear } = actions;
