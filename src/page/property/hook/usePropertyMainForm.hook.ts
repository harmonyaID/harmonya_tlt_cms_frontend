import { useState } from 'react'
import { useParams } from 'react-router'
import { isArray, isEmpty, isObject } from 'lodash'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import {
    propertyMapFormAddress,
    propertyMapFormRoom,
    propertyMapFormDesc,
    propertyInitForm,
    propertyMapInitForm,
} from '@/page/property/param/propertyMainForm.param.ts'
import propertyPath from '@/path/property.path.ts'
import { apiProperty, updateProperty } from '@/service/api/property.api.ts'

const usePropertyMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: propertyPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...propertyInitForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }

    // START TAGS
    const [listTags, setListTags] = useState<any[]>([])

    const _handleTagChoose = (newTag) => {
        if (!isEmpty(newTag)) {
            const checkData = isArray(newTag)
                ? newTag[0]
                : isObject(newTag)
                  ? newTag
                  : {}

            nestedForm._handleArrAddMulti('tagIds', [checkData.id])

            // @ts-ignore
            setListTags((prevState) => [...prevState, checkData])
        }
    }

    const _handleTagRemove = (dataTag) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.tagIds = newState.tagIds.filter(
                (tagId) => tagId !== dataTag.id,
            )

            return newState
        })

        setListTags((prev) => prev.filter((tag) => tag.id !== dataTag.id))
    }
    // END TAGS

    // START AMENITIES
    const [listAmenities, setListAmenities] = useState<any[]>([])

    const _handleAmenitiesChoose = (newAmenity) => {
        if (newAmenity && newAmenity.id) {
            nestedForm._handleArrAddMulti('amenityIds', [newAmenity.id])
            // @ts-ignore
            setListAmenities((prevState) => [...prevState, newAmenity])
        }
    }

    const _handleAmenitiesRemove = (passData) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.amenityIds = newState.amenityIds.filter(
                (amenityId) => amenityId !== passData.id,
            )

            return newState
        })

        setListAmenities((prev) =>
            prev.filter((data) => data.id !== passData.id),
        )
    }
    // END AMENITIES

    // Data Detail
    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiProperty.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        // isHideSidebar: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...propertyMapInitForm(res),
                    tagIds: !isEmpty(res.tags)
                        ? res.tags.map((vm) => vm.id)
                        : [],
                    amenityIds: !isEmpty(res.amenityIds)
                        ? res.amenityIds.map((vm) => vm.id)
                        : [],
                })

                if (res?.tags && res?.tags.length) {
                    setListTags(res?.tags)
                }

                if (res?.amenities && res?.amenities.length) {
                    setListAmenities(res?.amenities)
                }

                // if (res?.thumbnail) {
                //     setPreviewThumbnail(res.thumbnail)
                // }
                //
                // if (res?.seo?.thumbnail) {
                //     setSetSEOThumbnail(res.seo.thumbnail)
                // }
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
                    ? updateProperty(id, formRequest)
                    : apiProperty.add(formRequest),
            setIsLoading,
            isDirectToDetail: true,
        })
    }

    return {
        ...nestedForm,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,

        // Data Page
        __pageStateDataSearch: restored,

        // Tags
        __handleTagChoose: _handleTagChoose,
        __handleTagRemove: _handleTagRemove,
        __listTags: listTags,
        __setListTags: setListTags,

        // Amenities
        __listAmenities: listAmenities,
        __listAmenitiesIds: listAmenities?.map((vm) => vm.id) || [],
        __handleAmenitiesChoose: _handleAmenitiesChoose,
        __handleAmenitiesRemove: _handleAmenitiesRemove,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default usePropertyMainForm
