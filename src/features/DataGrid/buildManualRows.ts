function buildManualRows(datapoints, dates: string[]) {
    const rows = []

    datapoints.forEach((metricObject, index: number) => {
        const keys = Object.keys(metricObject)
        const metricId = keys[0]
        const weeklyData = metricObject[metricId]

        const metricName = keys[0].split(/(?=[A-Z])/).join(' ')
        const { type } = metricObject

        const row = {
            metric: metricName,
            id: index.toString(),
            cells: {},
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

    const sortedRows = rows.sort((a, b) => a.id - b.id)
    return sortedRows
}

export default buildManualRows
