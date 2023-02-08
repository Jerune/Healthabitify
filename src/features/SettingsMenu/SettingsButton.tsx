import type { SettingsButtonType } from './SettingsTypes'

function SettingsButton({ item }: SettingsButtonType): JSX.Element {
    return (
        <button
            type="button"
            className="flex justify-center items-center py-4 px-6 border-b border-solid border-black hover:bg-palette-500 hover:text-white"
        >
            {item}
        </button>
    )
}

export default SettingsButton
