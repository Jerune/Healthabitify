import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import type { TabListProps } from '../types'

function TabsList({ tabs }: TabListProps) {
    const [activeTab, setActiveTab] = useState(0)
    const listOfTabs = tabs.map((tab, index) => {
        const tabClasses =
            index === activeTab
                ? 'bg-primary-100 text-primary-700 hover:bg-primary-100'
                : 'hover:bg-primary-100 hover:text-primary-700'
        return (
            <li key={tab.name}>
                <button
                    type="button"
                    className={`relative inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 ${tabClasses}`}
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
        <div className="w-full flex flex-col items-center p-4 rounded-lg bg-gray-50">
            <ul className="flex items-center gap-3">{listOfTabs}</ul>
            <div className="flex flex-row items-center py-4">
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

export default TabsList
