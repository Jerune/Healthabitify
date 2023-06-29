function SettingsViewSelection(props) {
    const { setDetailView } = props

    return (
        <div className="w-full flex justify-center flex-row items-center gap-12">
            <button
                type="button"
                className="h-24 w-52 rounded-lg border-solid border-2 text-lg bg-white hover:bg-palette-300 hover:italic hover:font-bold hover:border-0 hover:text-xl hover:transition-colors"
                onClick={() => setDetailView('metrics')}
            >
                Metrics
            </button>
            <button
                type="button"
                className="h-24 w-52 rounded-lg border-solid border-2 text-lg bg-white hover:bg-palette-300 hover:italic hover:font-bold hover:border-0 hover:text-xl hover:transition-colors"
                onClick={() => setDetailView('wearables')}
            >
                Wearables
            </button>
        </div>
    )
}

export default SettingsViewSelection
