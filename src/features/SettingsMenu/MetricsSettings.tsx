import { useState, useRef } from 'react'
import { RiStarLine, RiStarFill } from 'react-icons/ri'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import type { Metric } from '../../types'
import type { InputEvent, SelectEvent, FormSubmit } from '../../types.d.js'
import SettingsLabel from './SettingsLabel'
import SettingsButton from './SettingsButton'

function MetricSettings({ metric }: Metric) {
    const [formData, setFormData] = useState(metric)
    const [editForm, setEditForm] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // References
    const goodRef = useRef(null)
    const mediumRef1 = useRef(null)
    const mediumRef2 = useRef(null)
    const badRef = useRef(null)
    const references = [goodRef, mediumRef1, mediumRef2, badRef]

    // Constants
    const starIcon = formData.onDashboard ? <RiStarFill /> : <RiStarLine />
    const generalSelectStyles = `text-sm select select-bordered font-normal ${
        !editForm && 'opacity-100 bg-gray-100 cursor-not-allowed'
    }`
    const generalInputStyles = `text-sm input input-bordered ${
        !editForm && 'opacity-100 bg-gray-100 cursor-not-allowed'
    }`
    let regExPattern = ''
    switch (formData.dataType) {
        case 'Amount':
            regExPattern = '[0-9]+'
            break
        case 'Duration':
            regExPattern = '[0-9]+'
            break
        case 'Time':
            regExPattern = '[0-9]+'
            break
        default:
            regExPattern = ''
    }

    // Functions
    function handleChange(event: InputEvent | SelectEvent) {
        setErrorMessage('')
        if (event.target.dataset.type) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    [event.target.name]: {
                        ...prevFormData[event.target.name],
                        [event.target.dataset.type]: event.target.value,
                    },
                }
            })
        } else {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    [event.target.name]: event.target.value,
                }
            })
        }
    }

    function handleErrors() {}

    async function handleSubmit(event: FormSubmit) {
        event.preventDefault()
    }

    return (
        <form
            className={`w-[50%] p-4 rounded-lg bg-white flex flex-col items-start justify-center gap-4 text-sm shadow-lg ${
                !isOpen ? 'opacity-80 hover:opacity-100' : 'opacity-100'
            } ${!formData.active && 'opacity-50 hover:opacity-50'}`}
            onSubmit={handleSubmit}
        >
            <header className="flex flex-row w-full justify-start gap-4">
                <button
                    type="button"
                    className={`rotate-90 ${
                        formData.active ? 'visible' : 'invisible'
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <AiOutlineDoubleLeft />
                    ) : (
                        <AiOutlineDoubleRight />
                    )}
                </button>

                <div className="flex flex-col">
                    <h3>
                        {formData.name}
                        <span className="pl-2 text-sm italic in">{`(${formData.unit})`}</span>
                    </h3>
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
                        onClick={() => {
                            if (formData.active) {
                                setFormData((prevState) => {
                                    return {
                                        ...prevState,
                                        onDashboard: !formData.onDashboard,
                                    }
                                })
                            }
                        }}
                    >
                        {starIcon}
                    </button>
                </div>
            </header>
            {isOpen && (
                <>
                    <fieldset
                        disabled={!editForm}
                        className="w-full flex flex-col gap-4"
                    >
                        <div className="w-full flex flex-row gap-4">
                            <div className="w-[50%] flex flex-col">
                                <SettingsLabel name="dataType">
                                    type
                                </SettingsLabel>
                                <select
                                    name="dataType"
                                    className={generalSelectStyles}
                                    value={formData.dataType}
                                    onChange={handleChange}
                                >
                                    <option value="Amount">Amount</option>
                                    <option value="Time">Time</option>
                                    <option value="Duration">Duration</option>
                                </select>
                            </div>
                            <div className="w-[50%] flex flex-col">
                                <SettingsLabel name="frequency">
                                    frequency
                                </SettingsLabel>
                                <select
                                    name="frequency"
                                    className={generalSelectStyles}
                                    value={formData.frequency}
                                    onChange={handleChange}
                                >
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
                                className={generalSelectStyles}
                                value={formData.conditionsMode}
                                onChange={handleChange}
                            >
                                <option value="Higher">Higher</option>
                                <option value="Lower">Lower</option>
                                <option value="Range">Range</option>
                            </select>
                        </div>
                        {formData.conditionsMode === 'Range' && (
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-3 justify-end items-center">
                                    <i className="rounded-full h-5 w-5 bg-green-600" />
                                    <select
                                        className={`${generalSelectStyles} grow`}
                                        name="good"
                                        value={formData.good.mode}
                                        onChange={handleChange}
                                        data-type="mode"
                                    >
                                        <option value="More">More</option>
                                        <option value="Less">Less</option>
                                    </select>
                                    <span className="w-8 flex justify-center">
                                        than
                                    </span>
                                    <input
                                        className={`w-[30%] ${generalInputStyles}`}
                                        name="good"
                                        value={
                                            formData.good.value &&
                                            formData.good.value
                                        }
                                        onChange={handleChange}
                                        data-type="value"
                                        pattern={regExPattern}
                                        ref={goodRef}
                                    />
                                </div>
                                <div className="w-full flex flex-row gap-3 justify-end items-center">
                                    <i className="rounded-full h-5 w-5 bg-orange-600" />
                                    <span className="flex grow justify-start pl-1">
                                        Between
                                    </span>
                                    <input
                                        className={`${generalInputStyles} w-[30%]`}
                                        name="medium"
                                        value={
                                            formData.medium.value1 &&
                                            formData.medium.value1
                                        }
                                        onChange={handleChange}
                                        data-type="value1"
                                        pattern={regExPattern}
                                        ref={mediumRef1}
                                    />
                                    <span className="w-8 flex justify-center">
                                        and
                                    </span>
                                    <input
                                        name="medium"
                                        className={`${generalInputStyles} w-[30%]`}
                                        value={
                                            formData.medium.value2 &&
                                            formData.medium.value2
                                        }
                                        onChange={handleChange}
                                        data-type="value2"
                                        pattern={regExPattern}
                                        ref={mediumRef2}
                                    />
                                </div>
                                <div className="w-full flex flex-row gap-3 justify-end items-center">
                                    <i className="rounded-full h-5 w-5 bg-red-600" />
                                    <select
                                        className={`grow ${generalSelectStyles}`}
                                        name="bad"
                                        value={formData.bad.mode}
                                        onChange={handleChange}
                                        data-type="mode"
                                    >
                                        <option value="More">More</option>
                                        <option value="Less">Less</option>
                                    </select>
                                    <span className="w-8 flex justify-center">
                                        than
                                    </span>
                                    <input
                                        className={`${generalInputStyles} w-[30%]`}
                                        name="bad"
                                        value={
                                            formData.bad.value &&
                                            formData.bad.value
                                        }
                                        onChange={handleChange}
                                        data-type="value"
                                        pattern={regExPattern}
                                        ref={badRef}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="w-full flex flex-col">
                            <SettingsLabel name="goal">goal</SettingsLabel>
                            <input
                                className={`${generalInputStyles}`}
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-red-600 text-sm">
                            {errorMessage}
                        </div>
                    </fieldset>
                    <div className="w-full flex flex-row gap-6">
                        <SettingsButton
                            type="button"
                            active={!editForm}
                            text="Edit"
                            onClick={() => setEditForm(true)}
                        />
                        <SettingsButton
                            type="submit"
                            active={editForm}
                            text="Save"
                            onClick={() => handleSubmit}
                        />
                    </div>
                </>
            )}
        </form>
    )
}

export default MetricSettings
