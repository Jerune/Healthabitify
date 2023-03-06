import { createSlice } from '@reduxjs/toolkit'

// Initial State

const activeUser = {
    email: '',
    userId: '',
    displayName: '',
    isLoggedIn: false,
    devices: {
        oura: {
            token: '',
        },
        fitbit: {
            token: '',
        },
    },
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
        setDeviceTokens: (state, action) => {
            const { oura, fitbit } = action.payload
            return {
                ...state,
                devices: {
                    oura: {
                        token: oura.token,
                    },
                    fitbit: {
                        token: fitbit.token,
                    },
                },
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const { localSignIn, localSignOut, setDeviceTokens } = userSlice.actions
export default userSlice.reducer
