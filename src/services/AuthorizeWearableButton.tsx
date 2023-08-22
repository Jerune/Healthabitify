import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useState } from 'react'
import { useAppDispatch } from '../redux/reduxHooks'
import { setUpdateMessage } from '../redux/reducers/utilsReducer'
import { AuthorizeApi } from '../types'

function AuthorizeWearableButton({ url, id, scope }: AuthorizeApi) {
    const [newTokenActive, setNewTokenActive] = useState(false)
    const dispatch = useAppDispatch()
    let textContent = 'Renew Authorization'
    let newToken = ''
    const { loading, getAuth } = useOAuth2({
        authorizeUrl: url,
        clientId: id,
        redirectUri: `${document.location.origin}/callback`,
        responseType: 'token',
        scope,
        onSuccess: (payload) => {
            newToken = payload.access_token
            setNewTokenActive(true)
        },
        onError: (error_) => {
            dispatch(setUpdateMessage(`Error: ${error_}`))
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
            {newTokenActive && <p>{`Copy to token field: ${newToken}`}</p>}
        </>
    )
}

export default AuthorizeWearableButton
