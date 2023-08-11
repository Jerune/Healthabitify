import { SleepAverages } from '../../types'

function calculateAutoAverages(allAverages: SleepAverages) {
    const { AmountOfDeepSleep, AmountOfRemSleep, AmountOfSleep } = allAverages
    const TotalBeneficialSleep = AmountOfDeepSleep + AmountOfRemSleep
    const SleepCoificient = (TotalBeneficialSleep / AmountOfSleep) * 100

    return {
        TotalBeneficialSleep,
        SleepCoificient,
    }
}

export default calculateAutoAverages
