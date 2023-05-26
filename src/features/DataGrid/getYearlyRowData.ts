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
            let activeYear = yearNumber - 1
            let metricAverageValuePreviousPeriod = 0
            while (years.includes(`Y${activeYear}`)) {
                metricAverageValuePreviousPeriod =
                    allAverages[`Y${yearNumber - 1}`].year[metricId]
                if (metricAverageValuePreviousPeriod === 0) {
                    activeYear -= 1
                } else {
                    row[`prev${metricId}`] = adjustValueOutput(
                        metric,
                        metricAverageValuePreviousPeriod
                    )
                    break
                }
            }
        })

        rows.push(row)
    })
    return rows
}

export default getYearlyRowData
