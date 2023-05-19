/* eslint-disable no-param-reassign */
import { Metric } from '../../types'
import forceNumberReturn from '../../utils/forceNumberReturn'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'

function getConditionalFormatting(metric: Metric) {
    const { id, conditionsMode, good, bad } = metric
    const correctId = kebabcaseToCamelcase(id)
    const backgroundColors = {
        good: '#B7E2CD',
        medium: '#FDE5CE',
        bad: '#F4CCCD',
        none: 'white',
    }
    const fontColors = {
        good: 'black',
        medium: 'black',
        bad: 'black',
    }

    if (conditionsMode === 'higher') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[correctId]
            const dataForPreviousPeriod = data[`prev${correctId}`]
            if (
                dataForPreviousPeriod === undefined ||
                dataForPreviousPeriod === null
            ) {
                cellProps.style.background = backgroundColors.none
            } else if (dataForCurrentPeriod > dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod === dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            } else {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            }
        }
    }
    if (conditionsMode === 'lower') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[correctId]
            const dataForPreviousPeriod = data[`prev${correctId}`]
            if (
                dataForPreviousPeriod === undefined ||
                dataForPreviousPeriod === null
            ) {
                cellProps.style.background = backgroundColors.none
            } else if (dataForCurrentPeriod < dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod === dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            } else {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            }
        }
    }
    if (conditionsMode === 'range' && good.mode === 'more') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[correctId]
            if (dataForCurrentPeriod > good.value) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod < bad.value) {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            } else {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            }
        }
    }
    if (conditionsMode === 'range' && good.mode === 'less') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = data[correctId]
            if (dataForCurrentPeriod < good.value) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod > bad.value) {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            } else {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            }
        }
    }
}

export default getConditionalFormatting
