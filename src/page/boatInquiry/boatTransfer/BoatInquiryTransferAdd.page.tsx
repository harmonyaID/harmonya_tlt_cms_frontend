import BoatInquiryMainForm from '@/common/dataFeature/boatInquiry/component/BoatInquiryMainForm.tsx'
import { boatInquiryPath } from '@/path/boatInquiry.path.ts'

const BoatInquiryTransferPage = () => {
    return (
        <BoatInquiryMainForm
            title="Boat Transfer"
            basePath={boatInquiryPath.transfer}
        />
    )
}

export default BoatInquiryTransferPage
