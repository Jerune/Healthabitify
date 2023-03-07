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
            lastUpdated: '',
        },
        fitbit: {
            token: '',
            lastUpdated: '',
        },
    },
}

// Reducer

export const userSlice = createSlice({
    name: 'user',
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
        setDevices: (state, action) => {
            const { oura, fitbit } = action.payload
            return {
                ...state,
                devices: {
                    oura: {
                        token: oura.token,
                        lastUpdated: oura.lastUpdated,
                    },
                    fitbit: {
                        token: fitbit.token,
                        lastUpdated: fitbit.lastUpdated,
                    },
                },
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const { localSignIn, localSignOut, setDevices } = userSlice.actions
export default userSlice.reducer
