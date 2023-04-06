function calculateTimeAverage(values: string[]): string {
    const datesAsTimes = values.map((value) => {
        const time = new Date(value).toLocaleTimeString('en', {
            timeStyle: 'short',
            hour12: false,
        })
        return time
    })

    console.log(datesAsTimes)

    let totalMinutes = 0
    let amountOfValues = 0
    if (datesAsTimes.length > 0) {
        datesAsTimes.forEach((value) => {
            let hours = Number(value.split(':')[0])
            const minutes = Number(value.split(':')[1])
            if (hours < 5) {
                hours += 24
            }
            const amountOfMinutes = hours * 60 + minutes
            totalMinutes += amountOfMinutes
            amountOfValues += 1
        })
    }

    const averageMinutes = totalMinutes / amountOfValues
    const hours = String(Math.floor(averageMinutes / 60)).padStart(2, '0')
    const minutes = String(
        Math.floor(averageMinutes - Number(hours) * 60)
    ).padStart(2, '0')

    const average = `${hours}:${minutes}`

    return average
}

export default calculateTimeAverage
