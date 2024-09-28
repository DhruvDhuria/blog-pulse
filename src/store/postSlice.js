import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.posts = action.payload
        }
        
    }
})

export const { setPost } = postSlice.actions

export default postSlice.reducer