import { DateTime } from 'luxon'

export default function getDateTimeDataForDatapoints(date: string) {
    const dateTime = DateTime.fromISO(date)
    const { month, weekNumber, year } = dateTime

    return { month, weekNumber, year }
}
