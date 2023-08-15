import metricsInMilliseconds from '../../data/metrics/metricsInMilliseconds'
import convertMillisecondsToTime from '../../utils/convertMillisecondsToTime'
import forceNumberReturn from '../../utils/forceNumberReturn'
import { DashboardMetric } from '../_types'

function getComparisonStatus(metric: DashboardMetric) {
    const { conditionsMode, good, bad, value, comparisonValue } = metric

    let dataForCurrentPeriod = forceNumberReturn(value)
    let dataForPreviousPeriod = forceNumberReturn(comparisonValue)
    const goodValue = forceNumberReturn(good.value)
    const badValue = forceNumberReturn(bad.value)

    // Change to hours format instead of Milliseconds
    if (metricsInMilliseconds.includes(metric.id)) {
        const convertedDataForCurrentPeriodAsString =
            convertMillisecondsToTime(dataForCurrentPeriod)
        dataForCurrentPeriod = forceNumberReturn(
            convertedDataForCurrentPeriodAsString
        )
        const convertedDataForPreviousPeriodAsString =
            convertMillisecondsToTime(dataForPreviousPeriod)
        dataForPreviousPeriod = forceNumberReturn(
            convertedDataForPreviousPeriodAsString
        )
    }

    if (conditionsMode === 'higher') {
        if (dataForCurrentPeriod > dataForPreviousPeriod) {
            return 'good'
        }
        if (dataForCurrentPeriod === dataForPreviousPeriod) {
            return 'medium'
        }
        return 'bad'
    }
    if (conditionsMode === 'lower') {
        if (dataForCurrentPeriod < dataForPreviousPeriod) {
            return 'good'
        }
        if (dataForCurrentPeriod === dataForPreviousPeriod) {
            return 'medium'
        }
        return 'bad'
    }
    if (conditionsMode === 'range' && good.mode === 'more') {
        if (dataForCurrentPeriod > goodValue) {
            return 'good'
        }
        if (dataForCurrentPeriod < badValue) {
            return 'bad'
        }
        return 'medium'
    }
    if (conditionsMode === 'range' && good.mode === 'less') {
        if (dataForCurrentPeriod < goodValue) {
            return 'good'
        }
        if (dataForCurrentPeriod > badValue) {
            return 'bad'
        }
        return 'medium'
    }
    return 'error'
}

export default getComparisonStatus
