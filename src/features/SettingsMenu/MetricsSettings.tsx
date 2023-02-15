import { useState } from 'react'
import { RiStarLine, RiStarFill } from 'react-icons/ri'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import type { Metric } from '../../types'
import type { InputEvent, SelectEvent, FormSubmit } from '../../types.d.js'
import SettingsLabel from './SettingsLabel'

function MetricSettings({ metric }: Metric) {
    const [formData, setFormData] = useState(metric)
    const [editForm, setEditForm] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Constants
    const starIcon = formData.onDashboard ? <RiStarFill /> : <RiStarLine />
    const submitButtonText = editForm ? 'Save' : 'Edit'
    const submitButtonStyles = editForm ? 'bg-green-600' : 'bg-orange-600'
    const selectStyles = 'select select-bordered w-full max-w-xs text-sm'
    const inputStyles = 'w-full input input-bordered max-w-xs text-sm'

    // Functions
    function handleChange(
        event: InputEvent,
        type: string | undefined = undefined
    ) {
        if (typeof type === 'undefined') {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    [event.target.name]: event.target.value,
                }
            })
        } else if (typeof type === 'string')
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    [event.target.name]: {
                        ...prevFormData,
                        [type]: event.target.value,
                    },
                }
            })
    }

    function handleChangeSelect(event: SelectEvent) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.name]: event.value,
            }
        })
    }

    async function handleSubmit(event: FormSubmit) {
        event.preventDefault()
    }

    // eslint-disable-next-line no-console
    console.log(formData)

    return (
        <form
            className="w-full p-4 rounded-lg bg-white flex flex-col items-start justify-center gap-4 text-sm"
            onSubmit={handleSubmit}
        >
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
                <fieldset disabled={!editForm}>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <SettingsLabel name="dataType">type</SettingsLabel>
                            <select
                                name="dataType"
                                className={selectStyles}
                                value={formData.dataType}
                                onChange={handleChangeSelect}
                            >
                                <option value="">-- Choose --</option>
                                <option value="Amount">Amount</option>
                                <option value="Time">Time</option>
                                <option value="Duration">Duration</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <SettingsLabel name="frequency">
                                frequency
                            </SettingsLabel>
                            <select
                                name="frequency"
                                className={selectStyles}
                                value={formData.frequency}
                                onChange={handleChangeSelect}
                            >
                                <option value="">-- Choose --</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <SettingsLabel name="conditionsMode">
                            conditions mode
                        </SettingsLabel>
                        <select
                            name="conditionsMode"
                            className={selectStyles}
                            value={formData.conditionsMode}
                            onChange={handleChangeSelect}
                        >
                            <option value="">-- Choose --</option>
                            <option value="Higher">Higher</option>
                            <option value="Lower">Lower</option>
                            <option value="Range">Range</option>
                        </select>
                        {formData.conditionsMode === 'Range' && (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-green-600" />
                                    <select
                                        className={selectStyles}
                                        name="good"
                                        value={formData.range.good.mode}
                                        onChange={handleChangeSelect}
                                    >
                                        <option value="">-- Choose --</option>
                                        <option value="More">More</option>
                                        <option value="Less">Less</option>
                                    </select>
                                    <span>than</span>
                                    <input
                                        className={`${inputStyles}`}
                                        name="good"
                                        value={
                                            formData.range.good.value &&
                                            formData.range.good.value
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-orange-600" />
                                    <span>between</span>
                                    <input
                                        className={`${inputStyles}`}
                                        name="medium"
                                        value={
                                            formData.range.medium.value1 &&
                                            formData.range.medium.value1
                                        }
                                        onChange={handleChange}
                                    />
                                    <span>and</span>
                                    <input
                                        name="medium"
                                        className={`${inputStyles}`}
                                        value={
                                            formData.range.medium.value2 &&
                                            formData.range.medium.value2
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <i className="rounded-full h-5 w-5 bg-red-600" />
                                    <select
                                        className={selectStyles}
                                        name="bad"
                                        value={formData.range.bad.mode}
                                        onChange={handleChangeSelect}
                                    >
                                        <option value="">-- Choose --</option>
                                        <option value="More">More</option>
                                        <option value="Less">Less</option>
                                    </select>
                                    <span>than</span>
                                    <input
                                        className={`${inputStyles}`}
                                        name="bad-value"
                                        value={
                                            formData.range.bad.value &&
                                            formData.range.bad.value
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <SettingsLabel name="goal">goal</SettingsLabel>
                            <input
                                className={`${inputStyles}`}
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
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
                            type="submit"
                            className={`w-fit px-5 py-3 text-white text-base rounded-lg ${submitButtonStyles}`}
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </fieldset>
            )}
        </form>
    )
}

export default MetricSettings
