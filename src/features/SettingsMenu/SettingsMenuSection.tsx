import type { PropsWithChildren } from 'react'

function SettingsMenuSection({ children }: PropsWithChildren) {
    return (
        <section className="flex flex-col justify-start items-center gap-4 h-vh overflow-y-auto pt-6 pl-6">
            {children}
        </section>
    )
}

export default SettingsMenuSection
