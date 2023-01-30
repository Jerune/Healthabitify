import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Connexion() {
    const navigate = useNavigate()
    const auth = getAuth()
    const usernameInput = useRef(null)
    const passwordInput = useRef(null)
    const rememberCheckbox = useRef(null)
    const emailInLocalStorage = localStorage.getItem('email')
    const [userIsLoggingIn, setuserIsLoggingIn] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        if (emailInLocalStorage) {
            rememberCheckbox.current.checked = true
            setFormData({
                email: emailInLocalStorage,
                password: '',
            })
        }
    }, [emailInLocalStorage])

    function handleChange(event: { target: { name; value } }) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    function handleLocalStorage() {
        if (rememberCheckbox.current.checked) {
            localStorage.setItem('email', formData.email)
        } else if (emailInLocalStorage) {
            localStorage.clear()
        }
    }

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        const userAction = userIsLoggingIn
            ? signInWithEmailAndPassword
            : createUserWithEmailAndPassword
        const loginData = userAction(auth, formData.email, formData.password)
            .then((userCredential) => {
                const { user } = userCredential
                return {
                    status: 200,
                    user,
                }
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                return {
                    status: errorCode,
                    errorMessage,
                }
            })

        if (loginData.user && loginData.status === 200) {
            handleLocalStorage()
            setFormData({
                email: '',
                password: '',
            })
            navigate('/dashboard')
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
                        ref={usernameInput}
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
                        ref={passwordInput}
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
            </form>
        </section>
    )
}

export default Connexion
