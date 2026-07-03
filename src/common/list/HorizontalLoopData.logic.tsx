import { isEmpty } from 'lodash'
import { HorizontalLoopDataLogicProps } from '@/common/list/type/list.type'
import HorizontalDataPreview from '@/component/general/HorizontalDataPreview'

const HorizontalLoopDataLogic = ({
    list = [],
    config = {},
    className = '',
    isLastMarginBottom = false,
}: HorizontalLoopDataLogicProps) => {
    const { titleColumn = 'col-md-3', contentColumn = 'col-md-8' } = config

    return (
        <div
            className={
                (isLastMarginBottom ? 'wrap-last-child-mb-0 ' : '') + className
            }>
            {list.map((vm = {}, index) => {
                if (!isEmpty(vm)) {
                    return (
                        <HorizontalDataPreview
                            key={index}
                            classNameTitleColumn={titleColumn}
                            classNameContentColumn={contentColumn}
                            isLast={list.length === index + 1}
                            {...vm}
                        />
                    )
                }

                return null
            })}
        </div>
    )
}

export default HorizontalLoopDataLogic
