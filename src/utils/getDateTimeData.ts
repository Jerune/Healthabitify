import { DateTime } from 'luxon'

export function getDateTimeDataForDatapoints(date: string) {
    const currentDate = DateTime.fromISO(date)
    const { month, weekNumber, year } = currentDate

    return { month, weekNumber, year }
}

export function getDateTimeDateFromDateString(date: string) {
    const currentDate = DateTime.fromISO(date)

    return currentDate
}
