import type { SettingsLabelType } from './SettingsTypes'

function SettingsLabel({ name, children }: SettingsLabelType) {
    return (
        <label htmlFor={name} className="text-sm italic underline mb-1">
            {children}
        </label>
    )
}

export default SettingsLabel
