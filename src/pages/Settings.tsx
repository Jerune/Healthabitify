/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { useAppSelector } from '../redux/reduxHooks'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import MetricCard from '../features/SettingsMenu/MetricCard'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import categoriesList from '../data/categories'
import MainContent from '../components/MainContent'
import Wearables from '../features/SettingsMenu/Wearables'
import wearablesCategories from '../data/wearablesCategories'
import SettingsViewSelection from '../features/SettingsMenu/SettingsViewSelection'
import SettingsMenuCategories from '../features/SettingsMenu/SettingsMenuCategories'

function Settings() {
    const metrics = useAppSelector((state) => state.metrics)
    const [detailView, setDetailView] = useState('none')
    const [activeCategory, setActiveCategory] = useState({
        id: '',
        name: '',
        iconName: '',
    })

    async function setMetrics(categoryId: string) {
        const activeCat = categoriesList.filter(
            (category) => category.id === categoryId
        )[0]
        setActiveCategory(activeCat)
        setDetailView('metrics')
    }

    function showActiveMetrics() {
        const filteredMetrics = metrics.filter(
            (metric) => metric.categoryId === activeCategory.id
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

    function showWearables() {
        return <Wearables />
    }

    return (
        <MainContent>
            {detailView === 'none' && (
                <SettingsViewSelection setDetailView={setDetailView} />
            )}
            {detailView !== 'none' && (
                <>
                    <button
                        type="button"
                        className="pl-6 pt-2"
                        onClick={() => setDetailView('none')}
                    >
                        &larr; Back to overview
                    </button>
                    <SettingsMenuContainer>
                        <SettingsMenuSection>
                            <SettingsMenuCategories
                                detailView={detailView}
                                setMetrics={setMetrics}
                                activeCategory={activeCategory}
                            />
                        </SettingsMenuSection>
                        <SettingsContentField>
                            {detailView === 'metrics'
                                ? showActiveMetrics()
                                : showWearables()}
                        </SettingsContentField>
                    </SettingsMenuContainer>
                </>
            )}
        </MainContent>
    )
}

export default Settings
