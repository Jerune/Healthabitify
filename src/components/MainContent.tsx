import type { PropsWithChildren } from 'react'

function MainContent({ children }: PropsWithChildren) {
    return (
        <main className="flex flex-col justify-center items-start grow w-full pb-6">
            {children}
        </main>
    )
}

export default MainContent
