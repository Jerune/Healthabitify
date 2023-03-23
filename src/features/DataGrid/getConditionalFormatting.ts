/* eslint-disable no-param-reassign */
import { Metric } from '../../types'

function getConditionalFormatting(metric: Metric) {
    const { id, conditionsMode, good, bad } = metric
    const backgroundColors = { good: 'green', medium: 'orange', bad: 'red' }

    if (conditionsMode === 'higher') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[id]
            const dataForPreviousPeriod = data[`prev${id}`]
            if (dataForCurrentPeriod > dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
            } else if (dataForCurrentPeriod === dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.medium
            } else {
                cellProps.style.background = backgroundColors.bad
            }
        }
    }
    if (conditionsMode === 'lower') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[id]
            const dataForPreviousPeriod = data[`prev${id}`]
            if (dataForCurrentPeriod < dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
            } else if (dataForCurrentPeriod === dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.medium
            } else {
                cellProps.style.background = backgroundColors.bad
            }
        }
    }
    if (conditionsMode === 'range' && good.mode === 'more') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[id]
            if (dataForCurrentPeriod > good.value) {
                cellProps.style.background = backgroundColors.good
            } else if (dataForCurrentPeriod < bad.value) {
                cellProps.style.background = backgroundColors.bad
            } else {
                cellProps.style.background = backgroundColors.medium
            }
        }
    }
    if (conditionsMode === 'range' && good.mode === 'less') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[id]
            if (dataForCurrentPeriod < good.value) {
                cellProps.style.background = backgroundColors.good
            } else if (dataForCurrentPeriod > bad.value) {
                cellProps.style.background = backgroundColors.bad
            } else {
                cellProps.style.background = backgroundColors.medium
            }
        }
    }
}

export default getConditionalFormatting
