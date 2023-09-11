import { useAppSelector } from '../redux/reduxHooks'
import UpdateMessage from './UpdateMessage'

function UpdateMessageContainer() {
    const updateMessagesObjects = useAppSelector(
        (state) => state.utils.updateMessages
    )

    const updateMessages = updateMessagesObjects.map((object) => {
        return <UpdateMessage key={object.id} message={object.message} />
    })

    return (
        <header className="fixed top-0 left-0 w-screen h-auto flex flex-col justify-start items-start z-50">
            {updateMessages}
        </header>
    )
}

export default UpdateMessageContainer
