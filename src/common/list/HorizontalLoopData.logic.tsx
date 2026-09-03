import { isEmpty } from 'lodash'
import { HorizontalLoopDataLogicProps } from '@/common/list/type/list.type'
import HorizontalDataPreview from '@/component/general/HorizontalDataPreview'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const HorizontalLoopDataLogic = ({
    list = [],
    config = {},
    className = '',
    classNameDataPreview = '',
    isLastMarginBottom = false,
    isNoPadding = false,
}: HorizontalLoopDataLogicProps) => {
    const { titleColumn = 'col-md-3', contentColumn = 'col-md-8' } = config

    return (
        <div
            className={joinClassNameHelper(className, {
                'wrap-last-child-mb-0': isLastMarginBottom,
            })}>
            {list.map((vm = {}, index) => {
                if (!isEmpty(vm)) {
                    return (
                        <HorizontalDataPreview
                            key={index}
                            classNameTitleColumn={titleColumn}
                            classNameContentColumn={contentColumn}
                            isLast={list.length === index + 1}
                            isNoPadding={isNoPadding}
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
