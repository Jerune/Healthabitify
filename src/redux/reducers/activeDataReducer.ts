import { createSlice } from '@reduxjs/toolkit'

// Initial State

const defaultState = [{}]

// Reducer

export const activeDataSlice = createSlice({
    name: 'activeData',
    initialState: defaultState,
    reducers: {
        initActiveData: (state, action) => {
            return action.payload
        },
        updateActiveData: (state, action) => {
            const { id, value } = action.payload
            return state
        },
        default: (state) => {
            return state
        },
    },
})

export const { initActiveData, updateActiveData } = activeDataSlice.actions
export default activeDataSlice.reducer
