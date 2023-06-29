import type { PropsWithChildren } from 'react'

function SettingsContentField({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col justify-start items-start h-vh py-6 px-10 gap-6 grow">
            {children}
        </div>
    )
}

export default SettingsContentField
