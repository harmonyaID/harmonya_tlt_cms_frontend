import { CloseCircle } from 'iconsax-react'
import LoadingSpinner from '@/component/loading/LoadingSpinner.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { LoadingNotAvailableProps } from './type/loading.type'

const LoadingNotAvailable = ({
    isLoading,
    className = '',
    isCard = true,
    isNotFound = false,
}: LoadingNotAvailableProps) => {
    const msgEmpty = 'Not Available'
    const msgNotFound = 'No Data Found'

    return (
        <div
            className={joinClassNameHelper(
                'w-100 py-4',
                isCard && 'bg-white b-rad-5',
                className,
            )}>
            <div className="h5 fw-500 text-center mb-0 text-neutral-200">
                {isLoading ? (
                    <>
                        Please wait <LoadingSpinner />
                    </>
                ) : isNotFound ? (
                    <div className="hstack gap-2 justify-content-center">
                        {/*<CloseCircle variant="Bulk" size={28} />*/}

                        {msgNotFound}
                    </div>
                ) : (
                    msgEmpty
                )}
            </div>
        </div>
    )
}

export default LoadingNotAvailable
