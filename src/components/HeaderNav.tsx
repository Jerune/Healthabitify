import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { ImLab } from 'react-icons/im'
import { Link } from 'react-router-dom'
import * as Icons from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { toggleMenu } from '../redux/reducers/utilsReducer'
import categoriesData from '../data/categoriesDataMock'
import logo from '../assets/logo_1b.jpg'

function HeaderNav(): JSX.Element {
    const dispatch = useAppDispatch()
    const sideNavOpen = useAppSelector((state) => state.utils.sideNavOpen)
    const sideNavClasses = sideNavOpen ? 'open' : ''
    const sideNavIcon = sideNavOpen ? (
        <AiOutlineDoubleLeft />
    ) : (
        <AiOutlineDoubleRight />
    )

    const menuCategories = categoriesData.map((category) => {
        const IconElement = Icons[category.iconName]

        return (
            <Link
                to={`/data/${category.name.toLowerCase()}`}
                key={category.name}
                className="flex flex-row items-center gap-3 py-2"
                onClick={() => dispatch(toggleMenu())}
            >
                <span className="text-xl">
                    <IconElement />
                </span>
                <span className="text-lg">{category.name}</span>
            </Link>
        )
    })

    return (
        <>
            <header className="flex flex-row justify-between items-center h-16 w-full bg-palette-600 text-white border-b border-solid border-palette-600">
                <div className="flex flex-row items-center">
                    <img className="h-16" src={logo} alt="Healthability logo" />
                    <span className="pt-4 -ml-1 logo-text">ealthabitify</span>
                    <button
                        type="button"
                        className="ml-20 mt-4 text-base"
                        onClick={() => dispatch(toggleMenu())}
                    >
                        {sideNavIcon}
                    </button>
                </div>
                <section className="flex flex-row gap-6 mr-8 text-lg">
                    <Link to="/settings">
                        <SlSettings />
                    </Link>
                    <TfiReload />
                    <SlLogout />
                </section>
            </header>
            <nav
                className={`w-auto h-full flex flex-col fixed top-16 left-0 py-5 pl-8 pr-10 bg-white shadow-lg z-50 ${sideNavClasses}`}
            >
                <div>{menuCategories}</div>
                <div className="mt-6">
                    <Link
                        to="/labs"
                        className="flex flex-row items-center gap-3 py-2"
                        onClick={() => dispatch(toggleMenu())}
                    >
                        <ImLab />
                        <span className="text-base">Labs</span>
                    </Link>
                    <Link
                        to="/settings"
                        className="flex flex-row items-center gap-3 py-2"
                        onClick={() => dispatch(toggleMenu())}
                    >
                        <SlSettings />
                        <span className="text-base">Settings</span>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default HeaderNav
