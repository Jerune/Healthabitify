import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { changeLoadingStatus } from '../redux/reducers/utilsReducer'

interface LoadingProps {
    size: number
}

export default function Loading({ size }: LoadingProps) {
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const loadingMessage = useAppSelector((state) => state.utils.loadingMessage)
    const allAverages = useAppSelector((state) => state.averages)
    const dispatch = useAppDispatch()

    // Keeps loader true until all averages have been calculated
    useEffect(() => {
        const yearsFromAverages = Object.keys(allAverages)
        // Check if data from 2023 is loaded in averages
        if (yearsFromAverages.includes('Y2023')) {
            dispatch(changeLoadingStatus(false))
        }
    }, [allAverages])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-white">
                <div className="w-[50%] flex justify-center items-center h-10">
                    <div
                        style={{ width: `${size}px`, height: `${size}px` }}
                        className="animate-spin"
                    >
                        <div
                            className="h-full w-full border-4 border-t-palette-500
           border-b-palette-500 rounded-[50%]"
                        />
                    </div>
                </div>
                <h3>{loadingMessage}</h3>
            </div>
        )
    }

    return null
}
