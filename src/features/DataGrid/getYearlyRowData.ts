import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'

function getYearlyRowData(activeMetrics, allAverages) {
    const rows = []

    const years = Object.keys(allAverages)
    years.forEach((year) => {
        const yearNumber = Number(year.split('Y')[1])
        const dateTitle = `Year ${yearNumber}`
        // Setting default row data
        const row = {
            id: yearNumber,
            date: dateTitle,
        }
        // Retrieving average data from every metric for that month
        activeMetrics.forEach((metric) => {
            const metricId = kebabcaseToCamelcase(metric.id)
            const metricAverageValueThisYear = allAverages[year].year[metricId]
            row[metricId] = adjustValueOutput(
                metric,
                metricAverageValueThisYear
            )
            if (years.includes(`Y${yearNumber - 1}`)) {
                const metricAverageValueLastmonth =
                    allAverages[`Y${yearNumber - 1}`].year[metricId]
                row[`prev${metricId}`] = adjustValueOutput(
                    metric,
                    metricAverageValueLastmonth
                )
            }
        })

        rows.push(row)
    })
    return rows
}

export default getYearlyRowData
