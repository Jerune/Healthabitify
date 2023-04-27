function getStringDataAsNumber(timeDurationValue: string) {
    if (timeDurationValue) {
        const valueHoursAsNumber = Number(timeDurationValue.split(':')[0])
        const valueMinutesAsNumber = Number(timeDurationValue.split(':')[1])
        const numberValue = valueHoursAsNumber + valueMinutesAsNumber / 60

        return numberValue
    }

    return 0
}

export default getStringDataAsNumber
