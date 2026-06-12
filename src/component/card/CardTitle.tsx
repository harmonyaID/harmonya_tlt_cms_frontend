import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { CardTitleProps, ConfigCardTitle } from './type/card.type'

const defaultConfig: ConfigCardTitle = {
    isUseDefaultFontSize: true,
    isUseDefaultMargin: true,
}

const CardTitle: FC<CardTitleProps> = ({
    title = '',
    className = '',
    config = { ...defaultConfig },
}) => (
    <div
        className={joinClassNameHelper('fw-500 text-neutral-100', className, {
            'fs-16': config.isUseDefaultFontSize,
            'my-2': config.isUseDefaultMargin,
        })}>
        {title}
    </div>
)

export default CardTitle
