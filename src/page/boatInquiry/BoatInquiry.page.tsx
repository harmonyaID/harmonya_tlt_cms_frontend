import BoatInquiryMainList from '@/page/boatInquiry/component/BoatInquiryMainList.tsx'
import { useParams } from 'react-router'
import { slugToText } from '@/helper/convertText.helper.ts'

const BoatInquiryPage = () => {
    const { slug } = useParams()

    return <BoatInquiryMainList title={slugToText(slug)} />
}

export default BoatInquiryPage
