declare module '../services/firebase'

export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type FormSubmit = FormEvent<HTMLFormElement>

export type User = {
    id: string
    firstName: string
    email: string
    password: string
}

export type Category = {
    id: string
    name: string
    iconName: string | unknown
}

type Range = [string, number] | [number, number]
export type Metric = {
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

export type DataPoint = {
    id: string
    value: number | Date
    metricId: string
    userId: string
    date: Date
    week: number
    month: number
    year: number
}
