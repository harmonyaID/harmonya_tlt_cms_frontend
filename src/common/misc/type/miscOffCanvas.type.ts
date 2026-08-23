// import {
//     ModalWithActionFormCRUDLogicProps,
//     ModalActionCRUDConfig,
// } from '@/common/misc/type/miscModal.type.ts'
//
// // Off Canvas With Action Form CRUD
// export type OffCanvasActionCRUDConfig = ModalActionCRUDConfig
//
// export type OffCanvasWithActionFormCRUDLogicProps = Pick<
//     ModalWithActionFormCRUDLogicProps,
//     | 'id'
//     | 'title'
//     | 'label'
//     | 'name'
//     | 'placeholder'
//     | 'defaultInputType'
//     | 'detail'
//     | 'formRequest'
//     | 'width'
//     | 'isAdd'
//     | 'isEdit'
//     | 'isNeedAction'
//     | 'isUseDefaultInput'
//     | 'defaultInputNumberOnly'
//     | 'isUseDefaultTitle'
//     | 'defaultInputOtherConfig'
//     | 'externalForm'
//     | 'actions'
// > & {
//     className?: string
//     classNameHeader?: string
//     classNameBody?: string
//
//     isUseEmptySelect?: boolean
//
//     isCloseAnywhere?: boolean
//     isRender?: boolean
//
//     configHandle: OffCanvasActionCRUDConfig
// }

import {
    ModalWithActionFormCRUDLogicProps,
    ModalActionCRUDConfig,
} from '@/common/misc/type/miscModal.type'

export type OffCanvasActionCRUDConfig = ModalActionCRUDConfig

export type OffCanvasWithActionFormCRUDLogicProps = Pick<
    ModalWithActionFormCRUDLogicProps,
    | 'id'
    | 'title'
    | 'label'
    | 'name'
    | 'placeholder'
    | 'defaultInputType'
    | 'detail'
    | 'formRequest'
    | 'width'
    | 'isAdd'
    | 'isEdit'
    | 'isNeedAction'
    | 'isUseDefaultInput'
    | 'defaultInputNumberOnly'
    | 'isUseDefaultTitle'
    | 'defaultInputOtherConfig'
    | 'externalForm'
    | 'actions'
> & {
    className?: string
    classNameHeader?: string
    classNameBody?: string
    isUseEmptySelect?: boolean
    isCloseAnywhere?: boolean
    isRender?: boolean
    configHandle: OffCanvasActionCRUDConfig
}
