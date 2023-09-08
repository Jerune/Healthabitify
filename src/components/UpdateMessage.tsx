import { useEffect, useState } from 'react'
import { UpdateMessageProps } from './_types'
import Icon from './icon'

function UpdateMessage({ message }: UpdateMessageProps) {
    const [updateMessageOpen, setUpdateMessageOpen] = useState(true)

    useEffect(() => {
        if (updateMessageOpen) {
            setTimeout(() => {
                setUpdateMessageOpen(false)
            }, 10000)
        }
    }, [updateMessageOpen])

    if (updateMessageOpen) {
        return (
            <article className="w-screen relative h-12 px-4 mb-2 flex justify-center items-center bg-red-200 z-50 shadow-lg animate-slide-in">
                <button
                    type="button"
                    id="close"
                    onClick={() => setUpdateMessageOpen(false)}
                    className="absolute right-4 top-4 z-50"
                >
                    <Icon iconId="TfiClose" />
                </button>
                <p className="w-full h-full m-0 flex justify-center items-center text-black text-lg italic">
                    {message}
                </p>
            </article>
        )
    }

    return null
}

export default UpdateMessage
