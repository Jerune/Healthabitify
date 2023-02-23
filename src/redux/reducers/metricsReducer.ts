import { createSlice } from '@reduxjs/toolkit'

// Initial State

const defaultState = [
    {
        order: 0,
        id: '',
        name: '',
        active: true,
        onDashboard: true,
        dataType: '',
        unit: '',
        source: '',
        categoryId: '',
        categoryIcon: '',
        isFixed: true,
        frequency: '',
        goal: '',
        conditionsMode: '',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
]

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
            return [...newState]
        },
        default: (state) => {
            return state
        },
    },
})

export const { initMetrics, updateMetric } = metricSlice.actions
export default metricSlice.reducer
