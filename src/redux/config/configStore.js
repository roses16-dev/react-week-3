import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/postsSlice";
import comment from "../modules/commentSlice";

const store = configureStore({
  reducer: { posts: posts, comment },
});

export default store;
