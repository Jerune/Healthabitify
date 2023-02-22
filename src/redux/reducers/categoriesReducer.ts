import { createSlice } from '@reduxjs/toolkit'

// Initial State

const initialData = [
    {
        id: '',
        order: '',
        name: '',
        iconName: '',
    },
]

// Reducer

export const categorySlice = createSlice({
    name: 'categories',
    initialState: initialData,
    reducers: {
        initCategories: (state, action) => {
            return action.payload
        },
        default: (state) => {
            return state
        },
    },
})

export const { initCategories } = categorySlice.actions
export default categorySlice.reducer
