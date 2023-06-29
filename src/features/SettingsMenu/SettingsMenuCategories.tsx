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
    const { detailView, setMetrics, setWearables, activeCategory } = props

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

    const dataSource =
        detailView === 'wearables' ? wearablesCategories : categoriesList
    const categories = dataSource.map((category) => {
        const Icon = Icons[category.id]
        return (
            <button
                className={`w-72 flex flex-row gap-2 justify-start items-center text-xl py-7 pl-8 rounded-lg ${
                    activeCategory.id === category.id
                        ? 'bg-palette-600 italic text-white'
                        : 'bg-white'
                } hover:bg-palette-600 hover:text-2xl hover:italic hover:text-white hover:transition-colors hover:underline`}
                type="button"
                key={category.name}
                onClick={() =>
                    detailView === 'metrics'
                        ? setMetrics(category.id)
                        : setWearables(category.id)
                }
            >
                <i>{Icon}</i>
                <h2 className="text-2xl font-normal">{category.name}</h2>
            </button>
        )
    })

    return <div className="flex flex-col gap-4">{categories}</div>
}

export default SettingsMenuCategories
