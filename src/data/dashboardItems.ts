const dashboardItems = [
    {
        name: 'Weight',
        goal: 'Stay under 80kg',
        value: 80,
        valueType: 'kg',
        comparisonValue: 76,
        comparisonStatus: 'medium',
        comparisonType: 'week',
    },
    {
        name: 'Average Heart Rate',
        goal: 'Heart rate stays under 50bpm',
        value: 52,
        valueType: 'bpm',
        comparisonValue: 57,
        comparisonStatus: 'bad',
        comparisonType: 'week',
    },
    {
        name: 'HRV',
        goal: 'HRV of munimum 65ms',
        value: 67,
        valueType: 'ms',
        comparisonValue: 70,
        comparisonStatus: 'good',
        comparisonType: 'week',
    },
    {
        name: 'Body Fat',
        goal: 'Stay under 20%',
        value: 20.02,
        valueType: '%',
        comparisonValue: 19.86,
        comparisonStatus: 'bad',
        comparisonType: 'week',
    },
    {
        name: 'Respitory Rate',
        goal: 'Keep rate of more than 14/min',
        value: 13.6,
        valueType: 'inhales/min',
        comparisonValue: 14.2,
        comparisonStatus: 'bad',
        comparisonType: 'week',
    },
]

export default dashboardItems
