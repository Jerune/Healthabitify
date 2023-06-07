function buildManualRows(datapoints, dates: string[]) {
    const rows = []


    datapoints.forEach((metric) => {
        const row = {
            metric,
        }

        metric.forEach((dataObject) => {
            const {date} = dataObject

            const {id, value} = dataObject

            row[id] = 
        } )
    })
}

export default buildManualRows