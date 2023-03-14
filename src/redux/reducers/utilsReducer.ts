import { createSlice } from '@reduxjs/toolkit'

// Initial State

const utils = {
    sideNavOpen: false,
    activeTimeView: 'week',
}

// Reducer

export const utilsSlice = createSlice({
    name: 'user',
    initialState: utils,
    reducers: {
        toggleMenu: (state) => {
            return {
                ...state,
                sideNavOpen: !state.sideNavOpen,
            }
        },
        changeActiveTimeView: (state, action) => {
            const value = action.payload
            if (value === 'week' || value === 'month' || value === 'year') {
                return {
                    ...state,
                    activeTimeView: value,
                }
            }
            return state
        },
        default: (state) => {
            return state
        },
    },
})

export const { toggleMenu, changeActiveTimeView } = utilsSlice.actions
export default utilsSlice.reducer
