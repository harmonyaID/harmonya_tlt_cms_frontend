import { FC, useEffect, useState } from 'react'
import { isEmpty, isFunction } from 'lodash'
import {
    OffCanvasActionCRUDConfig,
    OffCanvasWithActionFormCRUDLogicProps,
} from '@/common/misc/type/miscOffCanvas.type.ts'
import FormInput from '@/component/form/FormInput'
import { BtnPrimary } from '@/component/general/Button'
import { TextIconLoading } from '@/component/general/TextDefault'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral'
import { OCGeneralFormCRUD } from '@/config/offCanvas.config'
import { WrapFormContext } from '@/context/Form.context'
import { isSuccess } from '@/helper/base/condition.helper'

const dataConfig: OffCanvasActionCRUDConfig = {
    urlAPIAdd: async () => ({}),
    urlAPIUpdate: async () => ({}),
    initialForm: () => {},
    callBack: () => {},
    emptySelect: () => {},
}

const OffCanvasWithActionFormCRUDLogic: FC<
    OffCanvasWithActionFormCRUDLogicProps
> = (props) => {
    const {
        id = OCGeneralFormCRUD,
        title = 'Inactive',
        label = 'Name',
        name = 'name',
        placeholder = 'e.g Hotel',
        defaultInputType = 'text',
        detail = {},
        formRequest = {},

        width = '50vw',

        className = 'offcanvas-end',
        classNameHeader = '',
        classNameBody = '',

        isAdd = false,
        isEdit = false,
        isNeedAction = true,
        isUseEmptySelect = true,

        isUseDefaultInput = true,
        defaultInputNumberOnly = false,

        isCloseAnywhere = true,
        isRender = true,
        isUseDefaultTitle = true,

        defaultInputOtherConfig = {},
        externalForm = null,

        actions = {
            change: () => {},
            toggleModal: () => {},
            other: {},
        },
        configHandle = {
            ...dataConfig,
        },
    } = props

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleCancel = () => {
        actions.toggleModal({})

        if (isUseEmptySelect && isFunction(configHandle.emptySelect)) {
            configHandle.emptySelect()
        }
    }

    const _handleSubmitAdd = (action: boolean = true) => {
        setIsLoading(true)

        configHandle
            .urlAPIAdd()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    configHandle.callBack(resData.result)

                    if (action) {
                        _handleCancel()
                    }
                }
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    const _handleSubmitUpdate = (action: boolean = true) => {
        setIsLoading(true)

        configHandle
            .urlAPIUpdate()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    configHandle.callBack(resData.result)

                    if (action) {
                        _handleCancel()
                    }
                }
            })
            .catch((err) => {
                console.log('err', err)
                setIsLoading(false)
            })
    }

    const _handleSubmit = () => {
        isEdit && !isAdd && detail?.id
            ? _handleSubmitUpdate(isNeedAction)
            : _handleSubmitAdd(isNeedAction)
    }

    useEffect(() => {
        if (isEdit && isFunction(configHandle.initialForm)) {
            configHandle.initialForm()
        }
    }, [isEdit, detail?.id])

    useEffect(() => {
        if (isCloseAnywhere) {
            const offCanvas = document.getElementById(id)

            offCanvas.addEventListener('hidden.bs.offcanvas', () => {
                if (isUseEmptySelect && isFunction(configHandle.emptySelect)) {
                    configHandle.emptySelect()
                }
            })
        }
    }, [])

    return (
        <OffCanvasGeneral
            id={id}
            title={
                isUseDefaultTitle
                    ? (isEdit && !isAdd ? 'Update ' : 'Add ') + title
                    : title
            }
            width={width}
            className={className}
            classNameHeader={classNameHeader}
            classNameBody={classNameBody}
            isCloseAnywhere={isCloseAnywhere}
            closeAction={_handleCancel}
            isUseFooter
            footerContent={
                <>
                    <div className="row">
                        <div className="col-md-12">
                            <BtnPrimary
                                isOutline
                                disabled={isLoading}
                                handle={_handleCancel}
                                className="me-3">
                                Cancel
                            </BtnPrimary>

                            <BtnPrimary
                                disabled={isLoading}
                                type="button"
                                handle={_handleSubmit}>
                                <TextIconLoading
                                    name={
                                        isEdit && !isAdd ? 'Update' : 'Submit'
                                    }
                                    isAction={isLoading}
                                />
                            </BtnPrimary>
                        </div>
                    </div>
                </>
            }>
            {isRender ? (
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: (name, value) => actions.change(name, value),
                        ...(!isEmpty(actions.other) ? actions.other : {}),
                    }}>
                    {isUseDefaultInput ? (
                        <FormInput
                            label={label}
                            name={name}
                            placeholder={placeholder}
                            type={defaultInputType}
                            isNumberOnly={defaultInputNumberOnly}
                            required
                            {...defaultInputOtherConfig}
                        />
                    ) : null}

                    {!isEmpty(externalForm) ? externalForm : null}
                </WrapFormContext>
            ) : null}
        </OffCanvasGeneral>
    )
}

export default OffCanvasWithActionFormCRUDLogic
