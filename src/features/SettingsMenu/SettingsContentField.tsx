import type { PropsWithChildren } from 'react'

function SettingsContentField({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col justify-start items-start w-full h-vh p-4 grow">
            {children}
        </div>
    )
}

export default SettingsContentField
