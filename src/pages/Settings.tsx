import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'react-icons/ri'
import HeaderNav from '../components/HeaderNav'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricCard from '../features/SettingsMenu/MetricCard'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import categoriesList from '../data/categories'
import getMetrics from '../services/getMetrics'
import { updateMetric } from '../redux/reducers/metricsReducer'

function Settings() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
    const metrics = useAppSelector((state) => state.metrics)
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

    function showCategories() {
        const categories = categoriesList.map((category) => {
            const IconElement = Icons[category.iconName]
            return (
                <button
                    className={`w-72 flex flex-row gap-2 justify-start items-center text-2xl py-7 pl-8 rounded-lg ${
                        activeCategory[0].id === category.id
                            ? 'bg-green-400'
                            : 'bg-white'
                    } hover:bg-green-400`}
                    type="button"
                    key={category.name}
                    onClick={() => setMetrics(category.id)}
                >
                    <i>
                        <IconElement />
                    </i>
                    <h2 className="text-2xl font-normal">{category.name}</h2>
                </button>
            )
        })

        return categories
    }

    function showActiveMetrics() {
        const filteredMetrics = metrics.filter(
            (metric) => metric.categoryId === activeCategory[0].id
        )

        const activeMetrics = filteredMetrics.map((metric) => {
            return <MetricCard key={metric.id} metric={metric} />
        })

        return activeMetrics
    }

    return (
        <>
            <HeaderNav />
            <main>
                <SettingsMenuContainer>
                    <SettingsMenuSection>
                        {showCategories()}
                    </SettingsMenuSection>
                    {metricsView && (
                        <SettingsContentField>
                            {showActiveMetrics()}
                        </SettingsContentField>
                    )}
                </SettingsMenuContainer>
            </main>
        </>
    )
}

export default Settings
