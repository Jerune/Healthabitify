import { createSlice } from '@reduxjs/toolkit'

// Initial State

const standardMetric = [
    {
        id: '',
        name: '',
        active: true,
        onDashboard: false,
        dataType: 'Amount',
        unit: '',
        source: 'Manual',
        categoryId: '',
        categoryIcon: '',
        isFixed: true,
        frequency: 'Weekly',
        goal: '',
        conditionsMode: 'Higher',
        good: {
            mode: 'More',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'Less',
            value: '',
        },
    },
]

// Reducer

export const metricSlice = createSlice({
    name: 'metric',
    initialState: standardMetric,
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
