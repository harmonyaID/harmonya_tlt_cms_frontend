import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import {
    ModalActionCRUDConfig,
    ModalWithActionFormCRUDLogicProps,
} from '@/common/misc/type/miscModal.type'
import FormInput from '@/component/form/FormInput'
import { BtnPrimary } from '@/component/general/Button'
import { TextIconLoading } from '@/component/general/TextDefault'
import ModalMiddle from '@/component/modal/ModalMiddle'
import FormWrap from '@/component/wrapping/Form.wrap'
import { MDGeneralFormCRUD } from '@/config/modal.config'
import { WrapFormContext } from '@/context/Form.context'
import { isSuccess } from '@/helper/base/condition.helper'

const dataConfig: ModalActionCRUDConfig = {
    urlAPIAdd: async () => ({}),
    urlAPIUpdate: async () => ({}),
    initialForm: () => {},
    callBack: () => {},
    emptySelect: () => {},
}

const ModalWithActionFormCRUDLogic = (
    props: ModalWithActionFormCRUDLogicProps,
) => {
    const {
        id = MDGeneralFormCRUD,
        title = 'Category',
        label = 'Name',
        name = 'name',
        placeholder = 'e.g Hotel',
        defaultInputType = 'text',
        detail = {},
        formRequest = {},

        classNameModalDialog = '',

        isEdit = false,
        isHideClose = true,
        isNeedAction = true,
        isUseDefaultInput = true,
        defaultInputNumberOnly = false,

        isCentered = false,
        isScrollable = false,
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
        configHandle.emptySelect()
    }

    const _handleSubmitAdd = (action: boolean = true) => {
        setIsLoading(true)

        configHandle.urlAPIAdd().then((resData) => {
            setIsLoading(false)

            if (isSuccess(resData)) {
                configHandle.callBack(resData.result)

                if (action) {
                    _handleCancel()
                }
            }
        })
    }

    const _handleSubmitUpdate = (action: boolean = true) => {
        setIsLoading(true)

        configHandle.urlAPIUpdate().then((resData) => {
            setIsLoading(false)

            if (isSuccess(resData)) {
                configHandle.callBack(resData.result)

                if (action) {
                    _handleCancel()
                }
            }
        })
    }

    const _handleSubmit = () => {
        isEdit && detail?.id
            ? _handleSubmitUpdate(isNeedAction)
            : _handleSubmitAdd(isNeedAction)
    }

    useEffect(() => {
        if (isEdit) {
            configHandle.initialForm()
        }
    }, [isEdit, detail?.id])

    return (
        <ModalMiddle
            id={id}
            title={(isEdit ? 'Update ' : 'Add ') + title}

            isHideClose={isHideClose}
            isCentered={isCentered}
            isScrollable={isScrollable}

            classNameModalDialog={classNameModalDialog}

            closeAction={_handleCancel}>
            <FormWrap actions={{ handleSubmit: _handleSubmit }}>
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

                <div className="row mt-3">
                    <div className="col-md-12">
                        <BtnPrimary
                            isOutline
                            disabled={isLoading}
                            handle={_handleCancel}
                            className="me-3">
                            Cancel
                        </BtnPrimary>

                        <BtnPrimary type="submit" disabled={isLoading}>
                            <TextIconLoading
                                name={isEdit ? 'Update' : 'Submit'}
                                isAction={isLoading}
                            />
                        </BtnPrimary>
                    </div>
                </div>
            </FormWrap>
        </ModalMiddle>
    )
}

export default ModalWithActionFormCRUDLogic
