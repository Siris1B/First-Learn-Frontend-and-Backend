import { configureStore } from '@reduxjs/toolkit';

import languages from '../components/tableList/languagesSlice';
import posts from '../components/posts/postsSlice';

const store = configureStore({
  reducer: { languages, posts },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
