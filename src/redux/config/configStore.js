import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/postsSlice";
import comments from "../modules/commentSlice";

const store = configureStore({
  reducer: { posts: posts, comments, comments },
});

export default store;
