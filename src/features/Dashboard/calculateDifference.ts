import hasDecimals from '../../utils/hasDecimals'

function calculateDifference(value: number, comparisonValue: number): number {
    const difference =
        value > comparisonValue
            ? value - comparisonValue
            : comparisonValue - value
    const numberHasADecimal = hasDecimals(difference)

    return difference
}

export default calculateDifference
