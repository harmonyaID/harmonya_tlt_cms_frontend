import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { isEmpty, isArray } from 'lodash'
import { MENU_ID } from '@/config/menu.config.ts'
import { MDContentMenuAddMenuItem } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import {
    getSiblingsLength,
    getDepthById,
    upsertMenuItem,
    removeMenuItem,
} from '@/helper/menuTree.helper.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'
import { apiBlogContent, apiMenu } from '@/service/api/contentManage.api.ts'
import { apiLanguage } from '@/service/api/contentManageSetting.api.ts'

const MAX_MENU_DEPTH = 3

const initMenuChildren = {
    menuLabel: '',
    menuUrl: '',
    menuOrder: '',
}

const initMenuParam = {
    menuLabel: '',
    menuUrl: '',
    menuOrder: '',
    menuParent: '',
    children: [],

    typeId: MENU_ID,
}

const initMenuParamMap = (passData) => ({})

const initForm = {
    title: '',
    handle: '',
    groupId: '',
    locale: 'en',
    items: [],

    typeId: MENU_ID,
    description: '',
    featuredImage: '',
}

const initMapForm = (passData) => ({
    title: passData?.title || '',
    handle: passData?.handle || '',
    groupId: passData?.groupId || '',
    locale: passData?.locale || '',

    typeId: passData?.type?.id || MENU_ID,

    items:
        !isEmpty(passData.items) && isArray(passData.items)
            ? passData.items
            : [],
})

const useContentMenuMainFormHook = ({
    isEdit = false,
}: {
    isEdit?: boolean
}) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentMenuPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({
        ...initForm,
    })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiMenu.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...initMapForm(res),
                })
            }
        },
        isAutoGet: isEdit,
    })

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () =>
                isEdit
                    ? apiMenu.update(id, formRequest)
                    : apiMenu.add(formRequest),
            setIsLoading,
            isDirectToDetail: false,
            callBack: () => __handleToMain(),
        })
    }

    const [listLanguages, setListLanguages] = useState([])

    useEffect(() => {
        apiLanguage.list().then((res) => {
            if (isSuccess(res)) {
                setListLanguages(res?.result || [])
            }
        })
    }, [])

    // Menu Parent
    const [formRequestMenuParent, setFormRequestMenuParent] = useState({})

    const [menuTargetParentId, setMenuTargetParentId] = useState(null)

    const [lengthOptionMenu, setLengthOptionMenu] = useState(0)

    const nestedFormMenuParent = useNestedFormHook(
        formRequestMenuParent,
        setFormRequestMenuParent,
    )

    // const _handleMenuParentAddNew = () => {
    //     actionModal(MDContentMenuAddMenuItem, false)
    //
    //     setFormRequest((prevState) => {
    //         const length = prevState.items.length + 1
    //
    //         setFormRequestMenuParent({
    //             ...initMenuParam,
    //             menuOrder: length,
    //         })
    //
    //         setLengthOptionMenu(length)
    //
    //         return prevState
    //     })
    // }
    // const _handleMenuParentCancel = () => {
    //     actionModal(MDContentMenuAddMenuItem, true)
    //     setFormRequestMenuParent({})
    // }
    // const _handleMenuParentEdit = (passData) => {
    //     actionModal(MDContentMenuAddMenuItem, false)
    //     setFormRequestMenuParent(() => ({ ...initMenuParamMap(passData) }))
    // }
    // const _handleMenuPushNew = () => {
    //     setFormRequest((prevState) => {
    //         const newState = { ...prevState }
    //         newState.items.push(formRequestMenuParent)
    //
    //         _handleMenuParentCancel()
    //
    //         return { ...newState }
    //     })
    // }

    // parentId = null artinya nambah di root, atau isi id parent kalau nambah child
    const _handleMenuParentAddNew = (parentId = null) => {
        actionModal(MDContentMenuAddMenuItem, false)
        setMenuTargetParentId(parentId)

        setFormRequest((prevState) => {
            const siblingsLength = getSiblingsLength(prevState.items, parentId)
            const newOrder = siblingsLength + 1

            setFormRequestMenuParent({
                ...initMenuParam,
                menuOrder: newOrder,
                menuParent: parentId || '',
            })

            setLengthOptionMenu(newOrder)

            return prevState
        })
    }

    const _handleMenuParentCancel = () => {
        actionModal(MDContentMenuAddMenuItem, true)
        setFormRequestMenuParent({})
        setMenuTargetParentId(null)
    }

    // passData = item yang mau diedit, parentId = parent dari item itu (null kalau root)
    const _handleMenuParentEdit = (passData, parentId = null) => {
        actionModal(MDContentMenuAddMenuItem, false)
        setMenuTargetParentId(parentId)

        setFormRequest((prevState) => {
            const siblingsLength = getSiblingsLength(prevState.items, parentId)
            setLengthOptionMenu(siblingsLength)
            return prevState
        })

        setFormRequestMenuParent(() => ({
            ...initMenuParamMap(passData),
            ...passData, // pastikan id, menuLabel, menuOrder, dll ikut
        }))
    }

    const _handleMenuPushNew = () => {
        setFormRequest((prevState) => {
            const newItems = upsertMenuItem(
                prevState.items,
                menuTargetParentId,
                formRequestMenuParent,
            )

            _handleMenuParentCancel()

            return { ...prevState, items: newItems }
        })
    }

    const _handleMenuRemove = (id) => {
        setFormRequest((prevState) => ({
            ...prevState,
            items: removeMenuItem(prevState.items, id),
        }))
    }

    // buat dipakai component nge-cek apakah tombol "Add New" (child) boleh muncul
    const _canAddChild = (id) => {
        const depth = getDepthById(formRequest.items, id)
        return depth !== null && depth + 1 < MAX_MENU_DEPTH
    }

    return {
        __formRequest: formRequest,
        __setFormRequest: setFormRequest,
        __isLoading: isLoading,
        __detailData: dataDetail,
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,
        __handleChange: nestedForm._handleChange,
        __handleChangeArr: nestedForm.__handleArrChange,
        __handleArrAddMulti: nestedForm._handleArrAddMulti,

        // Option
        __listLanguages: listLanguages,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,

        // Add New Menu
        __formRequestMenuParent: formRequestMenuParent,
        __setFormRequestMenuParent: setFormRequestMenuParent,
        __changeMenuParent: nestedFormMenuParent._handleChange,
        __handleMenuParentAddNew: _handleMenuParentAddNew,
        __handleMenuParentCancel: _handleMenuParentCancel,
        __handleMenuParentEdit: _handleMenuParentEdit,
        __handleMenuPushNew: _handleMenuPushNew,
        __lengthOptionMenu: lengthOptionMenu,
        __handleMenuRemove: _handleMenuRemove,
        __canAddChild: _canAddChild,
    }
}

export default useContentMenuMainFormHook
