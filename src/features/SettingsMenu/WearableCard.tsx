import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { FitbitButton, GoogleSheetsButton, OuraButton } from './wearables'

function WearableCard(props) {
    const { activeCategory } = props
    const dispatch = useAppDispatch()
    const devices = useAppSelector((state) => state.user.devices)
    const { id, name } = activeCategory

    const authenticationButtons = {
        oura: <OuraButton />,
        fitbit: <FitbitButton />,
        bodypedia: <GoogleSheetsButton />,
    }

    if (id !== '' && id !== 'bodypedia') {
        return (
            <div className="w-full p-4 rounded-lg bg-white flex flex-col items-start justify-center text-sm shadow-lg gap-4">
                <h3>{name}</h3>
                <div className="flex flex-row gap-4 w-full">
                    <label className="w-[15%]" id="token">
                        Access Token
                    </label>
                    <input
                        className="w-[85%]"
                        name="token"
                        value={devices[id].token}
                    />
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <label className="w-[15%]" id="lastUpdated">
                        Last Updated
                    </label>
                    <input
                        className="w-[85%]"
                        name="lastUpdated"
                        value={devices[id].lastUpdated}
                    />
                </div>
                {authenticationButtons[id]}
            </div>
        )
    }

    return null
}

export default WearableCard
