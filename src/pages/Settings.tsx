import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricSettings from '../features/SettingsMenu/MetricsSettings'
import metricItem from '../data/metricsMock'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'

function Settings() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const categories = useAppSelector((state) => state.categories)
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

    const categoriesList = categories.map((category) => (
        <li key={category.order}>{category.name}</li>
    ))

    return (
        <>
            <HeaderNav />
            <main>
                <SettingsMenuContainer>
                    <SettingsMenuSection>
                        <ul>
                            {categoriesList.length > 1
                                ? categoriesList
                                : 'loading'}
                        </ul>
                    </SettingsMenuSection>
                    <SettingsContentField>
                        <MetricSettings metric={metricItem} />
                        <MetricSettings metric={metricItem} />
                        <MetricSettings metric={metricItem} />
                        <MetricSettings metric={metricItem} />
                        <MetricSettings metric={metricItem} />
                    </SettingsContentField>
                </SettingsMenuContainer>
            </main>
        </>
    )
}

export default Settings
