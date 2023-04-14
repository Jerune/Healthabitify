/* eslint-disable no-await-in-loop */
import getMonthlyYearlyAverages from '../../firebase/firestore/averages/getMonthlyYearlyAverages'
import getWeeklyAverages from '../../firebase/firestore/averages/getWeeklyAverages'
import { getDateTimeDateFromDateString } from '../../utils/getDateTimeData'

async function buildAverages(lastUpdated: string) {
    const availableDatesInAverages = {}

    const lastUpdatedDate = getDateTimeDateFromDateString(lastUpdated)
    const sameDayLastWeek = lastUpdatedDate.minus({ weeks: 1 })
    const sameDayLastMonth = lastUpdatedDate.minus({ month: 1 })

    let latestWeekNumber = sameDayLastWeek.weekNumber
    let latestMonth = sameDayLastMonth.month
    let currentYear = sameDayLastWeek.year

    // Get all averages from months and weeks for a certain year
    // To-Do enlarge to all years
    while (currentYear > 2022) {
        availableDatesInAverages[`Y${currentYear}`] = {
            year: {},
            months: {},
            weeks: {},
        }
        while (latestMonth > 0) {
            const average = await getMonthlyYearlyAverages(
                currentYear,
                latestMonth
            )
            if (average !== 'error') {
                availableDatesInAverages[`Y${currentYear}`].months[
                    `M${latestMonth}`
                ] = average
                latestMonth -= 1
            } else {
                break
            }
        }
        while (latestWeekNumber > 0) {
            const average = await getWeeklyAverages(
                currentYear,
                latestWeekNumber
            )
            if (average !== 'error') {
                availableDatesInAverages[`Y${currentYear}`].weeks[
                    `W${latestWeekNumber}`
                ] = average
                latestWeekNumber -= 1
            } else {
                break
            }
        }
        const average = await getMonthlyYearlyAverages(currentYear)
        if (average !== 'error') {
            availableDatesInAverages[`Y${currentYear}`].year = average
        } else {
            break
        }
        currentYear -= 1
        latestMonth = 12
        latestWeekNumber = 52
    }

    return availableDatesInAverages
}

export default buildAverages
