import { DataPoint, DatapointsForDataGrid, Row } from '../_types'

function buildManualRows(datapoints: DatapointsForDataGrid, dates: string[]) {
    const rows: Row[] = []

    Object.entries(datapoints).forEach(([metricId, metricObject], index) => {
        const { data, reference } = metricObject
        const metricName = metricId.split(/(?=[A-Z])/).join(' ')

        const initialRow: Row = {
            metric: metricName,
            id: index.toString(),
            cells: {},
        }

        const row = { ...initialRow }

        if (reference) {
            row.reference = reference
        }

        dates.forEach((date) => {
            const weeklyData = data.find(
                (item: DataPoint) => item.date === date
            )
            if (weeklyData) {
                const cellId = weeklyData.id
                const cellValue = weeklyData.value.toString()

                row.cells = {}
                row.cells[date] = cellId
                row[date as keyof Row] = cellValue
            }
        })

        rows.push(row)
    })

    const sortedRows = rows.sort((a, b) => a.id.localeCompare(b.id))
    return sortedRows
}

export default buildManualRows
