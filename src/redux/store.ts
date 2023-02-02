/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import utilsReducer from './reducers/utilsReducer'

const store = configureStore({
    reducer: {
        user: usersReducer,
        utils: utilsReducer,
    },
})

store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store