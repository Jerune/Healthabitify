import { useState } from 'react'
import type { Metric } from '../../types'

function MetricSettings({ metric }: Metric) {
    const [formData, setFormData] = useState(metric)

    return (
        <form className="flex flex-row">
            <button type="button">Edit / Save</button>
            <div className="relative flex flex-col items-start justify-center">
                <button className="absolute top-2 right-10" type="button">
                    Toggle
                </button>
                <button className="absolute top-2 right-4" type="button">
                    StarIcon
                </button>
                <label>name</label>
                <h2>{formData.name}</h2>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label>source</label>
                        <span>{formData.source}</span>
                    </div>
                    <div className="flex flex-col">
                        <label>category</label>
                        <span>{formData.categoryId}</span>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label htmlFor="type">type</label>
                        <select name="type" defaultValue="Amount">
                            <option>Amount</option>
                            <option>Time</option>
                            <option>Duration</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>frequency</label>
                        <select name="type" defaultValue="Amount">
                            <option>Daily</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label>conditions mode</label>
                    <select name="type">
                        <option>Higher</option>
                        <option>Lower</option>
                        <option>Range</option>
                    </select>
                    <div>
                        <div>
                            <i>GreenLight</i>
                            <select
                                name="type"
                                defaultValue={formData.range.good[0]}
                            >
                                <option>More</option>
                                <option>Less</option>
                            </select>
                            <span>than</span>
                            <input name="good" value={formData.range.good[1]} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MetricSettings
