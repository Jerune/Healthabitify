/* eslint-disable no-param-reassign */
import metricsWithZeroValues from '../../data/data-grid/metricsWithZeroValues'
import { Metric } from '../../types'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'

const metricsWithStringOutput = [
    'amount-of-deep-sleep',
    'amount-of-rem-sleep',
    'amount-of-sleep',
    'average-fasting-window',
    'average-time-to-bed',
    'average-wake-up',
    'smartphone-screen-time',
    'total-beneficial-sleep',
]

function getConditionalFormatting(metric: Metric) {
    const hasStringOutput = metricsWithStringOutput.includes(metric.id)
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
        none: 'white',
    }

    if (conditionsMode === 'higher') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = !hasStringOutput
                ? Number(data[correctId])
                : data[correctId]
            const dataForPreviousPeriod = !hasStringOutput
                ? Number(data[`prev${correctId}`])
                : data[`prev${correctId}`]
            if (
                (dataForCurrentPeriod === 0 &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                (dataForCurrentPeriod === '0' &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                dataForCurrentPeriod === '00:00' ||
                dataForCurrentPeriod === '0:00'
            ) {
                cellProps.style.background = backgroundColors.none
                cellProps.style.color = fontColors.none
            } else if (
                dataForCurrentPeriod === undefined ||
                (dataForCurrentPeriod.isNaN &&
                    metricsWithZeroValues.includes(metric.id))
            ) {
                cellProps.style.background = backgroundColors.none
            } else if (dataForCurrentPeriod > dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod === dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            } else if (dataForCurrentPeriod < dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            } else {
                cellProps.style.background = backgroundColors.none
            }
        }
    }
    if (conditionsMode === 'lower') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = !hasStringOutput
                ? Number(data[correctId])
                : data[correctId]
            const dataForPreviousPeriod = !hasStringOutput
                ? Number(data[`prev${correctId}`])
                : data[`prev${correctId}`]
            if (
                (dataForCurrentPeriod === 0 &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                (dataForCurrentPeriod === '0' &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                dataForCurrentPeriod === '00:00' ||
                dataForCurrentPeriod === '0:00'
            ) {
                cellProps.style.background = backgroundColors.none
                cellProps.style.color = fontColors.none
            } else if (
                dataForCurrentPeriod === undefined ||
                (dataForCurrentPeriod.isNaN &&
                    metricsWithZeroValues.includes(metric.id))
            ) {
                cellProps.style.background = backgroundColors.none
            } else if (dataForCurrentPeriod < dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (
                dataForCurrentPeriod === dataForPreviousPeriod &&
                !metricsWithZeroValues.includes(metric.id)
            ) {
                cellProps.style.background = backgroundColors.medium
                cellProps.style.color = fontColors.medium
            } else if (dataForCurrentPeriod > dataForPreviousPeriod) {
                cellProps.style.background = backgroundColors.bad
                cellProps.style.color = fontColors.bad
            } else {
                cellProps.style.background = backgroundColors.none
            }
        }
    }
    if (conditionsMode === 'range' && good.mode === 'more') {
        return (cellProps, { data }) => {
            const dataForCurrentPeriod = !hasStringOutput
                ? Number(data[correctId])
                : data[correctId]
            const goodValue = !hasStringOutput ? Number(good.value) : good.value
            const badValue = !hasStringOutput ? Number(bad.value) : bad.value
            if (
                (dataForCurrentPeriod === 0 &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                (dataForCurrentPeriod === '0' &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                dataForCurrentPeriod === '00:00' ||
                dataForCurrentPeriod === '0:00'
            ) {
                cellProps.style.background = backgroundColors.none
                cellProps.style.color = fontColors.none
            } else if (
                dataForCurrentPeriod === undefined ||
                (dataForCurrentPeriod.isNaN &&
                    metricsWithZeroValues.includes(metric.id))
            ) {
                cellProps.style.background = backgroundColors.none
            } else if (dataForCurrentPeriod > goodValue) {
                cellProps.style.background = backgroundColors.good
                cellProps.style.color = fontColors.good
            } else if (dataForCurrentPeriod < badValue) {
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
            if (
                (dataForCurrentPeriod === '0' &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                (dataForCurrentPeriod === 0 &&
                    !metricsWithZeroValues.includes(metric.id)) ||
                dataForCurrentPeriod === '00:00'
            ) {
                cellProps.style.background = backgroundColors.none
                cellProps.style.color = fontColors.none
            } else if (dataForCurrentPeriod < good.value) {
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

    return 'error'
}

export default getConditionalFormatting
