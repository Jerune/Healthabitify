/* eslint-disable no-nested-ternary */
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { TfiCalendar } from 'react-icons/tfi'
import {
    changeActiveTimeView,
    changeDateTimeData,
} from '../../redux/reducers/utilsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { getSpecifiedDateAsString } from '../../utils/getDatesAsString'
import { getDateTimeDateFromDateString } from '../../utils/getDateTimeData'
import getAmountToAdjustWith from './getAmountToAdjustWith'
import getDateTitles from './getDateTitles'
import getWeekDays from './getWeekDays'
import type { TabListProps } from './TimesDatesTypes'

function TimeSelectionModule({ tabs }: TabListProps) {
    const dispatch = useAppDispatch()
    const currentDateTimeAsString = useAppSelector(
        (state) => state.utils.currentDateTime.currentDate
    )
    const [dateTitle, setDateTitle] = useState({
        week: '',
        month: '',
        year: '',
    })
    const activeTimeView = useAppSelector((state) => state.utils.activeTimeView)
    const currentDate = getDateTimeDateFromDateString(currentDateTimeAsString)

    const listOfTabs =
        tabs !== undefined &&
        tabs.map((tab, index) => {
            const buttonNames = ['week', 'month', 'year']
            const tabClasses =
                buttonNames[index] === activeTimeView
                    ? 'bg-palette-500 text-white hover:bg-palette-500'
                    : 'hover:bg-palette-500 hover:text-white'
            return (
                <li key={tab.name}>
                    <button
                        type="button"
                        className={`w-32 cursor-pointer rounded-md border border-solid border-black px-6 py-2 ${tabClasses}`}
                        onClick={() => {
                            dispatch(changeActiveTimeView(buttonNames[index]))
                        }}
                    >
                        {tab.name}
                    </button>
                </li>
            )
        })

    async function setCorrectDates(date: DateTime) {
        const { weekNumber, month, year } = date
        const { firstDayOfTheWeek, lastDayOfTheWeek } = await getWeekDays(date)

        const newDates = {
            currentDate: date,
            weekNumber,
            month,
            year,
            firstDayOfTheWeek,
            lastDayOfTheWeek,
        }

        const newDatesAsStrings = {
            currentDate: getSpecifiedDateAsString(currentDate),
            weekNumber,
            month,
            year,
            firstDayOfTheWeek: getSpecifiedDateAsString(firstDayOfTheWeek),
            lastDayOfTheWeek: getSpecifiedDateAsString(lastDayOfTheWeek),
        }

        const titles = getDateTitles(newDates)
        setDateTitle(titles)
        dispatch(changeDateTimeData(newDatesAsStrings))
    }

    async function changeTimeView(direction: string, tabState: string) {
        const amountToAdjustWith = await getAmountToAdjustWith(tabState)
        if (direction === 'previous') {
            setCorrectDates(currentDate.minus(amountToAdjustWith))
        } else if (direction === 'next') {
            setCorrectDates(currentDate.plus(amountToAdjustWith))
        }
    }

    useEffect(() => {
        setCorrectDates(currentDate)
    }, [])

    return (
        <div className="w-full flex flex-col items-center p-6 rounded-lg bg-gray-50">
            {tabs !== undefined && (
                <ul className="flex items-center gap-3 pb-6">{listOfTabs}</ul>
            )}
            <div className="flex flex-row items-center">
                <DatePicker
                    onChange={(value: Date) =>
                        setCorrectDates(DateTime.fromJSDate(value))
                    }
                    value={currentDate.toJSDate()}
                    clearIcon={null}
                    calendarIcon={<TfiCalendar />}
                    minDetail="month"
                />
                <button
                    type="button"
                    onClick={() => changeTimeView('previous', activeTimeView)}
                >
                    <AiOutlineLeft />
                </button>
                <span className="flex justify-center gap-6 px-8 italic">
                    {dateTitle[activeTimeView]}
                </span>
                <button
                    type="button"
                    onClick={() => changeTimeView('next', activeTimeView)}
                >
                    <AiOutlineRight />
                </button>
            </div>
        </div>
    )
}

export default TimeSelectionModule
