import { createSlice } from '@reduxjs/toolkit'

// Initial State

const activeUser = {
    email: '',
    userId: '',
    displayName: '',
    isLoggedIn: false,
}

// Reducer

export const userSlice = createSlice({
    name: 'users',
    initialState: activeUser,
    reducers: {
        localSignIn: (state, action) => {
            const { email, userId } = action.payload
            return {
                ...state,
                email,
                userId,
                isLoggedIn: true,
            }
        },
        localSignOut: () => {
            return { ...activeUser }
        },
        default: (state) => {
            return state
        },
    },
})

export const { localSignIn, localSignOut } = userSlice.actions
export default userSlice.reducer
