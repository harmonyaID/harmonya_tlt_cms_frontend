import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'

const BoatInquiryStatus = ({ status }: { status: any }) => {
    const mapBadgeClass = {
        1: 'bg-neutral-400',
        2: 'bg-blue-200',
        3: 'bg-danger-200',
    }

    return (
        <BadgeStatusGeneral
            value={status?.name}
            className={mapBadgeClass[status?.id]}
        />
    )
}

export default BoatInquiryStatus
