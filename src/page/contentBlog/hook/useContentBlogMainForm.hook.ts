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
import { apiBlogContent } from '@/service/api/contentManage.api.ts'

const defaultActive = '1'

const initForm = {
    categoryId: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '', // text editor
    author: '',
    publishedAt: formatDatePublish() || '',
    isActive: defaultActive,
    tagIds: [],
    thumbnail: '',
    seo: {
        ...initSEOFormConfig,
    },
}

const initMapForm = (passData) => ({
    categoryId: passData?.category?.id || '',
    title: passData?.title || '',
    slug: passData?.slug || '',
    excerpt: passData?.excerpt || '',
    content: passData?.content || '', // text editor
    author: passData?.author || '',
    publishedAt: formatDatePublish() || '',
    isActive: passData?.isActive ? defaultActive : '0',
    tagIds: [],
    thumbnail: '',
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})

const useContentBlogMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const { __profile } = useGlobalPrivateContext()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentBlogPath,
            pathFromKey: restored.from,
        })

    const [previewThumbnail, setPreviewThumbnail] = useState('')

    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const [formRequest, setFormRequest] = useState({
        ...initForm,
        author: __profile?.fullName || '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const [listTags, setListTags] = useState<any[]>([])

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleChangeTitle = (value) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.title = value
            newState.slug = textSlug(value)

            return newState
        })
    }

    const _handleTagChoose = (newTag) => {
        if (!isEmpty(newTag)) {
            const checkData = isArray(newTag)
                ? newTag[0]
                : isObject(newTag)
                  ? newTag
                  : {}

            nestedForm._handleArrAddMulti('tagIds', [checkData.id])

            // @ts-ignore
            setListTags((prevState) => [...prevState, ...newTag])
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
        urlAPI: () => apiBlogContent.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...initMapForm(res),
                    tagIds: res.tags.map((vm) => vm.id),
                    author: res.author || __profile?.fullName || '',
                })

                if (res?.tags && res?.tags.length) {
                    setListTags(res?.tags)
                }

                if (res?.thumbnail) {
                    setPreviewThumbnail(res.thumbnail)
                }

                if (res?.seo?.thumbnail) {
                    setSetSEOThumbnail(res.seo.thumbnail)
                }
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
                    ? apiBlogContent.updateWithData(id, formRequest)
                    : apiBlogContent.addWithData(formRequest),
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

        __handleTagChoose: _handleTagChoose,
        __handleTagRemove: _handleTagRemove,

        __listTags: listTags,
        __setListTags: setListTags,

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

export default useContentBlogMainForm
