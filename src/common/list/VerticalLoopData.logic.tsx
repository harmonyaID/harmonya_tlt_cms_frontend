import VerticalDataPreview from '@/component/general/VerticalDataPreview'
import { VerticalLoopDataLogicProps } from './type/list.type'


const VerticalLoopDataLogic = ({
    list = [],
    config = {},
}: VerticalLoopDataLogicProps) => {
    const { titleColumn = '', contentColumn = '' } = config

    return (
        <div className="wrap-last-child-mb-0">
            {list.map((vm = {}, index) => {
                return (
                    <VerticalDataPreview
                        key={index}
                        classNameTitleColumn={titleColumn}
                        classNameContentColumn={contentColumn}
                        {...vm}
                    />
                )
            })}
        </div>
    )
}

export default VerticalLoopDataLogic
