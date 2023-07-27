import {
    RiGobletFill,
    RiMentalHealthFill,
    RiFlashlightFill,
    RiRunFill,
    RiLungsFill,
    RiHotelBedFill,
    RiBodyScanFill,
    RiHeartPulseFill,
} from 'react-icons/ri'
import { FaRing } from 'react-icons/fa'
import { SiFitbit } from 'react-icons/si'
import { IoScaleSharp } from 'react-icons/io5'
import wearablesCategories from '../../data/wearablesCategories'
import categoriesList from '../../data/categories'

function SettingsMenuCategories(props) {
    const {
        detailView,
        setMetrics,
        setWearables,
        activeCategory,
        hideMenuCategories,
        setHideMenuCategories,
    } = props

    const Icons = {
        oura: <FaRing />,
        fitbit: <SiFitbit />,
        bodypedia: <IoScaleSharp />,
        vitals: <RiHeartPulseFill />,
        body: <RiBodyScanFill />,
        sleep: <RiHotelBedFill />,
        metabolism: <RiLungsFill />,
        activity: <RiRunFill />,
        strength: <RiFlashlightFill />,
        stress: <RiMentalHealthFill />,
        lifestyle: <RiGobletFill />,
    }

    const hideMenuOnMobile = hideMenuCategories ? 'hidden' : 'flex flex-col'

    const dataSource =
        detailView === 'wearables' ? wearablesCategories : categoriesList
    const categories = dataSource.map((category) => {
        const Icon = Icons[category.id]
        return (
            <button
                className={`w-full md:w-72 lg:w-96 flex flex-row gap-2 justify-start items-center text-xl pt-8 pb-7 px-8 rounded-lg shadow-lg ${
                    activeCategory.id === category.id
                        ? 'bg-palette-600 italic text-white'
                        : 'bg-white'
                } hover:bg-palette-600 hover:text-2xl hover:italic hover:text-white hover:transition-colors hover:underline`}
                type="button"
                key={category.name}
                onClick={() => {
                    if (detailView === 'metrics') {
                        setMetrics(category.id)
                        setHideMenuCategories(true)
                    } else {
                        setWearables(category.id)
                        setHideMenuCategories(true)
                    }
                }}
            >
                <i>{Icon}</i>
                <h2 className="text-2xl font-normal">{category.name}</h2>
            </button>
        )
    })

    return (
        <div
            className={`md:flex md:flex-col gap-4 w-screen md:w-full ${hideMenuOnMobile}`}
        >
            {categories}
        </div>
    )
}

export default SettingsMenuCategories
