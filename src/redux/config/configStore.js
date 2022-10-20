import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import posts from "../modules/postsSlice";
import comments from "../modules/commentSlice";

const store = configureStore({
  reducer: { posts: posts, comments, comments },
  devTools: process.env.NODE_ENV !== 'production'
// }, composeWithDevTools(applyMiddleware(thunk)));
}, );

export default store;
