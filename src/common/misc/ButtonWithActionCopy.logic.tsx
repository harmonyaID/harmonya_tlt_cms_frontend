import { useState, FC } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Copy } from 'react-feather'
import { isEmpty, isFunction } from 'lodash'
import {
    configCopyClipboard,
    EXAMPLE_COPY_TYPE,
} from '@/config/copyClipboard.config'
import { copyClipboard } from '@/helper/actionCopy.helper'
import { notifySuccess } from '@/helper/base/notifyGeneral.helper'
import { isSuccess } from '@/helper/condition.helper'
import { ButtonWithActionCopyLogicProps } from './type/misc.type'


const dataConfig = {
    urlAPI: async () => ({}),
    callback: () => {},
    emptySelect: () => {},
}

const ButtonWithActionCopyLogic: FC<ButtonWithActionCopyLogicProps> = ({
    data = {},
    copyType = EXAMPLE_COPY_TYPE,

    parseName = 'text',
    className = '',

    isSmall = false,
    isHoverBg = false,
    isBgDarken = false,
    isCopyMap = false,
    isIcon = true,

    isUseAPI = false,

    configHandle = {
        ...dataConfig,
    },
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleCopy = () => {
        setIsLoading(true)

        if (isUseAPI && isFunction(configHandle.urlAPI)) {
            configHandle.urlAPI().then((resData) => {
                setIsLoading(false)
                if (isSuccess(resData)) {
                    copyClipboard(resData.result[parseName], isCopyMap)
                }
            })
        } else {
            setTimeout(() => {
                setIsLoading(false)
                notifySuccess('Copied to clipboard!')
            }, 1000)
        }
    }

    return (
        <CopyToClipboard
            text={configCopyClipboard[copyType](data)}
            onCopy={_handleCopy}>
            {isIcon ? (
                <button
                    className={
                        'rounded-circle border-0 d-flex justify-content-center align-items-center ' +
                        (isSmall ? ' avatar-24' : ' avatar-28') +
                        (isHoverBg ? ' hover-opacity-75-without-pointer' : '') +
                        (!isBgDarken ? ' bg-neutral-500' : ' bg-neutral-200') +
                        (!isEmpty(className) ? ' ' + className : '')
                    }
                    type="button"
                    disabled={isLoading}
                    onClick={(e) => e.stopPropagation()}>
                    <Copy
                        size={18}
                        className={
                            !isBgDarken ? 'text-neutral-100' : 'text-white'
                        }
                    />
                </button>
            ) : (
                <button
                    className={'btn btn-primary btn-sm ' + className}
                    type="button"
                    disabled={isLoading}
                    onClick={(e) => e.stopPropagation()}>
                    Copy <Copy size={14} className="text-neutral-100 ms-1" />
                </button>
            )}
        </CopyToClipboard>
    )
}

export default ButtonWithActionCopyLogic
