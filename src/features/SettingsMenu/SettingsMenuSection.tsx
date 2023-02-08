import type { PropsWithChildren } from 'react'

function SettingsMenuSection({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col justify-start h-vh border-r border-solid overflow-y-auto border-black">
            {children}
        </div>
    )
}

export default SettingsMenuSection
