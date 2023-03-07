import { useState } from 'react'
import * as Icons from 'react-icons/ri'
import { useAppSelector } from '../redux/reduxHooks'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricCard from '../features/SettingsMenu/MetricCard'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import categoriesList from '../data/categories'
import MainContent from '../components/MainContent'
import Wearables from '../features/SettingsMenu/Wearables'

function Settings() {
    const metrics = useAppSelector((state) => state.metrics)
    const [metricsView, setMetricsView] = useState(false)
    const [activeCategory, setActiveCategory] = useState([
        { id: '', name: '', iconName: '' },
    ])

    async function setMetrics(categoryId: string) {
        const activeCat = categoriesList.filter(
            (category) => category.id === categoryId
        )
        setActiveCategory(activeCat)
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

        const sortedMetrics = filteredMetrics.sort((a, b) => {
            if (a.active > b.active) return -1
            if (a.active < b.active) return 1

            if (a.onDashboard > b.onDashboard) return -1
            if (a.onDashboard < b.onDashboard) return 1

            if (a.order < b.order) return -1
            if (a.order > b.order) return 1

            return 0
        })

        const activeMetrics = sortedMetrics.map((metric) => {
            return <MetricCard key={metric.id} metric={metric} />
        })

        return activeMetrics
    }

    return (
        <MainContent>
            <SettingsMenuContainer>
                <SettingsMenuSection>
                    <Wearables />
                    {showCategories()}
                </SettingsMenuSection>
                {metricsView && (
                    <SettingsContentField>
                        {showActiveMetrics()}
                    </SettingsContentField>
                )}
            </SettingsMenuContainer>
        </MainContent>
    )
}

export default Settings
