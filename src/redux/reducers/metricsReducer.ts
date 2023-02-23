import { createSlice } from '@reduxjs/toolkit'
import metricItems from '../../data/metricsMock'

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
        initMetrics: () => {
            return metricItems
        },
        updateMetric: (state, action) => {
            const updatedMetric = action.payload
            const remainingMetrics = state.filter(
                (metric) => metric.id !== updatedMetric.id
            )

            return [...remainingMetrics, updatedMetric]
        },
        default: (state) => {
            return state
        },
    },
})

export const { initMetrics, updateMetric } = metricSlice.actions
export default metricSlice.reducer
