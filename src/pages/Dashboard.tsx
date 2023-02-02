import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'

function Dashboard() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(
                        localSignIn({
                            email: user.email,
                            userId: user.uid,
                        })
                    )
                } else {
                    navigate('/')
                }
            })
        }
    }, [isLoggedIn])

    return (
        <>
            <HeaderNav />
            <MainContent>
                <h1>Dashboard</h1>
            </MainContent>
        </>
    )
}

export default Dashboard
