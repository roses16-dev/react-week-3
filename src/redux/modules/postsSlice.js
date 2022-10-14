import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// Initialize
const initialState = {
    posts: [],
    post: {
        id: 0,
        password: "",
        author: "",
        category: "",
        title: "",
        content: ""
    },
    // Loading 상황에 따라 값을 바꿔주어 re-rendering을 발생시킨다.
    isLoading: false,
    error: null
}

export const __getPosts = createAsyncThunk(
    "posts/getPosts",
    async ( payload, thunkAPI) => {
        try {
            const data = await axios.get("http://localhost:3001/posts")
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            console.log(`__getPosts Error!! ${error}`)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const postsSlice = createSlice(
    {
        name: 'posts',
        initialState: initialState,
        reducers: {   },
        extraReducers: {
            [__getPosts.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__getPosts.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.posts = action.payload
            },
            [__getPosts.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        }
    }
)

export default postsSlice.reducer