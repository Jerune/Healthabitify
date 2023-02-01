import { createSlice } from '@reduxjs/toolkit'

// Initial State

const activeUser = {
    email: '',
    userId: '',
    isLoggedIn: false,
}

// Reducer

export const userSlice = createSlice({
    name: 'user',
    initialState: activeUser,
    reducers: {
        signIn: (state, action) => {
            const { email, userId } = action.payload
            return {
                ...state,
                email,
                userId,
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
