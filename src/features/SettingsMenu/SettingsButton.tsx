import type { SettingsButtonType } from './SettingsTypes'

function SettingsButton({
    type,
    active,
    text,
    onClick,
}: SettingsButtonType): JSX.Element {
    const genericStyles = 'w-[50%] px-5 py-3 text-base'
    const activeStyles =
        'bg-green-600 hover:opacity-90 text-white pointer cursor-pointer'
    const nonActiveStyles =
        'bg-white border border-solid border-gray-300 text-gray-300'
    const buttonStateStyles = active ? activeStyles : nonActiveStyles

    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            onClick={onClick}
            className={`${genericStyles} ${buttonStateStyles}`}
            disabled={!active}
        >
            {text}
        </button>
    )
}

export default SettingsButton
