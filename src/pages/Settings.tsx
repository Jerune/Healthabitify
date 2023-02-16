import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import SettingsButton from '../features/SettingsMenu/SettingsButton'
import categoriesData from '../data/categoriesMock'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricSettings from '../features/SettingsMenu/MetricsSettings'
import metricItem from '../data/metricsMock'

function Settings() {
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
            <main>
                <SettingsMenuContainer>
                    <SettingsContentField>
                        <MetricSettings metric={metricItem} />
                    </SettingsContentField>
                </SettingsMenuContainer>
            </main>
        </>
    )
}

export default Settings
