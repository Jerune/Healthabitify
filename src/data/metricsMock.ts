const metricItems = [
    {
        order: 1,
        id: 'weight',
        name: 'Weight',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'kg',
        source: 'manual',
        categoryId: 'body',
        categoryIcon: 'RiBodyScanFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'body-fat',
        name: 'Body Fat',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '%',
        source: 'manual',
        categoryId: 'body',
        categoryIcon: 'RiBodyScanFill',
        isFixed: true,
        frequency: 'weekly',
        goal: 'Stay under 20%',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 3,
        id: 'bmi',
        name: 'BMI',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '',
        source: 'manual',
        categoryId: 'body',
        categoryIcon: 'RiBodyScanFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 1,
        id: 'amount-of-sleep',
        name: 'Amount of Sleep',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'hrs',
        source: 'oura',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'daily',
        goal: 'Sleep average of 7 hours',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '07:00',
        },
        medium: {
            value1: '06:30',
            value2: '07:00',
        },
        bad: {
            mode: 'less',
            value: '06:30',
        },
    },
    {
        order: 2,
        id: 'amount-of-rem-sleep',
        name: 'Amount of REM Sleep',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'hrs',
        source: 'oura',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 3,
        id: 'amount-of-deep-sleep',
        name: 'Amount of Deep Sleep',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'hrs',
        source: 'oura',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 4,
        id: 'total-beneficial-sleep',
        name: 'Amount of Beneficial Sleep',
        active: true,
        onDashboard: true,
        dataType: 'duration',
        unit: 'hrs',
        source: 'auto',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 5,
        id: 'average-time-to-bed',
        name: 'Average Time to Bed',
        active: true,
        onDashboard: true,
        dataType: 'time',
        unit: 'min',
        source: 'oura',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 6,
        id: 'average-wake-up',
        name: 'Average Wake Up',
        active: true,
        onDashboard: true,
        dataType: 'time',
        unit: 'min',
        source: 'oura',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 7,
        id: 'sleep-coificient',
        name: 'Sleep Coificient',
        active: true,
        onDashboard: false,
        dataType: 'amount',
        unit: '%',
        source: 'auto',
        categoryId: 'sleep',
        categoryIcon: 'RiHotelBedFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 1,
        id: 'average-resting-heart-rate',
        name: 'Average Resting Heart Rate',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'bpm',
        source: 'oura',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'average-resting-hrv',
        name: 'Average Resting Heart Rate Variability',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'bpm',
        source: 'oura',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 3,
        id: 'blood-oxygen',
        name: 'Blood Oxygen',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '(SpO2) %',
        source: 'manual',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 4,
        id: 'respitory-rate',
        name: 'Respitory Rate',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'x/min',
        source: 'oura',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 5,
        id: 'blood-pressure-above',
        name: 'Blood Pressure Above',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'pressure',
        source: 'manual',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 6,
        id: 'blood-pressure-below',
        name: 'Blood Pressure Below',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'pressure',
        source: 'manual',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 7,
        id: 'visceral-fat',
        name: 'Visceral Fat',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '',
        source: 'manual',
        categoryId: 'vitals',
        categoryIcon: 'RiHeartPulseFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 1,
        id: 'average-fasting-window',
        name: 'Average Fasting Window',
        active: true,
        onDashboard: true,
        dataType: 'duration',
        unit: 'time',
        source: 'manual',
        categoryId: 'metabolism',
        categoryIcon: 'RiLungsFill',
        isFixed: true,
        frequency: 'daily',
        goal: 'At least 16h per day on average',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '16:00',
        },
        medium: {
            value1: '14:00',
            value2: '16:00',
        },
        bad: {
            mode: 'less',
            value: '14:00',
        },
    },
    {
        order: 2,
        id: 'basal-metabolic-rate',
        name: 'Basal Metabolic Rate',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'kcal/day',
        source: 'manual',
        categoryId: 'metabolism',
        categoryIcon: 'RiLungsFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 3,
        id: 'fasted-blood-sugar',
        name: 'Fasted Blood Sugar',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'mg/dL',
        source: 'manual',
        categoryId: 'metabolism',
        categoryIcon: 'RiLungsFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 4,
        id: 'fasted-keytones',
        name: 'Fasted Keytones',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '',
        source: 'manual',
        categoryId: 'metabolism',
        categoryIcon: 'RiLungsFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 1,
        id: 'daily-average-heart-rate',
        name: 'Daily Average Heart Rate',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'bpm',
        source: 'fitbit',
        categoryId: 'stress',
        categoryIcon: 'RiMentalHealthFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'stress-management-score',
        name: 'Stress Management Score',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '1-100',
        source: 'manual',
        categoryId: 'stress',
        categoryIcon: 'RiMentalHealthFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 1,
        id: 'total-average-calorie-burn',
        name: 'Total Average Calorie Burn',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'cal',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 2,
        id: 'steps',
        name: 'Steps',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: '',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 3,
        id: 'minutes-sedentary',
        name: 'Amount of Sedentary Minutes',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'min',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 4,
        id: 'fat-burn-zone',
        name: 'Amount of Minutes in Fat Burn Zone',
        active: true,
        onDashboard: true,
        dataType: 'total-amount',
        unit: 'min',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 5,
        id: 'cardio-zone',
        name: 'Amount of Minutes in Cardio Zone',
        active: true,
        onDashboard: true,
        dataType: 'total-amount',
        unit: 'min',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 6,
        id: 'peak-zone',
        name: 'Amount of Minutes in Peak Zone',
        active: true,
        onDashboard: true,
        dataType: 'total-amount',
        unit: 'min',
        source: 'fitbit',
        categoryId: 'activity',
        categoryIcon: 'RiRunFill',
        isFixed: true,
        frequency: 'daily',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 0,
    },
    {
        order: 1,
        id: 'smartphone-screen-time',
        name: 'Smartphone Screen Time',
        active: true,
        onDashboard: true,
        dataType: 'duration',
        unit: 'time',
        source: 'manual',
        categoryId: 'lifestyle',
        categoryIcon: 'RiMentalHealthFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '01:15',
        },
        medium: {
            value1: '01:15',
            value2: '01:45',
        },
        bad: {
            mode: 'more',
            value: '01:45',
        },
    },
    {
        order: 1,
        id: 'skeletal-muscle-mass',
        name: 'Skeletal Muscle Mass',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'kg',
        source: 'manual',
        categoryId: 'strength',
        categoryIcon: 'RiFlashlightFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 1,
        id: 'bone-mineral',
        name: 'Bone Mineral',
        active: true,
        onDashboard: true,
        dataType: 'amount',
        unit: 'kg',
        source: 'manual',
        categoryId: 'strength',
        categoryIcon: 'RiFlashlightFill',
        isFixed: true,
        frequency: 'weekly',
        goal: '',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
]

export default metricItems
