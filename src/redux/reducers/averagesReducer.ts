import { createSlice } from '@reduxjs/toolkit'

// Initial State

const defaultState = [{}]

// Reducer

export const averagesSlice = createSlice({
    name: 'averages',
    initialState: defaultState,
    reducers: {
        initAverages: (state, action) => {
            return action.payload
        },
        updateAverages: (state, action) => {
            const { id, value } = action.payload
            return state
        },
        default: (state) => {
            return state
        },
    },
})

export const { initAverages, updateAverages } = averagesSlice.actions
export default averagesSlice.reducer
