import { DateTime } from 'luxon'

function getDateTimeDataForDatapoints(date: string) {
    const currentDate = DateTime.fromISO(date)
    const { month, weekNumber, year } = currentDate

    return { month, weekNumber, year }
}

function getDateTimeDateFromDateString(date: string) {
    const currentDate = DateTime.fromISO(date)

    return currentDate
}

export { getDateTimeDateFromDateString, getDateTimeDataForDatapoints }
