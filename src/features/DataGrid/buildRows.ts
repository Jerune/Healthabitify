import { Metric } from '../../types'
import { Averages } from '../_types'
import getMonthlyRowData from './getMonthlyRowData'
import getWeeklyRowData from './getWeeklyRowData'
import getYearlyRowData from './getYearlyRowData'

function buildRows(
    metrics: Metric[],
    activeTimeView: string,
    allAverages: Averages[]
) {
    let rows = []

    switch (activeTimeView) {
        case 'week':
            rows = getWeeklyRowData(metrics, allAverages)
            break
        case 'month':
            rows = getMonthlyRowData(metrics, allAverages)
            break
        case 'year':
            rows = getYearlyRowData(metrics, allAverages)
            break
        default:
            rows = getWeeklyRowData(metrics, allAverages)
            break
    }

    return rows
}

export default buildRows
