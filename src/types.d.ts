// User Data from FireBase
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

export type Metric = {
    metric: {
        id: string
        name: string
        active: boolean
        onDashboard: boolean
        source: string
        dataType: string
        categoryId: string
        categoryIcon: string
        isFixed: boolean
        frequency: string
        goal: string
        conditionsMode: string
        range: {
            good: {
                mode: string | undefined
                value: number | undefined
            }
            medium: {
                value1: number | undefined
                value2: number | undefined
            }
            bad: {
                mode: string | undefined
                value: number | undefined
            }
        }
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

export type TabListProps = {
    tabs: {
        name: string
        function: () => void
    }[]
}
