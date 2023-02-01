/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
    reducer: {
        user: usersReducer,
    },
})

store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
