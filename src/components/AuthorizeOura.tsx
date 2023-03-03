/* eslint-disable no-console */
import { useOAuth2 } from '@tasoskakour/react-use-oauth2'

function AuthorizeOura() {
    const { data, loading, error, getAuth } = useOAuth2({
        authorizeUrl: 'https://cloud.ouraring.com/oauth/authorize',
        clientId: 'OBGZFELJOIDPH67I',
        redirectUri: `${document.location.origin}/callback`,
        responseType: 'token',
        onSuccess: (payload) => console.log('Success', payload),
        onError: (error_) => console.log('Error', error_),
    })

    const isLoggedIn = Boolean(data?.access_token)

    if (error) {
        return <div>Error</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (isLoggedIn) {
        return <pre>{JSON.stringify(data)}</pre>
    }

    return (
        <button
            style={{ margin: '24px' }}
            type="button"
            onClick={() => getAuth()}
        >
            Login
        </button>
    )
}

export default AuthorizeOura
