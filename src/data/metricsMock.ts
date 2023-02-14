const metricItem = {
    id: '1',
    name: 'Weight',
    active: true,
    type: 'amount',
    source: 'Manual',
    categoryId: '1',
    categoryIcon: 'RiBodyScanFill',
    isFixed: true,
    hasDailyData: false,
    goal: 'Stay under 80kg',
    conditionsMode: 'Lower',
    hasCustomRange: true,
    range: {
        good: ['less', 80],
        medium: [80, 85],
        bad: ['more', 85],
    },
}

export default metricItem
