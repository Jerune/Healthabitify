import { createSlice } from '@reduxjs/toolkit'

// Initial State

const activeUser = {
    firstName: '',
    isLoggedIn: false,
}

// Reducer

export const userSlice = createSlice({
    name: 'user',
    initialState: activeUser,
    reducers: {
        signIn: (state, action) => {
            const { firstName } = action.payload
            return {
                firstName,
                isLoggedIn: true,
            }
        },
        signOut: () => {
            return { ...activeUser }
        },
        default: (state) => {
            return state
        },
    },
})

export const { signIn, signOut } = userSlice.actions
export default userSlice.reducer
