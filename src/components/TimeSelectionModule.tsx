import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import getWeeks from '../features/TimesDatesModule/getWeeks'
import type { TabListProps } from '../types'

function TimeSelectionModule({ tabs }: TabListProps) {
    const [activeTab, setActiveTab] = useState('week')
    const [currentTimeData, setCurrentTimeData] = useState({
        currentDate: DateTime.now(),
        year: 0,
        weekNumber: 0,
        firstDayOfTheWeek: DateTime.now(),
        lastDayOfTheWeek: DateTime.now(),
    })
    const listOfTabs = tabs.map((tab, index) => {
        const buttonNames = ['week', 'month', 'year']
        const tabClasses =
            buttonNames[index] === activeTab
                ? 'bg-palette-500 text-white hover:bg-palette-500'
                : 'hover:bg-palette-500 hover:text-white'
        return (
            <li key={tab.name}>
                <button
                    type="button"
                    className={`w-32 cursor-pointer rounded-md border border-solid border-black px-6 py-2 ${tabClasses}`}
                    onClick={() => {
                        tab.function()
                        setActiveTab(buttonNames[index])
                    }}
                >
                    {tab.name}
                </button>
            </li>
        )
    })

    async function getCorrectDates() {
        const { weekNumber, month, year } = currentTimeData.currentDate
        let datesData = {}
        switch (activeTab) {
            case 'week':
                datesData = await getWeeks(
                    currentTimeData.currentDate,
                    weekNumber
                )
                break
            default:
                datesData = {}
        }

        if (datesData) {
            setCurrentTimeData((prevState) => {
                return {
                    ...prevState,
                    ...datesData,
                }
            })
        }
    }

    useEffect(() => {
        getCorrectDates()
    }, [currentTimeData.currentDate])

    function changeTimeView(direction: string) {
        if (direction === 'previous') {
            setCurrentTimeData((prevState) => {
                return {
                    ...prevState,
                    currentDate: prevState.currentDate.minus({ days: 7 }),
                }
            })
        } else if (direction === 'next') {
            setCurrentTimeData((prevState) => {
                return {
                    ...prevState,
                    currentDate: prevState.currentDate.plus({ days: 7 }),
                }
            })
        }
    }

    return (
        <div className="w-full flex flex-col items-center p-6 rounded-lg bg-gray-50">
            <ul className="flex items-center gap-3">{listOfTabs}</ul>
            <div className="flex flex-row items-center pt-2">
                <button
                    type="button"
                    onClick={() => changeTimeView('previous')}
                >
                    <AiOutlineLeft />
                </button>
                <span className="flex justify-center gap-6 px-8 italic">
                    {currentTimeData.firstDayOfTheWeek.toFormat('d LLL, yyyy')}{' '}
                    <span>-</span>{' '}
                    {currentTimeData.lastDayOfTheWeek.toFormat('d LLL, yyyy')}
                </span>
                <button type="button" onClick={() => changeTimeView('next')}>
                    {currentTimeData.currentDate.weekNumber <
                        DateTime.now().weekNumber && <AiOutlineRight />}
                </button>
            </div>
        </div>
    )
}

export default TimeSelectionModule
