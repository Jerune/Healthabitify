import { DataPoint, DatapointsForDataGrid, Row } from '../_types'

function buildManualRows(datapoints: DatapointsForDataGrid[], dates: string[]) {
    const rows: Row[] = []

    datapoints.forEach((metricObject, index: number) => {
        const keys = Object.keys(metricObject)
        const metricId = keys[0]
        const weeklyData = metricObject[metricId]
        const { reference } = weeklyData
        const metricName = keys[0].split(/(?=[A-Z])/).join(' ')
        console.log(metricObject, weeklyData)

        const row: Row = {
            metric: metricName,
            id: index.toString(),
            cells: {},
        }

        if (reference) {
            row.reference = reference
        }

        dates.forEach((date) => {
            for (let i = 0; i < weeklyData.length; i += 1) {
                if (weeklyData[i].date === date) {
                    const cellId = weeklyData[i].id
                    const cell = {
                        id: cellId,
                        date,
                        value: weeklyData[i].value,
                    }
                    row[date] = cell.value
                    row.cells[date] = cellId
                }
            }
        })

        rows.push(row)
    })

    const sortedRows = rows.sort((a, b) => Number(a.id) - Number(b.id))
    return sortedRows
}

export default buildManualRows
