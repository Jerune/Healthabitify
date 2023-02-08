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

    return (
        <div className="w-full flex flex-col items-center p-6 rounded-lg bg-gray-50">
            <ul className="flex items-center gap-3">{listOfTabs}</ul>
            <div className="flex flex-row items-center pt-4">
                <button type="button">
                    <AiOutlineLeft />
                </button>
                <span className="flex justify-center w-52 italic">
                    8 September 2022
                </span>
                <button type="button">
                    <AiOutlineRight />
                </button>
            </div>
        </div>
    )
}

export default TimeSelectionModule
