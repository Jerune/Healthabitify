/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { RiHeartPulseFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_1b.jpg'
import categoriesData from '../data/categoriesDataMock'

function HeaderNav(): JSX.Element {
    const [sideNavOpen, setSideNavOpen] = useState(false)
    const sideNavClasses = sideNavOpen ? 'open' : ''
    const sideNavIcon = sideNavOpen ? (
        <AiOutlineDoubleLeft />
    ) : (
        <AiOutlineDoubleRight />
    )
    const menuCategories = categoriesData.map((category) => {
        return (
            <Link
                to={`/data/${category.name.toLowerCase()}`}
                key={category.name}
                className="flex flex-row items-center gap-3 py-2"
            >
                <RiHeartPulseFill />
                <span className="text-lg">{category.name}</span>
            </Link>
        )
    })

    function toggleMenu() {
        setSideNavOpen((prevState) => !prevState)
    }

    return (
        <>
            <header className="flex flex-row justify-between items-center h-16 w-full bg-palette-600 text-white border-b border-solid border-palette-600">
                <div className="flex flex-row items-center">
                    <img className="h-16" src={logo} alt="Healthability logo" />
                    <span className="pt-4 -ml-1 logo-text">ealthabitify</span>
                    <button
                        type="button"
                        className="ml-20 mt-4 text-base"
                        onClick={toggleMenu}
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
                {menuCategories}
                <Link
                    to="/settings"
                    className="flex flex-row items-center gap-3 py-2"
                >
                    <SlSettings />
                    <span className="text-lg">Settings</span>
                </Link>
            </nav>
        </>
    )
}

export default HeaderNav
