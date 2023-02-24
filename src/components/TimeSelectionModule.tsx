import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import type { TabListProps } from '../types'

function TimeSelectionModule({ tabs }: TabListProps) {
    const [activeTab, setActiveTab] = useState(0)
    const [currentTimeData, setCurrentTimeData] = useState({
        currentDate: DateTime.now(),
        year: 0,
        weekNumber: 0,
        firstDayOfTheWeek: DateTime.now(),
        lastDayOfTheWeek: DateTime.now(),
    })
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

    function getCorrectWeekDates(): void {
        let lastDayOfTheWeek = currentTimeData.currentDate
        const { weekNumber, year } = currentTimeData.currentDate
        for (let i = 1; i < 7; i += 1) {
            const newDate = currentTimeData.currentDate.plus({ days: i })
            if (newDate.weekNumber === weekNumber) {
                lastDayOfTheWeek = newDate
            }
        }
        const firstDayOfTheWeek = lastDayOfTheWeek.minus({ days: 7 })

        setCurrentTimeData((prevState) => {
            return {
                ...prevState,
                weekNumber,
                year,
                firstDayOfTheWeek,
                lastDayOfTheWeek,
            }
        })
    }

    useEffect(() => {
        getCorrectWeekDates()
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
            <span className="flex justify-center w-content pt-3 italic">
                {`Week ${currentTimeData.weekNumber}, ${currentTimeData.year}`}
            </span>
            <div className="flex flex-row items-center pt-2">
                <button
                    type="button"
                    onClick={() => changeTimeView('previous')}
                >
                    <AiOutlineLeft />
                </button>
                <span className="flex justify-center gap-6 px-8 italic">
                    {currentTimeData.firstDayOfTheWeek.toFormat('LLL d')}{' '}
                    <span>-</span>{' '}
                    {currentTimeData.lastDayOfTheWeek.toFormat('LLL d')}
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
