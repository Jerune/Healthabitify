import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { changeUpdateMessageStatus } from '../redux/reducers/utilsReducer'

function UpdateMessage() {
    const updateMessageOpen = useAppSelector(
        (state) => state.utils.updateMessageOpen
    )
    const updateMessage = useAppSelector((state) => state.utils.updateMessage)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (updateMessageOpen) {
            setTimeout(() => {
                dispatch(changeUpdateMessageStatus(false))
            }, 3000)
        }
    }, [updateMessageOpen])

    if (updateMessageOpen) {
        return (
            <header className="absolute -top-12 left-0 w-screen h-12 px-4 flex justify-center items-center bg-red-200 z-50 shadow-lg animate-slide-in">
                <p className="w-full h-full m-0 flex justify-center items-center text-black text-lg italic">
                    {updateMessage}
                </p>
            </header>
        )
    }

    return null
}

export default UpdateMessage
