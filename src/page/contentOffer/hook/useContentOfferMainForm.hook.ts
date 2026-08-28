import { useState } from 'react'
import { useParams } from 'react-router'
import { isArray, isEmpty, isObject } from 'lodash'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { textSlug } from '@/helper/convertText.helper.ts'
import { formatDatePublish } from '@/helper/formatDate.helper.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import {
    apiBlogContent,
    apiOfferContent,
} from '@/service/api/contentManage.api.ts'
import moment from 'moment'
import contentOfferPath from '@/path/contentOffer.path.ts'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper.ts'

const defaultActive = '1'

const initForm = {
    title: '',
    slug: '',
    excerpt: '',
    content: '', // text editor
    publishedAt: moment().format('DD/MM/YYYY') || '',
    startDate: moment().format('DD/MM/YYYY') || '',
    endDate: moment().format('DD/MM/YYYY') || '',
    isActive: defaultActive,
    propertyIds: [],
    locale: 'en',
    thumbnail: '',
    seo: {
        ...initSEOFormConfig,
    },
}

const initMapForm = (passData) => ({
    title: passData?.title || '',
    slug: passData?.slug || '',
    excerpt: passData?.excerpt || '',
    content: passData?.content || '', // text editor
    publishedAt: passData?.publishedAt || moment().format('DD/MM/YYYY'),
    startDate: passData?.startDate || moment().format('DD/MM/YYYY'),
    endDate: passData?.endDate || moment().format('DD/MM/YYYY'),
    isActive: passData?.isActive ? defaultActive : '0',
    thumbnail: passData?.thumbnail || '',
    propertyIds: passData?.properties?.map((p) => p.id),
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})

const useContentOfferMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const { __profile } = useGlobalPrivateContext()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentOfferPath,
            pathFromKey: restored.from,
        })

    const [previewThumbnail, setPreviewThumbnail] = useState('')

    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const [formRequest, setFormRequest] = useState({
        ...initForm,
        author: __profile?.fullName || '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const [listProperties, setListProperties] = useState<any[]>([])

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleChangeTitle = (value) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.title = value
            newState.slug = textSlug(value)

            return newState
        })
    }

    const _handleThumbnailRemove = () => {
        setPreviewThumbnail('')
        nestedForm.__handleChange('thumbnail', '')
        // if (isEdit) {
        //     nestedForm.__handleChange('deleteThumbnail', '')
        // }
    }

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiOfferContent.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...initMapForm(res),
                    author: res.author || __profile?.fullName || '',
                })

                if (res?.thumbnail) {
                    setPreviewThumbnail(res.thumbnail)
                }

                if (res?.seo?.thumbnail) {
                    setSetSEOThumbnail(res.seo.thumbnail)
                }

                if (!isEmpty(res?.properties)) {
                    setListProperties(res?.properties)
                }
            }
        },
        isAutoGet: isEdit,
    })

    const _handlePropertyChoose = (newProperty) => {
        if (!isEmpty(newProperty)) {
            const checkData = isArray(newProperty)
                ? newProperty[0]
                : isObject(newProperty)
                  ? newProperty
                  : {}

            nestedForm._handleArrAddMulti('propertyIds', [checkData.id])

            // @ts-ignore
            setListProperties((prevState) => [...prevState, ...newProperty])
        }
    }

    const _handlePropertyRemove = (dataProperty) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.propertyIds = newState.propertyIds.filter(
                (id) => id !== dataProperty.id,
            )

            return newState
        })

        setListProperties((prev) =>
            prev.filter((property) => property.id !== dataProperty.id),
        )
    }

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleSubmit = () => {
        const payload = {
            ...formRequest,
            startDate: actionFormatDateStrict(
                formRequest.startDate,
                'YYYY-MM-DD',
            ),
            endDate: actionFormatDateStrict(formRequest.endDate, 'YYYY-MM-DD'),
            publishedAt: actionFormatDateStrict(
                formRequest.publishedAt,
                'YYYY-MM-DD',
            ),
        }

        return __handleSubmit({
            apiCall: () =>
                isEdit
                    ? apiOfferContent.updateWithData(id, payload)
                    : apiOfferContent.addWithData(payload),
            setIsLoading,
            isDirectToDetail: true,
        })
    }

    return {
        __formRequest: formRequest,
        __setFormRequest: setFormRequest,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,
        __handleChange: nestedForm._handleChange,
        __handleChangeArr: nestedForm.__handleArrChange,
        __handleArrAddMulti: nestedForm._handleArrAddMulti,
        __handleChangeWithParent: nestedForm._handleChangeWithParent,
        __handleChangeTitle: _handleChangeTitle,

        __listProperties: listProperties,
        __setListProperties: setListProperties,
        __handlePropertyChoose: _handlePropertyChoose,
        __handlePropertyRemove: _handlePropertyRemove,

        __previewThumbnail: previewThumbnail,
        __setPreviewThumbnail: setPreviewThumbnail,
        __handleThumbnailRemove: _handleThumbnailRemove,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useContentOfferMainForm
