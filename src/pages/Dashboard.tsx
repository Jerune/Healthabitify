import { useEffect, useState } from 'react'
import MainContent from '../components/MainContent'
import TimeSelectionModule from '../features/TimesDatesModule/TimeSelectionModule'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
// import dashboardmetrics from '../data/dashboardmetricsMock'
import { useAppSelector } from '../redux/reduxHooks'
import kebabcaseToCamelcase from '../utils/kebabcaseToCamelcase'
import getComparisonStatus from '../features/Dashboard/getComparisonStatus'
import Loading from '../components/Loading'

function Dashboard() {
    const allMetrics = useAppSelector((state) => state.metrics)
    const allAverages = useAppSelector((state) => state.averages)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )
    const activeTimeView = useAppSelector((state) => state.utils.activeTimeView)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const dashboardMetrics = allMetrics.filter((metric) => metric.onDashboard)

    if (isLoading) {
        return <Loading size={50} />
    }

    const dashboardBlocks = dashboardMetrics.map((metric) => {
        const dbMetricId = kebabcaseToCamelcase(metric.id)
        const { weekNumber, month, year } = currentDateTime
        const comparisonData = {
            value: 0,
            comparisonValue: 0,
            comparisonStatus: '',
            comparisonType: '',
        }
        if (activeTimeView === 'week') {
            comparisonData.comparisonType = 'week'
            if (allAverages[`Y${year}`].weeks[`W${weekNumber}`]) {
                comparisonData.value =
                    allAverages[`Y${year}`].weeks[`W${weekNumber}`][dbMetricId]
                if (allAverages[`Y${year}`].weeks[`W${weekNumber - 1}`]) {
                    comparisonData.comparisonValue =
                        allAverages[`Y${year}`].weeks[`W${weekNumber - 1}`][
                            dbMetricId
                        ]
                } else {
                    comparisonData.comparisonValue =
                        allAverages[`Y${year - 1}`].weeks.W52[dbMetricId]
                }
            }
        } else if (activeTimeView === 'month') {
            comparisonData.comparisonType = 'month'
            if (allAverages[`Y${year}`].months[`M${month}`]) {
                comparisonData.value =
                    allAverages[`Y${year}`].months[`M${month}`][dbMetricId]
                if (allAverages[`Y${year}`].months[`M${month - 1}`]) {
                    comparisonData.comparisonValue =
                        allAverages[`Y${year}`].months[`M${month - 1}`][
                            dbMetricId
                        ]
                } else {
                    comparisonData.comparisonValue =
                        allAverages[`Y${year - 1}`].months.M12[dbMetricId]
                }
            }
        } else if (activeTimeView === 'year') {
            comparisonData.comparisonType = 'year'
            if (allAverages[`Y${year}`] && allAverages[`Y${year}`].year) {
                comparisonData.value = allAverages[`Y${year}`].year[dbMetricId]
                if (allAverages[`Y${year - 1}`]) {
                    comparisonData.comparisonValue =
                        allAverages[`Y${year - 1}`].year[dbMetricId]
                } else {
                    comparisonData.comparisonValue = 0
                }
            }
        }
        const metricWithComparisonData = { ...metric, ...comparisonData }
        metricWithComparisonData.comparisonStatus = getComparisonStatus(
            metricWithComparisonData
        )

        return (
            <DashBoardMetricBlock
                metric={metricWithComparisonData}
                key={metric.name}
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
