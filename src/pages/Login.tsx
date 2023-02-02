import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import { signIn } from '../redux/reducers/usersReducer'
import type { InputEvent, FormSubmit, SignInData } from '../types.d.js'
import IntroVideo from '../assets/login_video.webm'

function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const rememberCheckbox = useRef<HTMLInputElement>(null)
    const emailInLocalStorage = localStorage.getItem('email')
    const [errorIsShowing, setErrorIsShowing] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorMessage: '',
    })

    useEffect(() => {
        if (emailInLocalStorage) {
            if (rememberCheckbox.current !== null) {
                rememberCheckbox.current.checked = true
            }
            setFormData({
                ...formData,
                email: emailInLocalStorage,
            })
        }
    }, [])

    function handleChange(event: InputEvent) {
        if (errorIsShowing) setErrorIsShowing(false)
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    function handleLocalStorage() {
        if (rememberCheckbox.current !== null) {
            if (rememberCheckbox.current.checked) {
                localStorage.setItem('email', formData.email)
            } else if (emailInLocalStorage) {
                localStorage.clear()
            }
        }
    }

    async function handleSubmit(event: FormSubmit) {
        event.preventDefault()
        let SignInDbResponse: SignInData = {
            email: '',
            userId: '',
            errorMessage: '',
        }
        await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        )
            .then((userCredential) => {
                // Signed in
                const { user } = userCredential
                SignInDbResponse = {
                    ...SignInDbResponse,
                    email: user.email,
                    userId: user.uid,
                }
            })
            .catch((error) => {
                const errorMessage = error.code
                SignInDbResponse = {
                    ...SignInDbResponse,
                    errorMessage,
                }
            })

        if (SignInDbResponse.userId) {
            handleLocalStorage()
            dispatch(
                signIn({
                    email: SignInDbResponse.email,
                    userId: SignInDbResponse.userId,
                })
            )
            setFormData({
                email: '',
                password: '',
                errorMessage: '',
            })
            navigate('/')
        } else if (SignInDbResponse.errorMessage) {
            let error = ''
            switch (SignInDbResponse.errorMessage) {
                case 'auth/wrong-password':
                    error = 'Incorrect password, please try again'
                    break
                case 'auth/user-not-found':
                    error = 'User does not exists, please sign up'
                    break
                case 'auth/internal-error':
                    error =
                        'Something went wrong, please verify both fields and try again'
                    break
                default:
                    error = ''
            }
            setFormData({
                ...formData,
                errorMessage: error,
            })
            setErrorIsShowing(true)
        }
    }

    if (isLoggedIn) {
        return <Navigate to="/" />
    }

    return (
        <div className="h-full w-full">
            <video className="h-full w-screen" autoPlay muted>
                <source src={IntroVideo} type="video/webm" />
            </video>
            <section>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder=""
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder=""
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            ref={rememberCheckbox}
                            id="remember-me"
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit">Sign In</button>
                    {errorIsShowing && (
                        <p className="text-red-500 text-sm">
                            {formData.errorMessage}
                        </p>
                    )}
                </form>
            </section>
        </div>
    )
}

export default Login
