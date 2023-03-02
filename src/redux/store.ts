/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import utilsReducer from './reducers/utilsReducer'
import metricsReducer from './reducers/metricsReducer'
import { useOuraAPI } from '../hooks/useAPI'

const store = configureStore({
    reducer: {
        users: usersReducer,
        metrics: metricsReducer,
        utils: utilsReducer,
        [useOuraAPI.reducerPath]: useOuraAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(useOuraAPI.middleware),
})

store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
