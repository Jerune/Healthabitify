import { createSlice } from '@reduxjs/toolkit'

// Initial State

const utils = {
    sideNavOpen: false,
}

// Reducer

export const utilsSlice = createSlice({
    name: 'user',
    initialState: utils,
    reducers: {
        toggleMenu: (state) => {
            return {
                sideNavOpen: !state.sideNavOpen,
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const { toggleMenu } = utilsSlice.actions
export default utilsSlice.reducer
