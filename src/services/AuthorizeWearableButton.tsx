import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useState } from 'react'
import { useAppDispatch } from '../redux/reduxHooks'
import { AuthorizeApi } from '../types'
import { toast } from 'react-toastify'
import { updateDeviceToken } from '../redux/reducers/usersReducer'

function AuthorizeWearableButton({ url, id, scope, name }: AuthorizeApi) {
    const dispatch = useAppDispatch()
    let textContent = 'Renew Authorization'
    const { loading, getAuth } = useOAuth2({
        authorizeUrl: url,
        clientId: id,
        redirectUri: `${document.location.origin}/callback`,
        responseType: 'token',
        scope,
        onSuccess: (payload) => {
            const token = payload.access_token
            dispatch(updateDeviceToken({name, token}))
        },
        onError: (error_) => {
            toast.error(`Error: ${error_}`)
        },
    })

    if (loading) {
        textContent = 'Loading...'
    }

    return (
        <>
            <button
                className="px-8 py-4 bg-palette-300 text-black"
                type="button"
                onClick={() => getAuth()}
            >
                {textContent}
            </button>
        </>
    )
}

export default AuthorizeWearableButton
