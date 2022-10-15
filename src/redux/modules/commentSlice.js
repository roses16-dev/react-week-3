import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comment: {
    id: -1,
    postId: "",
    password: "",
    author: "",
    content: "",
  },
  isLoading: true,
  error: null,
};

export const __getComments = createAsyncThunk(
  "comments/getcomments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/comments/`);
      console.log("체크", data.data);
      console.log(
        "코멘트데이터",
        data.data.filter((e) => e.commentId == payload)
      );
      return thunkAPI.fulfillWithValue(
        data.data.filter((e) => e.commentId == payload)
      );
    } catch (error) {
      console.log(`__getPosts Error!! ${error}`);
      console.log("코멘트에러떳어요!", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
