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
    decimals?: number
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

// Oura Data

export type ReadinessContributors = {
    contributors: {
        activity_balance: number
        body_temperature: number
        hrv_balance: number
        previous_day_activity: number
        previous_night: number
        recovery_index: number
        resting_heart_rate: number
        sleep_balance: number
    }
    score: number
    temperature_deviation: number
    temperature_trend_deviation: number
}

export type OuraDailySummary = {
    id: string
    average_breath: number
    average_heart_rate: number
    average_hrv: number
    awake_time: number
    bedtime_end: string
    bedtime_start: string
    day: string
    deep_sleep_duration: number
    efficiency: number
    heart_rate: {
        interval: number
        items: null | number[]
        timestamp: string
    }
    hrv: {
        interval: number
        items: null | number[]
        timestamp: string
    }
    latency: number
    light_sleep_duration: number
    low_battery_alert: boolean
    lowest_heart_rate: number
    movement_30_sec: number
    period: number
    readiness: null
    readiness_score_delta: null | ReadinessContributors
    rem_sleep_duration: number
    restless_periods: number
    sleep_phase_5_min: number
    sleep_score_delta: null | number
    time_in_bed: number
    total_sleep_duration: number
    type: string
}

export type OuraRawData = [
    {
        data: OuraDailySummary[]
        next_token: null | string
    }
]

// getApiData

export type Endpoint = {
    url: string
}

export type EndpointsDates = {
    start: string
    end: string
}

// getDatapointsByDates

export type Period = {
    year: number
    month?: number
    weekNumber?: number
}

// calculateNewAveragesForPeriod

export type DataValuesPerMetric = {
    [key]: number[] | string[]
    type: string
}

export type PeriodData = {
    period: string
    data: DataValuesPerMetric[]
}

export type Average = {
    [key]: number
}

export type MetricValues = {
    name: string
    values: number[]
}

export type AveragesReturn = {
    period: string
    keys: Average[]
}
