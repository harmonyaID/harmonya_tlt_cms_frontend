import BoatInquiryMainForm from '@/page/boatInquiry/component/BoatInquiryMainForm.tsx'
import { useParams } from 'react-router'
import { slugToText } from '@/helper/convertText.helper.ts'

const BoatInquiryAddPage = () => {
    const { slug } = useParams()

    return <BoatInquiryMainForm title={slugToText(slug)} />
}

export default BoatInquiryAddPage
