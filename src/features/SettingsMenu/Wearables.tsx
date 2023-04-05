import AuthorizeWearableButton from '../../services/AuthorizeWearableButton'

function Wearables() {
    return (
        <>
            <AuthorizeWearableButton
                url="https://cloud.ouraring.com/oauth/authorize"
                id="OBGZFELJOIDPH67I"
                scope="daily heartrate workout session"
            />
            <AuthorizeWearableButton
                url="https://www.fitbit.com/oauth2/authorize"
                id="238Z6R"
                scope="activity cardio_fitness heartrate electrocardiogram oxygen_saturation respiratory_rate sleep temperature weight settings"
            />
        </>
    )
}

export default Wearables
