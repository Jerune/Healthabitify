import { DateTime } from 'luxon'

export type TabListProps = {
    tabs?: {
        name: string
        function: () => void
    }[]
}

export type DateTimeData = {
    currentDate: DateTime
    weekNumber: number
    month: number
    year: number
    firstDayOfTheWeek: DateTime
    lastDayOfTheWeek: DateTime
}

export type DataTitles = {
    week: string
    month: string
    year: string
}
