/* eslint-disable no-nested-ternary */
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { TfiCalendar } from 'react-icons/tfi'
import { changeActiveTimeView } from '../../redux/reducers/utilsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import getAmountToAdjustWith from './getAmountToAdjustWith'
import getWeekDays from './getWeeks'
import type { TabListProps } from './TimesDatesTypes'

function TimeSelectionModule({ tabs }: TabListProps) {
    const activeTimeView = useAppSelector((state) => state.utils.activeTimeView)
    const dispatch = useAppDispatch()
    const [currentTimeData, setCurrentTimeData] = useState({
        currentDate: DateTime.now().minus({ days: 7 }),
        year: 0,
        month: 0,
        weekNumber: 0,
        firstDayOfTheWeek: DateTime.now().minus({ days: 7 }),
        lastDayOfTheWeek: DateTime.now().minus({ days: 7 }),
    })

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

    const datesTitles =
        activeTimeView === 'week'
            ? `${currentTimeData.firstDayOfTheWeek.toFormat(
                  'd LLL, yyyy'
              )} - ${currentTimeData.lastDayOfTheWeek.toFormat('d LLL, yyyy')}`
            : activeTimeView === 'month'
            ? `${currentTimeData.currentDate.toFormat('LLLL, y')}`
            : activeTimeView === 'year'
            ? `${currentTimeData.currentDate.toFormat('y')}`
            : ''

    async function getCorrectDates() {
        const { weekNumber, month, year } = currentTimeData.currentDate
        let datesData = {}
        if (activeTimeView === 'week') {
            datesData = await getWeekDays(currentTimeData.currentDate)
        }

        setCurrentTimeData((prevState) => {
            return {
                ...prevState,
                weekNumber,
                month,
                year,
                ...datesData,
            }
        })
    }

    async function changeTimeView(direction: string, tabState: string) {
        const amountToAdjustWith = await getAmountToAdjustWith(tabState)
        if (direction === 'previous') {
            setCurrentTimeData((prevState) => {
                return {
                    ...prevState,
                    currentDate:
                        prevState.currentDate.minus(amountToAdjustWith),
                }
            })
        } else if (direction === 'next') {
            setCurrentTimeData((prevState) => {
                return {
                    ...prevState,
                    currentDate: prevState.currentDate.plus(amountToAdjustWith),
                }
            })
        }
    }

    useEffect(() => {
        getCorrectDates()
    }, [currentTimeData.currentDate, activeTimeView])

    return (
        <div className="w-full flex flex-col items-center p-6 rounded-lg bg-gray-50">
            {tabs !== undefined && (
                <ul className="flex items-center gap-3 pb-6">{listOfTabs}</ul>
            )}
            <div className="flex flex-row items-center">
                <DatePicker
                    onChange={(value: Date) =>
                        setCurrentTimeData((prevState) => {
                            return {
                                ...prevState,
                                currentDate: DateTime.fromJSDate(value),
                            }
                        })
                    }
                    value={currentTimeData.currentDate.toJSDate()}
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
                    {datesTitles}
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
