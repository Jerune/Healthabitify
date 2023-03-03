import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type UserInfo = {
    id: string
    age: number
    weight: number
    height: number
    biological_sex: string
    email: string
}

export const useOuraAPI = createApi({
    reducerPath: 'useOuraAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.ouraring.com/v2/usercollection/',
        prepareHeaders: (headers, { getState }) => {
            const token = 'MAW2MA3PSS7NDOCDN4S7MFHHIXMRCJAT' // To change with const { token } = getState().users.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (build) => ({
        getUserData: build.query<UserInfo, void>({
            query: () => 'personal_info',
        }),
    }),
})

export const { useGetUserDataQuery } = useOuraAPI
