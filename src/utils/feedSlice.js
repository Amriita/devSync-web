import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: []
    },
    reducers: {
        addFeed: (state, action) => {
            state.feed = action.payload
        },
        removeUserFromFeed: (state, action) => {
           const newFeed = state.feed.filter((user) => user._id !== action.payload)
           state.feed = newFeed
        }
    }
})

export const { addFeed, removeUserFromFeed } = feedSlice.actions

export default feedSlice.reducer