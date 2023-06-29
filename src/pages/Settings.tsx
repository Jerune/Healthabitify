/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { useAppSelector } from '../redux/reduxHooks'
import SettingsMenuContainer from '../features/SettingsMenu/SettingsMenuContainer'
import SettingsContentField from '../features/SettingsMenu/SettingsContentField'
import SettingsMenuSection from '../features/SettingsMenu/SettingsMenuSection'
import categoriesList from '../data/categories'
import MainContent from '../components/MainContent'
import SettingsViewSelection from '../features/SettingsMenu/SettingsViewSelection'
import SettingsMenuCategories from '../features/SettingsMenu/SettingsMenuCategories'
import ActiveMetrics from '../features/SettingsMenu/ActiveMetrics'
import WearableCard from '../features/SettingsMenu/WearableCard'
import wearablesCategories from '../data/wearablesCategories'

function Settings() {
    const metrics = useAppSelector((state) => state.metrics)
    const [detailView, setDetailView] = useState('none')
    const emptyCategory = {
        id: '',
        name: '',
        iconName: '',
    }
    const [activeCategory, setActiveCategory] = useState(emptyCategory)

    async function setMetrics(categoryId: string) {
        const activeCat = categoriesList.filter(
            (category) => category.id === categoryId
        )[0]
        setActiveCategory(activeCat)
        setDetailView('metrics')
    }

    async function setWearables(categoryId: string) {
        const activeCat = wearablesCategories.filter(
            (category) => category.id === categoryId
        )[0]
        setActiveCategory(activeCat)
        setDetailView('wearables')
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
                        onClick={() => {
                            setActiveCategory(emptyCategory)
                            setDetailView('none')
                        }}
                    >
                        &larr; Back to overview
                    </button>
                    <SettingsMenuContainer>
                        <SettingsMenuSection>
                            <SettingsMenuCategories
                                detailView={detailView}
                                setMetrics={setMetrics}
                                setWearables={setWearables}
                                activeCategory={activeCategory}
                            />
                        </SettingsMenuSection>
                        <SettingsContentField>
                            {detailView === 'metrics' ? (
                                <ActiveMetrics
                                    metrics={metrics}
                                    activeCategory={activeCategory}
                                />
                            ) : (
                                <WearableCard activeCategory={activeCategory} />
                            )}
                        </SettingsContentField>
                    </SettingsMenuContainer>
                </>
            )}
        </MainContent>
    )
}

export default Settings
