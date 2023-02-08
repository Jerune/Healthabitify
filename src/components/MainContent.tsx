import type { PropsWithChildren } from 'react'

function MainContent({ children }: PropsWithChildren) {
    return (
        <main className="flex flex-col justify-center items-start grow w-full py-6">
            {children}
        </main>
    )
}

export default MainContent
