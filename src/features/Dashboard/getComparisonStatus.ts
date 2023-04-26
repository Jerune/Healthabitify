import { DashboardMetric } from './DashboardTypes'

function getComparisonStatus(metric: DashboardMetric) {
    const { conditionsMode, good, bad, value, comparisonValue } = metric
    const dataForCurrentPeriod = value
    const dataForPreviousPeriod = comparisonValue

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
        if (dataForCurrentPeriod > good.value) {
            return 'good'
        }
        if (dataForCurrentPeriod < bad.value) {
            return 'bad'
        }
        return 'medium'
    }
    if (conditionsMode === 'range' && good.mode === 'less') {
        if (dataForCurrentPeriod < good.value) {
            return 'good'
        }
        if (dataForCurrentPeriod > bad.value) {
            return 'bad'
        }
        return 'medium'
    }
    return 'error'
}

export default getComparisonStatus
