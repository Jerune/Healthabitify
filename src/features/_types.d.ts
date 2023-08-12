// AveragesManagement

export type PeriodForAverage = {
    year: number
    weekNumber: number
    month: number
}

export type AveragesData = {
    [year: string]: {
        months: { [month: string]: DocumentData | string }
        weeks: { [week: string]: DocumentData | string }
        year?: DocumentData | string
    }
}

export type SleepAverages = {
    [key: string]: number | string
    AmountOfDeepSleep: number
    AmountOfRemSleep: number
    AmountOfSleep: number
}
