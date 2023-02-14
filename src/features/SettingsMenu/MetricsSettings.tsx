import { useState } from 'react'
import type { Metric } from '../../types'

function MetricSettings({ metric }: Metric) {
    const [formData, setFormData] = useState(metric)
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <form className="flex flex-row">
            <button type="button">Edit / Save</button>
            <div className="relative flex flex-col items-start justify-center">
                <input type="checkbox" className="toggle toggle-success" />
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
                    {formData.hasCustomRange && (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-3">
                                <i>GreenLight</i>
                                <select
                                    name="type"
                                    defaultValue={
                                        formData.range
                                            ? formData.range.good[0]
                                            : 0
                                    }
                                >
                                    <option>More</option>
                                    <option>Less</option>
                                </select>
                                <span>than</span>
                                <input
                                    name="good"
                                    value={
                                        formData.range
                                            ? formData.range.good[1]
                                            : 0
                                    }
                                />
                            </div>
                            <div>
                                <i>OrangeLight</i>
                                <span>between</span>
                                <input
                                    name="medium"
                                    value={
                                        formData.range
                                            ? formData.range.medium[0]
                                            : 0
                                    }
                                />
                                <span>and</span>
                                <input
                                    name="medium"
                                    value={
                                        formData.range
                                            ? formData.range.medium[1]
                                            : 0
                                    }
                                />
                            </div>
                            <div>
                                <i>RedLight</i>
                                <select
                                    name="type"
                                    defaultValue={
                                        formData.range
                                            ? formData.range.bad[0]
                                            : 0
                                    }
                                >
                                    <option>More</option>
                                    <option>Less</option>
                                </select>
                                <span>than</span>
                                <input
                                    name="bad"
                                    value={
                                        formData.range
                                            ? formData.range.bad[1]
                                            : 0
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <label htmlFor="goal">goal</label>
                        <input name="goal" value={formData.goal} />
                    </div>
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Error! Task failed successfully.</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MetricSettings
