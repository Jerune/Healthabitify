import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricSettings from '../features/SettingsMenu/MetricsSettings'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import categoriesList from '../data/categories'
import getMetrics from '../services/getMetrics'
import { updateMetric } from '../redux/reducers/metricsReducer'
import type { Category } from '../types'

function Settings() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
    const activeMetrics = useAppSelector((state) => state.metrics)
    const dispatch = useAppDispatch()
    const [metricsView, setMetricsView] = useState(false)
    const [activeCategory, setActiveCategory] = useState([
        { id: '', name: '', iconName: '' },
    ])

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

    async function setMetrics(categoryId: string) {
        const activeCat = categoriesList.filter(
            (category) => category.id === categoryId
        )
        setActiveCategory(activeCat)
        const metricsList = await getMetrics(categoryId)
        dispatch(updateMetric(metricsList))
        setMetricsView(true)
    }

    function resetSettings() {
        const emptyCategoryData = { id: '', name: '', iconName: '' }
        setMetricsView(false)
        setActiveCategory([emptyCategoryData])
    }

    const categories = (categoriesArray: Category[]) => {
        const categoryList = categoriesArray.map((category) => {
            return (
                <button
                    type="button"
                    key={category.name}
                    onClick={() => setMetrics(category.id)}
                >
                    {category.name}
                </button>
            )
        })

        return categoryList
    }

    const metrics = activeMetrics.map((metric) => {
        if (metricsView) {
            return <MetricSettings key={metric.id} metric={metric} />
        }
        return null
    })

    return (
        <>
            <HeaderNav />
            <main>
                <SettingsMenuContainer>
                    <SettingsMenuSection>
                        {metricsView
                            ? categories(activeCategory)
                            : categories(categoriesList)}
                    </SettingsMenuSection>
                    <SettingsContentField>{metrics}</SettingsContentField>
                </SettingsMenuContainer>
            </main>
        </>
    )
}

export default Settings
