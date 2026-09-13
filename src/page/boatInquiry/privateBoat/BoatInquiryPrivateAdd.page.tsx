import BoatInquiryMainList from '@/common/dataFeature/boatInquiry/component/BoatInquiryMainList.tsx'
import BoatInquiryMainForm from '@/common/dataFeature/boatInquiry/component/BoatInquiryMainForm.tsx'
import { boatInquiryPath } from '@/path/boatInquiry.path.ts'

const BoatInquiryPrivatePage = () => {
    return (
        <BoatInquiryMainForm
            title="Private Boat"
            basePath={boatInquiryPath.private}
        />
    )
}

export default BoatInquiryPrivatePage
