// Import all React icons that are used in the app here
import {
    RiHeartPulseFill,
    RiBodyScanFill,
    RiHotelBedFill,
    RiRunFill,
    RiLungsFill,
    RiFlashlightFill,
    RiMentalHealthFill,
    RiGobletFill,
} from 'react-icons/ri'
import { SlLogout, SlSettings } from 'react-icons/sl'
import {
    MdOutlineModeEditOutline,
    MdModeEdit,
    MdDashboard,
} from 'react-icons/md'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { ImLab } from 'react-icons/im'
import { IconProps, IconMapping } from './_types'

// Add all imported icons to the mapping below
const iconMapping: IconMapping = {
    RiHeartPulseFill,
    RiBodyScanFill,
    RiHotelBedFill,
    RiLungsFill,
    RiRunFill,
    RiFlashlightFill,
    RiMentalHealthFill,
    RiGobletFill,
    SlLogout,
    SlSettings,
    MdOutlineModeEditOutline,
    MdModeEdit,
    MdDashboard,
    TfiReload,
    AiOutlineDoubleRight,
    AiOutlineDoubleLeft,
    ImLab,
}

// Returns an icon from the above React icons mapping using the icon name as iconId
export default function Icon({ iconId }: IconProps) {
    const ReactIcon = iconMapping[iconId]

    if (ReactIcon !== undefined) {
        return <ReactIcon />
    }

    return <RiHeartPulseFill />
}
