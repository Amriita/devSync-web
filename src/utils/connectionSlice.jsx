import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connections: []
    },
    reducers: {
        addConnection: (state, action) => {
            state.connections = action.payload
        },
        removeConnection: (state, action) => {
            state.connections = state.connections.filter((connection) => connection.id !== action.payload)
        }
    }
})

export default connectionSlice.reducer
export const { addConnection, removeConnection } = connectionSlice.actions