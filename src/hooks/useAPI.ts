import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const useOuraAPI = createApi({
    reducerPath: 'OuraApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.ouraring.com/v2/usercollection/',
        prepareHeaders: (headers, { getState }) => {
            const token = 'IEKR4SNJH3V6TM3JYSPKFJPIQFQF7NQP' // To change with const { token } = getState().users.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getUserData: builder.mutation({
            query: () => ({
                url: `personal_info`,
                // When performing a mutation, you typically use a method of
                // PATCH/PUT/POST/DELETE for REST endpoints
                method: 'GET',
                // fetchBaseQuery automatically adds `content-type: application/json` to
                // the Headers and calls `JSON.stringify(patch)`
            }),
        }),
    }),
})

export const { useGetUserDataMutation } = useOuraAPI
