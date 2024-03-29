import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../firebase/firebase'
import { localSignIn } from '../redux/reducers/usersReducer'
import type { InputEvent, FormSubmit, SignInData } from '../types.d.js'
import IntroVideo from '../assets/login_video_alt.webm'
import IntroVideoMP4 from '../assets/login_video_alt.mp4'
import logo from '../assets/logo_1b.jpg'
import LogoText from '../components/LogoText'
import { capitalizeFirstLetterFromArray } from '../utils/capitalizeFirstLetter'

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
        setFormData((prevformData) => {
            return {
                ...prevformData,
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
                localSignIn({
                    email: SignInDbResponse.email,
                    userId: SignInDbResponse.userId,
                })
            )
            setFormData({
                email: '',
                password: '',
                errorMessage: '',
            })
            navigate('dashboard')
        } else if (SignInDbResponse.errorMessage) {
            const errorMessageArray = SignInDbResponse.errorMessage
                .split('/')[1]
                .split('-')
            const errorMessageCapitalized =
                capitalizeFirstLetterFromArray(errorMessageArray)
            setFormData({
                ...formData,
                errorMessage: errorMessageCapitalized,
            })
            setErrorIsShowing(true)
        }
    }

    if (isLoggedIn) {
        return <Navigate to="dashboard" />
    }

    return (
        <div className="h-screen w-screen overflow-hidden">
            <video
                className="w-auto min-h-full h-full max-w-screen-md object-cover md:w-full md:max-w-[100%]"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={IntroVideo} type="video/webm" />
                <source src={IntroVideoMP4} type="video/mp4" />
            </video>
            <section className="w-screen h-screen z-50 fixed top-0 left-0 right-0 flex flex-col justify-center items-center">
                <div className="w-80 h-16 flex flex-row items-center rounded-t-lg bg-palette-600">
                    <img
                        className="h-full rounded-t-lg"
                        src={logo}
                        alt="Healthabitify logo"
                    />
                    <LogoText />
                </div>
                <div className="mx-auto w-80 bg-white opacity-90 p-6 rounded-b-lg">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                placeholder="you@email.com"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                                ref={rememberCheckbox}
                            />
                            <label
                                htmlFor="remember-me"
                                className="text-sm font-medium text-gray-700"
                            >
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-palette-500 opacity-70 hover:italic hover:opacity-100 hover:font-bold hover:transition-all px-5 py-2.5 text-center text-base font-medium text-white shadow-sm "
                        >
                            Submit
                        </button>
                        {errorIsShowing && (
                            <p className="text-red-500 text-sm">
                                {formData.errorMessage}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login
