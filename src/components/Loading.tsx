interface LoadingProps {
    size: number
}

export default function Loading({ size }: LoadingProps) {
    return (
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
    )
}
