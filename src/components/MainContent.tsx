import { ReactNode } from 'react'

function MainContent(children: ReactNode) {
    return <main className="grow w-full py-6 px-9">{children && children}</main>
}

export default MainContent
