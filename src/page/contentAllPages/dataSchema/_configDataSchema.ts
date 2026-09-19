// import {
//     BLOG_PAGE_TYPE,
//     OFFER_PAGE_TYPE,
//     STAY_PAGE_TYPE,
// } from '@/page/contentAllPages/dataSchema/_typeDataSchema.ts'
import {
    TEMPLATE_BLOG,
    TEMPLATE_EXPERIENCE,
    TEMPLATE_INFO_FAQ,
    TEMPLATE_INFO_PRIVACY_POLICY,
    TEMPLATE_INFO_TNC,
    TEMPLATE_OFFER,
    TEMPLATE_PROPERTY,
} from '@/config/pageTemplate.config.ts'
import dataBlogPage from '@/page/contentAllPages/dataSchema/dataBlogPage.ts'
import dataExperiencePage from '@/page/contentAllPages/dataSchema/dataExperiencePage.ts'
import {
    dataFAQInfoPage,
    dataGeneralAndContentInfoPage,
} from '@/page/contentAllPages/dataSchema/dataInfoPage.ts'
import dataOfferPage from '@/page/contentAllPages/dataSchema/dataOfferPage.ts'
import dataPropertyPage from '@/page/contentAllPages/dataSchema/dataPropertyPage.ts'

const configDataSchema = {
    [TEMPLATE_BLOG]: dataBlogPage,
    [TEMPLATE_PROPERTY]: dataPropertyPage,
    [TEMPLATE_OFFER]: dataOfferPage,
    [TEMPLATE_EXPERIENCE]: dataExperiencePage,

    // Info Page
    [TEMPLATE_INFO_FAQ]: dataFAQInfoPage,
    [TEMPLATE_INFO_TNC]: dataGeneralAndContentInfoPage,
    [TEMPLATE_INFO_PRIVACY_POLICY]: dataGeneralAndContentInfoPage,
}

export default configDataSchema
