import { useAppSelector } from '../redux/reduxHooks'

function UpdateMessageContainer() {
    const updateMessagesObjects = useAppSelector(
        (state) => state.utils.updateMessages
    )

    const updateMessages = updateMessagesObjects.map((object) => {
        return <i key={object.id}>{object.message}</i>
    })

    return (
        <header className="fixed top-0 left-0 w-screen h-auto flex flex-col justify-start items-start z-50">
            <ul />
            {updateMessages}
        </header>
    )
}

export default UpdateMessageContainer
