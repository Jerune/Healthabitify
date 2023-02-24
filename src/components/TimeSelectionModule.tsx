import { DateTime } from 'luxon'
import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import type { TabListProps } from '../types'

function TimeSelectionModule({ tabs }: TabListProps) {
    const [activeTab, setActiveTab] = useState(0)
    const listOfTabs = tabs.map((tab, index) => {
        const tabClasses =
            index === activeTab
                ? 'bg-palette-500 text-white hover:bg-palette-500'
                : 'hover:bg-palette-500 hover:text-white'
        return (
            <li key={tab.name}>
                <button
                    type="button"
                    className={`w-32 cursor-pointer rounded-md border border-solid border-black px-6 py-2 ${tabClasses}`}
                    onClick={() => {
                        tab.function()
                        setActiveTab(index)
                    }}
                >
                    {tab.name}
                </button>
            </li>
        )
    })

    function getCorrectWeekDates(date: DateTime) {
        let lastDayOfTheWeek = date
        const { weekNumber, year } = date
        for (let i = 1; i < 7; i += 1) {
            const newDate = date.plus({ days: i })
            if (newDate.weekNumber === weekNumber) {
                lastDayOfTheWeek = newDate
            }
        }
        const firstDayOfTheWeek = lastDayOfTheWeek.minus({ days: 7 })

        return { weekNumber, year, firstDayOfTheWeek, lastDayOfTheWeek }
    }

    const { weekNumber, year, firstDayOfTheWeek, lastDayOfTheWeek } =
        getCorrectWeekDates(DateTime.now())
    const timeLeft = firstDayOfTheWeek.toFormat('LLL d')
    const timeRight = lastDayOfTheWeek.toFormat('LLL d')

    return (
        <div className="w-full flex flex-col items-center p-6 rounded-lg bg-gray-50">
            <ul className="flex items-center gap-3">{listOfTabs}</ul>
            <span className="flex justify-center w-content pt-3 italic">
                {`Week ${weekNumber}, ${year}`}
            </span>
            <div className="flex flex-row items-center pt-2">
                <button type="button">
                    <AiOutlineLeft />
                </button>
                <span className="flex justify-center gap-6 px-8 italic">
                    {timeLeft} <span>-</span> {timeRight}
                </span>
                <button type="button">
                    <AiOutlineRight />
                </button>
            </div>
        </div>
    )
}

export default TimeSelectionModule
