import MainContent from '../components/MainContent'

function NotFound() {
    return (
        <MainContent>
            <div className="flex flex-col pl-[20%] w-full justify-start items-start">
                <h1 className="italic font-bold">Not Found</h1>
                <p className="text-base mt-4">
                    The URL you have entered does not exists. Please open the
                    main menu and select an option from the list.
                </p>
            </div>
        </MainContent>
    )
}

export default NotFound
