import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'

const localeDefault = 'en'
export const initPageMainForm = {
    // value: {},
    title: '',
    content: '',
    description: '',
    shortDescription: '',
    status: '',
    locale: localeDefault,
    template: '',
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
    template: passData?.template || '',
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})
