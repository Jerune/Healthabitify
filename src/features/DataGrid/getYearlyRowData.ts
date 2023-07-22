import metricsWithZeroValues from '../../data/data-grid/metricsWithZeroValues'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'

function getYearlyRowData(activeMetrics, allAverages) {
    const rows = []

    const years = Object.keys(allAverages)
    // Remove current year from list
    years.shift()
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
            if (
                yearNumber < 2021 &&
                metricsWithZeroValues.includes(metric.id)
            ) {
                // Don't create data from metrics without zero values
            } else {
                const metricId = kebabcaseToCamelcase(metric.id)
                if (allAverages[year].year) {
                    const metricAverageValueThisYear =
                        allAverages[year].year[metricId]
                    row[metricId] = adjustValueOutput(
                        metric,
                        metricAverageValueThisYear
                    )
                }

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
            }
        })

        rows.push(row)
    })
    return rows
}

export default getYearlyRowData
