import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getLanguages } from '../../../services/api';

const initialState = {
  languages: [],
};

export const fetchLanguages = createAsyncThunk(
  'languages/languagesFetch',
  async () => {
    return await getLanguages();
  },
);

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    languagesRemove: (state, action) => {
      return {
        ...state,
        languages: state.languages.filter(
          (item) => item.id !== action.payload[0].id,
        ),
      };
    },
    languagesPost: (state, action) => {
      return {
        ...state,
        languages: [...state.languages, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchLanguages.pending, state => {
      //     return {
      //         ...state,
      //         languagesLoadingStatus: 'loading'
      //     }
      // })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        return {
          ...state,
          languages: action.payload.data,
          // languagesLoadingStatus: "idle",
        };
      })
      // .addCase(fetchLanguages.rejected, state => {
      //     return {
      //         ...state,
      //         languagesLoadingStatus: "error",
      //       }
      // })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = languagesSlice;

export default reducer;
export const { languagesRemove, languagesPost } = actions;
