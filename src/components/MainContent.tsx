import type { PropsWithChildren } from 'react'

function MainContent({ children }: PropsWithChildren) {
    return (
        <main className="flex flex-col items-center grow w-full py-6 px-9">
            {children}
        </main>
    )
}

export default MainContent
