/* eslint-disable no-await-in-loop */
import getMonthlyYearlyAverages from '../../firebase/firestore/averages/getMonthlyYearlyAverages'
import getWeeklyAverages from '../../firebase/firestore/averages/getWeeklyAverages'
import { getDateTimeDateFromDateString } from '../../utils/getDateTimeData'

async function buildAverages({ weekNumber, month, year }) {
    const availableDatesInAverages = {}

    let latestWeekNumber = weekNumber
    let latestMonth = month
    let currentYear = year

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
            }
            latestMonth -= 1
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
            }
            latestWeekNumber -= 1
        }
        const average = await getMonthlyYearlyAverages(currentYear)
        if (average !== 'error') {
            availableDatesInAverages[`Y${currentYear}`].year = average
        }
        currentYear -= 1
        latestMonth = 12
        latestWeekNumber = 52
    }

    return availableDatesInAverages
}

export default buildAverages
