import {
    OFFER_PAGE_TYPE,
    STAY_PAGE_TYPE,
} from '@/page/contentAllPages/dataSchema/_typeDataSchema.ts'
import dataOfferPage from '@/page/contentAllPages/dataSchema/dataOfferPage.ts'
import dataStayPage from '@/page/contentAllPages/dataSchema/dataStayPage.ts'

const configDataSchema = {
    [STAY_PAGE_TYPE]: dataStayPage,
    [OFFER_PAGE_TYPE]: dataOfferPage,
}

export default configDataSchema
