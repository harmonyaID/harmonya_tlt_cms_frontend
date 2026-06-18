import LoadingSpinner from '@/component/loading/LoadingSpinner.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { LoadingNotAvailableProps } from './type/loading.type'

const LoadingNotAvailable = ({
    isLoading,
    className = '',
    isCard = true,
}: LoadingNotAvailableProps) => {
    return (
        <div
            className={joinClassNameHelper(
                'w-100 py-4',
                isCard && 'bg-white b-rad-5',
                className,
            )}>
            <div className="h5 fw-400 text-center mb-0 text-neutral-200">
                {isLoading ? (
                    <>
                        Please wait <LoadingSpinner />
                    </>
                ) : (
                    'Not Available'
                )}
            </div>
        </div>
    )
}

export default LoadingNotAvailable
