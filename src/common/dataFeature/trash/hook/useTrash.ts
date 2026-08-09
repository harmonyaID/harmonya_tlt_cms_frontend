import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import {
    MDGeneralPermanentRemove,
    MDGeneralRestore,
} from '@/config/modal.config.ts'
import { useState } from 'react'
import { isSuccess } from '@/helper/base/condition.helper.ts'

const useTrash = ({actions, urlAPIRestore, urlAPIPermanentRemove}: {
    actions?: {onSuccess: (data: any) => void},
    urlAPIRestore: any,
    urlAPIPermanentRemove: any,
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        __data: dataRestore,
        __handleChooseAndNextStep: _handleChooseRestore,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRestore, false),
        },
    })

    const {
        __data: dataPermanentRemove,
        __handleChooseAndNextStep: _handleChoosePermanentRemove,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralPermanentRemove, false),
        },
    })

    const _handleRestore = () => {
        setIsLoading(true)

        urlAPIRestore(dataRestore.id)
            .then((res) => {
                if (isSuccess(res)) {
                    actionModal(MDGeneralRestore, true)
                    actions?.onSuccess(res.result)
                }
            })
            .finally(() => setIsLoading(false))
    }

    const _handlePermanentRemove = () => {
        setIsLoading(true)

        urlAPIPermanentRemove(dataPermanentRemove.id)
            .then((res) => {
                if (isSuccess(res)) {
                    actionModal(MDGeneralPermanentRemove, true)
                    actions?.onSuccess(dataPermanentRemove)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return {
        __isLoadingTrash: isLoading,
        __dataRestore: dataRestore,
        __dataPermanentRemove: dataPermanentRemove,
        __handleChooseRestore: _handleChooseRestore,
        __handleChoosePermanentRemove: _handleChoosePermanentRemove,
        __handleRestore: _handleRestore,
        __handlePermanentRemove: _handlePermanentRemove,
    }
}

export default useTrash