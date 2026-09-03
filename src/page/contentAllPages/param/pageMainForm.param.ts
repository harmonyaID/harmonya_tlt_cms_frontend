import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'

export const initPageMainForm = {
    // value: {},
    title: '',
    content: '',
    description: '',
    shortDescription: '',
    status: '',
    locale: '',
    seo: {
        ...initSEOFormConfig,
    },
}

export const initMapPageMainForm = (passData) => ({
    // value: {},
    title: passData?.title || '',
    content: passData?.content || '',
    description: passData?.description || '',
    shortDescription: passData?.shortDescription || '',
    status: passData?.status || '',
    locale: passData?.locale || '',
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})
