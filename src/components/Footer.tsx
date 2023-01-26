import { AiOutlineCopyright } from 'react-icons/ai'

function Footer(): JSX.Element {
    return (
        <footer className="flex flex-row justify-end align-middle h-8 text-xs w-[90%] mx-[5%] border-t pt-2 border-solid border-palette-600">
            <span className="mr-1 pt-[1px]">
                <AiOutlineCopyright />
            </span>
            <span>{new Date().getFullYear()} Healthabitify </span>
        </footer>
    )
}

export default Footer
