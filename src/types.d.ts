export interface Category {
    id: string
    name: string
    iconName: string | unknown
}

type Range = [string, number] | [number, number]
export interface Metric {
    id: string
    name: string
    categoryId: string
    active: boolean
    type: 'Fixed' | 'Manual'
    frequency: 'Day' | 'Week'
    conditionsMode: 'Higher' | 'Lower'
    hasCustomRange: boolean
    range?: {
        good: Range
        medium: Range
        bad: Range
    }
}

export interface Day {
    id: string
    date: Date
    week: number
    month: number
    year: number
}

export interface DataPoint {
    id: string
    value: number | Date
    metricId: string
    dayId: string
}
