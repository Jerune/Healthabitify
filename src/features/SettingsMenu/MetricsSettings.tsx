/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react'
import { RiStarLine, RiStarFill } from 'react-icons/ri'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import type { Metric } from '../../types'
import SettingsLabel from './SettingsLabel'

function MetricSettings({ metric }: Metric) {
    const [formData, setFormData] = useState(metric)
    const [notEditForm, setNotEditForm] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const starIcon = formData.onDashboard ? <RiStarFill /> : <RiStarLine />

    return (
        <form className="w-full p-4 rounded-lg bg-white flex flex-col items-start justify-center gap-4">
            <header className="flex flex-row w-full justify-start gap-4">
                <button
                    type="button"
                    className="rotate-90"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <AiOutlineDoubleLeft />
                    ) : (
                        <AiOutlineDoubleRight />
                    )}
                </button>

                <div className="flex flex-col">
                    <h3>{formData.name}</h3>
                    <span className="pl-2">{formData.source}</span>
                </div>
                <div className="flex flex-col justify-between items-end grow">
                    <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={formData.active}
                        onChange={() =>
                            setFormData((prevState) => {
                                return {
                                    ...prevState,
                                    active: !prevState.active,
                                    onDashboard: false,
                                }
                            })
                        }
                    />
                    <button
                        className="text-2xl text-yellow-400"
                        type="button"
                        onClick={() =>
                            setFormData((prevState) => {
                                return {
                                    ...prevState,
                                    onDashboard: !formData.onDashboard,
                                }
                            })
                        }
                    >
                        {starIcon}
                    </button>
                </div>
            </header>
            {isOpen && (
                <fieldset disabled={notEditForm}>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <SettingsLabel name="dataType">type</SettingsLabel>
                            <select
                                name="dataType"
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option disabled selected>
                                    Amount
                                </option>
                                <option>Time</option>
                                <option>Duration</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <SettingsLabel name="hasDailyData">
                                frequency
                            </SettingsLabel>
                            <select
                                name="hasDailyData"
                                className="select select-bordered w-full max-w-xs"
                                defaultValue="Daily"
                            >
                                <option>Daily</option>
                                <option>Weekly</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <SettingsLabel name="conditionsMode">
                            conditions mode
                        </SettingsLabel>
                        <select
                            name="conditionsMode"
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option>Higher</option>
                            <option>Lower</option>
                            <option>Range</option>
                        </select>
                        {formData.hasCustomRange && (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-green-600" />
                                    <select
                                        className="select select-bordered w-full max-w-xs"
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
                                        className="input input-bordered w-full max-w-xs"
                                        name="good"
                                        value={
                                            formData.range
                                                ? formData.range.good[1]
                                                : 0
                                        }
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-orange-600" />
                                    <span>between</span>
                                    <input
                                        className="input input-bordered w-full max-w-xs"
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
                                        className="input input-bordered w-full max-w-xs"
                                        value={
                                            formData.range
                                                ? formData.range.medium[1]
                                                : 0
                                        }
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-red-600" />
                                    <select
                                        className="select select-bordered w-full max-w-xs"
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
                                        className="input input-bordered w-full max-w-xs"
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
                            <SettingsLabel name="goal">goal</SettingsLabel>
                            <input
                                className="input input-bordered w-full max-w-xs"
                                name="goal"
                                value={formData.goal}
                            />
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
                        <button
                            type="button"
                            className="bg-red-600 h-full w-10"
                        >
                            Edit / Save
                        </button>
                    </div>
                </fieldset>
            )}
        </form>
    )
}

export default MetricSettings
