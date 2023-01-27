/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
} from 'react-icons/md'
import { RiHeartPulseFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_1b.jpg'
import categoriesData from '../data/categoriesDataMock'

function HeaderNav(): JSX.Element {
    const [sideNavOpen, setSideNavOpen] = useState(false)
    const sideNavClasses = sideNavOpen ? 'open' : ''
    const sideNavIcon = sideNavOpen ? (
        <MdOutlineKeyboardArrowLeft />
    ) : (
        <MdOutlineKeyboardArrowRight />
    )
    const menuCategories = categoriesData.map((category) => {
        return (
            <Link
                to={`/data/${category.name.toLowerCase()}`}
                key={category.name}
                className="flex flex-row items-center gap-2"
            >
                <RiHeartPulseFill />
                {category.name}
            </Link>
        )
    })

    function toggleMenu() {
        setSideNavOpen((prevState) => !prevState)
    }

    return (
        <>
            <header className="flex flex-row justify-between items-center h-16 w-[90%] mx-[5%] bg-white border-b border-solid border-palette-600">
                <div className="flex flex-row items-center">
                    <img className="h-16" src={logo} alt="Healthability logo" />
                    <span className="pt-1 logo-text">ealthabitify</span>
                    <button
                        type="button"
                        className="pt-2 ml-3 text-xl"
                        onClick={toggleMenu}
                    >
                        {sideNavIcon}
                    </button>
                </div>
                <section className="flex flex-row gap-4 mr-4 text-lg">
                    <Link to="/settings">
                        <SlSettings />
                    </Link>
                    <TfiReload />
                    <SlLogout />
                </section>
            </header>
            <nav
                className={`w-auto flex flex-col fixed top-16 left-[5%] pt-3 pr-8 pl-1 pb-8 bg-white border-r border-b border-solid border-palette-600 z-50 ${sideNavClasses}`}
            >
                {menuCategories}
                <Link
                    to="/settings"
                    className="flex flex-row items-center gap-2"
                >
                    <SlSettings />
                    Settings
                </Link>
            </nav>
        </>
    )
}

export default HeaderNav
