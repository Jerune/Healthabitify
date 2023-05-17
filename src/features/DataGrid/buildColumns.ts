/* eslint-disable no-param-reassign */
import { Metric } from '../../types'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import getConditionalFormatting from './getConditionalFormatting'

async function buildColumns(activeMetrics: Metric[]) {
    const columns = await activeMetrics.map((metric) => {
        const { id, name } = metric
        const onRender = getConditionalFormatting(metric)
        const newId = kebabcaseToCamelcase(id)

        return {
            name: newId,
            id,
            header: name,
            onRender,
        }
    })

    return [{ name: 'date', id: 'date', header: 'Date' }, ...columns]
}

export default buildColumns
