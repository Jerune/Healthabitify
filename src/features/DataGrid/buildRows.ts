import { AveragesReturn, Metric } from '../../types'
import getMonthlyRowData from './getMonthlyRowData'
import getWeeklyRowData from './getWeeklyRowData'

function buildRows(
    metrics: Metric[],
    activeTimeView: string,
    allAverages: AveragesReturn
) {
    let rows = []

    switch (activeTimeView) {
        case 'week':
            rows = getWeeklyRowData(metrics, allAverages)
            break
        case 'month':
            rows = getMonthlyRowData(metrics, allAverages)
            break
        default:
            rows = getWeeklyRowData(metrics, allAverages)
            break
    }

    return rows
}

export default buildRows
