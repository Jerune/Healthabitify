// FireBase

// UserData from Auth
export type SignInData = {
    email: string | null
    userId: string | null
    errorMessage: string | null
}

// Events
export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type SelectEvent = ChangeEventHandler<HTMLSelectElement>
export type FormSubmit = FormEvent<HTMLFormElement>

export type User = {
    userId: string
    displayName: string
    email: string
}

export type Category = {
    order: number
    id: string
    name: string
    iconName: string | unknown
}

export type Wearable = {
    id: string
    userId: string
    token: string
    lastUpdated: string
}

export type Metric = {
    order: number
    id: string
    name: string
    active: boolean
    onDashboard: boolean
    source: string
    dataType: string
    unit: string
    categoryId: string
    categoryIcon: string
    isFixed: boolean
    frequency: string
    goal: string
    conditionsMode: string
    good: {
        mode: string
        value: string
    }
    medium: {
        value1: string
        value2: string
    }
    bad: {
        mode: string
        value: string
    }
}

export type MetricProps = {
    metric: Metric
}

export type DataPoint = {
    value: string | number
    metric: string
    userId: string
    source: string
    date: string
    weekNumber: number
    month: number
    year: number
}

// Fitbit Data

export type FitbitData = {
    dateTime: string
    value: string
}

export type FitbitRawData = {
    [key: string]: FitbitData[]
}
