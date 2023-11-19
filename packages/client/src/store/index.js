import { configureStore } from "@reduxjs/toolkit";
import languages from "../components/Table/tableList/languagesSlice";
import posts from "../components/Posts/posts/postsSlice";

const store = configureStore({
  reducer: { languages, posts },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
