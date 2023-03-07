export default function matchServiceResourcesWithMetricNames(
    source: string,
    resource: string
) {
    const shortenedResource = resource.split('-').slice(1, 2).join()
    let dbMetricName = ''

    if (source === 'fitbit') {
        switch (shortenedResource) {
            case 'activityCalories':
                dbMetricName = 'total-average-calorie-burn'
                break
            case 'steps':
                dbMetricName = 'steps'
                break
            case 'heart':
                dbMetricName = 'heartrate-zones'
                break
            case 'minutesSedentary':
                dbMetricName = 'minutes-sedentary'
                break
            default:
                dbMetricName = ''
        }
    }
    return dbMetricName
}
