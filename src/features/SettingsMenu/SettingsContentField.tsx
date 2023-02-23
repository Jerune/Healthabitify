import type { PropsWithChildren } from 'react'

function SettingsContentField({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col justify-center items-start h-vh p-6 gap-6 grow">
            {children}
        </div>
    )
}

export default SettingsContentField
