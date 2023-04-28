import type { PropsWithChildren } from 'react'

function DashBoardContainer({ children }: PropsWithChildren) {
    return (
        <div className="grid justify-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8 px-10 lg:px-20 gap-8 w-full ">
            {children}
        </div>
    )
}

export default DashBoardContainer
