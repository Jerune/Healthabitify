import type { PropsWithChildren } from 'react'

function DashBoardContainer({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-row flex-wrap gap-16 w-full ">{children}</div>
    )
}

export default DashBoardContainer
