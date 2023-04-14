import { useEffect, useState } from 'react'
import MainContent from '../components/MainContent'
import TimeSelectionModule from '../features/TimesDatesModule/TimeSelectionModule'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
// import dashboardItems from '../data/dashboardItemsMock'
import { useAppSelector } from '../redux/reduxHooks'
import kebabcaseToCamelcase from '../utils/kebabcaseToCamelcase'

function Dashboard() {
    const allMetrics = useAppSelector((state) => state.metrics)
    const allAverages = useAppSelector((state) => state.averages)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )
    const activeTimeView = useAppSelector((state) => state.utils.activeTimeView)

    if (isLoading) {
        return <div>Loading...</div>
    }

    const dashboardMetrics = allMetrics.filter((metric) => metric.onDashboard)
    const dashboardBlocks = dashboardMetrics.map((item) => {
        const dbMetricId = kebabcaseToCamelcase(item.id)
        const { weekNumber, month, year } = currentDateTime
        const comparisonData = {
            value: 0,
            comparisonValue: 0,
            comparisonStatus: '',
            comparisonType: '',
        }
        if (activeTimeView === 'week') {
            comparisonData.comparisonType = 'week'
            comparisonData.value =
                allAverages[`Y${year}`].weeks[`W${weekNumber}`][dbMetricId]
            comparisonData.comparisonValue =
                allAverages[`Y${year}`].weeks[`W${weekNumber - 1}`][dbMetricId]
            comparisonData.comparisonStatus = 'good'
        } else if (activeTimeView === 'month') {
            comparisonData.comparisonType = 'month'
            comparisonData.value =
                allAverages[`Y${year}`].months[`M${month}`][dbMetricId]
            comparisonData.comparisonValue =
                allAverages[`Y${year}`].months[`M${month - 1}`][dbMetricId]
            comparisonData.comparisonStatus = 'good'
        } else if (activeTimeView === 'year') {
            comparisonData.comparisonType = 'year'
            comparisonData.value = allAverages[`Y${year}`].year[dbMetricId]
            comparisonData.comparisonValue =
                allAverages[`Y${year - 1}`].year[dbMetricId]
            comparisonData.comparisonStatus = 'good'
        }

        const itemWithComparisonData = { ...item, ...comparisonData }
        console.log(itemWithComparisonData)

        return (
            <DashBoardMetricBlock
                metric={itemWithComparisonData}
                key={item.name}
            />
        )
    })

    return (
        <>
            <TimeSelectionModule tabs={Tabs} />
            <MainContent>
                <DashBoardContainer>{dashboardBlocks}</DashBoardContainer>
            </MainContent>
        </>
    )
}

export default Dashboard
