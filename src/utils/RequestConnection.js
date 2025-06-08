import { createSlice } from "@reduxjs/toolkit";

const RequestConnection =createSlice({
    name: "requestConnection",
    initialState: {
        requests: []
    },
    reducers: {
        addRequestConnection: (state, action) => {
            state.requests = action.payload
        },
        removeRequestConnection: (state, action) => {
            state.requests = state.requests.filter((request) => request.id !== action.payload)
        }
    }
})

export default RequestConnection.reducer
export const { addRequestConnection, removeRequestConnection } = RequestConnection.actions