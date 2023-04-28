import convertMillisecondsToTime from '../../utils/convertMillisecondsToTime'
import getStringDataAsNumber from '../../utils/getStringDataAsNumber'
import { DashboardMetric } from './DashboardTypes'

function getComparisonStatus(metric: DashboardMetric) {
    const { conditionsMode, good, bad, value, comparisonValue } = metric
    const sleepMetricIdsWithMilliseconds = [
        'amount-of-deep-sleep',
        'amount-of-rem-sleep',
        'amount-of-sleep',
        'total-beneficial-sleep',
    ]

    let dataForCurrentPeriod =
        typeof value === 'number' ? value : getStringDataAsNumber(value)
    let dataForPreviousPeriod =
        typeof comparisonValue === 'number'
            ? comparisonValue
            : getStringDataAsNumber(comparisonValue)
    const goodValue =
        typeof good.value === 'number'
            ? good.value
            : getStringDataAsNumber(good.value)
    const badValue =
        typeof bad.value === 'number'
            ? bad.value
            : getStringDataAsNumber(bad.value)

    // Change to hours format instead of Milliseconds
    if (sleepMetricIdsWithMilliseconds.includes(metric.id)) {
        const convertedDataForCurrentPeriodAsString =
            convertMillisecondsToTime(dataForCurrentPeriod)
        dataForCurrentPeriod = getStringDataAsNumber(
            convertedDataForCurrentPeriodAsString
        )
        const convertedDataForPreviousPeriodAsString =
            convertMillisecondsToTime(dataForPreviousPeriod)
        dataForPreviousPeriod = getStringDataAsNumber(
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
