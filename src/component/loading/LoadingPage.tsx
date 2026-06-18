import LoadingSpinner from '@/component/loading/LoadingSpinner.tsx'

const LoadingInPage = () => (
    <div className="w-100 py-4 bg-white b-rad-5">
        <div className="h5 fw-400 text-center mb-0 text-neutral-200">
            Please wait <LoadingSpinner />
        </div>
    </div>
)

export default LoadingInPage
