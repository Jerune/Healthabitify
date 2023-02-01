import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import type { InputEvent, FormSubmit } from '../types.d.js'

function Login() {
    const navigate = useNavigate()
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
        const loginData = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        ).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            return {
                status: errorCode,
                errorMessage,
            }
        })

        if (loginData.user && !loginData.status) {
            handleLocalStorage()
            setFormData({
                email: '',
                password: '',
                errorMessage: '',
            })
            navigate('/')
        } else if (loginData.status) {
            let error = ''
            switch (loginData.status) {
                case 'auth/wrong-password':
                    error = 'Incorrect password, please try again'
                    break
                case 'auth/user-not-found':
                    error = 'User does not exists, please sign up'
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

    return (
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
    )
}

export default Login
