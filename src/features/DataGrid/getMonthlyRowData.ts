import { DateTime } from 'luxon'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'
import metricsWithZeroValues from '../../data/data-grid/metricsWithZeroValues'

function getMonthlyRowData(activeMetrics, allAverages) {
    const rows = []

    const years = Object.keys(allAverages)
    years.forEach((year) => {
        const activeYear = Number(year.split('Y')[1])
        const months = Object.keys(allAverages[year].months)
        months.forEach((month) => {
            const monthNumber = Number(month.split('M')[1])
            const monthName = DateTime.fromISO(
                `${activeYear}-${String(monthNumber).padStart(2, '0')}-01`
            ).toFormat('MMMM')
            const dateTitle = `${monthName} ${activeYear}`

            // Setting default row data
            const row = {
                year: activeYear,
                month: monthNumber,
                id: `${activeYear}-${monthNumber}`,
                date: dateTitle,
            }
            // Retrieving average data from every metric for that month
            activeMetrics.forEach((metric) => {
                let yearString = year
                const metricId = kebabcaseToCamelcase(metric.id)
                const metricAverageValueThismonth =
                    allAverages[yearString].months[month][metricId]
                row[metricId] = adjustValueOutput(
                    metric,
                    metricAverageValueThismonth
                )
                // Verify if previousMonth is December and
                // changing year and month if this is the case
                let previousMonth = monthNumber - 1
                let metricAverageValuePreviousPeriod = 0
                let availableMonths = months
                if (previousMonth === 0) {
                    yearString = `Y${activeYear - 1}`
                    // Verify if previous year is available
                    if (allAverages[yearString]) {
                        // Gathering months from prvious year
                        availableMonths = Object.keys(
                            allAverages[yearString].months
                        )
                        previousMonth = 12
                    }
                }
                // Look for last real value to compare with
                while (availableMonths.includes(`M${previousMonth}`)) {
                    metricAverageValuePreviousPeriod =
                        allAverages[yearString].months[`M${previousMonth}`][
                            metricId
                        ]
                    // Passes 0 values if for a metric where 0 values should be ignored
                    if (
                        metricAverageValuePreviousPeriod === 0 &&
                        !metricsWithZeroValues.includes(metric.id)
                    ) {
                        previousMonth -= 1
                        // Writes prev comparison data whenever last real value is found
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
    })

    const sortedRows = rows.sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year // Sort by year in descending order
        }
        return b.month - a.month // Sort by month in descending order within the same year
    })
    return sortedRows
}

export default getMonthlyRowData
