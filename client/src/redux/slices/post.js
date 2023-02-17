import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    console.log(id)
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})


const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    }
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        //posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        //tags
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'error'
        },

        // remove post
        [fetchRemovePost.fulfilled]: (state, action) => {
            console.log(action)
            state.posts.items = state.posts.items.filter(post => post._id !== action.payload._id)
        }
    }
})

export const postsReducer = postSlice.reducer