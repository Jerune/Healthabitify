import { AveragesReturn, Metric } from '../../types'
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
        default:
            rows = getWeeklyRowData(metrics, allAverages)
            break
    }

    return rows
}

export default buildRows
