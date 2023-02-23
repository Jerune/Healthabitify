import { createSlice } from '@reduxjs/toolkit'

// Initial State

const defaultState = []

// Reducer

export const metricSlice = createSlice({
    name: 'metric',
    initialState: defaultState,
    reducers: {
        initMetrics: (state, action) => {
            return action.payload
        },
        updateMetric: (state, action) => {
            const newState = action.payload
            return {
                ...state,
                ...newState,
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const { initMetrics, updateMetric } = metricSlice.actions
export default metricSlice.reducer
