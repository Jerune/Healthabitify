/* eslint-disable no-console */
import { useOAuth2 } from '@tasoskakour/react-use-oauth2'

type AuthorizeApi = {
    url: string
    id: string
    scope: string
}

function AuthorizeWearableButton({ url, id, scope }: AuthorizeApi) {
    const { data, loading, error, getAuth } = useOAuth2({
        authorizeUrl: url,
        clientId: id,
        redirectUri: `${document.location.origin}/callback`,
        responseType: 'token',
        scope,
        onSuccess: (payload) => console.log('Success', payload),
        onError: (error_) => console.log('Error', error_),
    })

    const isLoggedIn = Boolean(data?.access_token)
    let textContent = 'Login'

    if (error) {
        textContent = 'An error has produced'
    }

    if (loading) {
        textContent = 'Loading...'
    }

    if (isLoggedIn) {
        textContent = JSON.stringify(data?.access_token)
    }

    return (
        <button
            className="rounded-lg px-12 py-8 bg-green-600 text-white"
            type="button"
            onClick={() => getAuth()}
        >
            {textContent}
        </button>
    )
}

export default AuthorizeWearableButton
