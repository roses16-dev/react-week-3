import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// Initialize
const initialState = {
    posts: [],
    post: {
        id: -1,
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

export const __getPost = createAsyncThunk(
    "posts/getPost",
    async ( payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://localhost:3001/posts/${payload}`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            console.log(`__getPost Error!! ${error}`)
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
            // __getPosts
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
            },

            // __getPost
            [__getPost.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__getPost.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.post = action.payload
            },
            [__getPost.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        }
    }
)

export default postsSlice.reducer