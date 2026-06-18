import { FC } from 'react'
import { isEmpty } from 'lodash'
import { TextIconLoading } from './TextDefault'
import { LoadMoreProps } from './type/general.type'

const LoadMore: FC<LoadMoreProps> = ({
    pagination = {},
    title = 'Load More',
    isLoading = false,
    action = {
        onMove: () => {},
    },
}) => {
    return (
        <>
            {!isEmpty(pagination) &&
            pagination.currentPage !== pagination.totalPages ? (
                <div className="w-100 py-3 text-center">
                    <button
                        className="btn btn-sm btn-primary-brand fs-13"
                        type="button"
                        onClick={() =>
                            action?.onMove(pagination.currentPage + 1)
                        }
                        disabled={isLoading}>
                        <TextIconLoading name={title} isAction={isLoading} />
                    </button>
                </div>
            ) : null}
        </>
    )
}

export default LoadMore
