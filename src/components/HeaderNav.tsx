/* eslint-disable react/jsx-no-bind */
import { SlLogout, SlSettings } from 'react-icons/sl'
import { MdDashboard } from 'react-icons/md'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { ImLab } from 'react-icons/im'
import * as Icons from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { toggleMenu } from '../redux/reducers/utilsReducer'
import categoriesData from '../data/categoriesDataMock'
import logo from '../assets/logo_1b.jpg'
import LogoText from './LogoText'
import { localSignOut } from '../redux/reducers/usersReducer'

function HeaderNav(): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const sideNavOpen = useAppSelector((state) => state.utils.sideNavOpen)
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
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
                <button type="button" className="text-xl">
                    <IconElement />
                </button>
                <span className="text-lg">{category.name}</span>
            </Link>
        )
    })

    function signOutUser() {
        signOut(auth).then(() => {
            dispatch(localSignOut())
            navigate('/')
        })
    }

    return (
        <>
            <header className="flex flex-row justify-between items-center h-16 w-full bg-palette-600 text-white border-b border-solid border-palette-600">
                <div className="flex flex-row items-center">
                    <Link to="/" onClick={() => dispatch(toggleMenu())}>
                        <img
                            className="h-16"
                            src={logo}
                            alt="Healthability logo"
                        />
                    </Link>
                    <LogoText />
                    {isLoggedIn && (
                        <button
                            type="button"
                            className="ml-20 mt-4 text-base"
                            onClick={() => dispatch(toggleMenu())}
                        >
                            {sideNavIcon}
                        </button>
                    )}
                </div>
                {isLoggedIn && (
                    <section className="flex flex-row gap-6 mr-8 text-lg">
                        <Link to="/settings">
                            <SlSettings />
                        </Link>
                        <TfiReload />
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={signOutUser}
                        >
                            <SlLogout />
                        </button>
                    </section>
                )}
            </header>
            <nav
                className={`w-auto h-full flex flex-col fixed top-16 left-0 py-5 pl-8 pr-10 bg-white shadow-lg z-50 ${sideNavClasses}`}
            >
                <Link
                    to="/"
                    className="flex flex-row items-center gap-3 py-2"
                    onClick={() => dispatch(toggleMenu())}
                >
                    <button type="button" className="text-xl">
                        <MdDashboard />
                    </button>
                    <span className="text-lg">Dashboard</span>
                </Link>
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
