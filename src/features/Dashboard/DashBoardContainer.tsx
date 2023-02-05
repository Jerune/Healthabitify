import type { PropsWithChildren } from 'react'

function DashBoardContainer({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-row flex-wrap py-8 px-12 justify-between gap-16 w-full ">
            {children}
            <div className="grow"> </div>
        </div>
    )
}

export default DashBoardContainer
