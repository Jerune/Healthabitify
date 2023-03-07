import AuthorizeWearable from '../services/AuthorizeApi'

function Wearables() {
    return (
        <>
            <AuthorizeWearable
                url="https://cloud.ouraring.com/oauth/authorize"
                id="OBGZFELJOIDPH67I"
                scope="daily heartrate workout session"
            />
            <AuthorizeWearable
                url="https://www.fitbit.com/oauth2/authorize"
                id="238Z6R"
                scope="activity cardio_fitness heartrate electrocardiogram oxygen_saturation respiratory_rate sleep temperature weight"
            />
        </>
    )
}

export default Wearables
