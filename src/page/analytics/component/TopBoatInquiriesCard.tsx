import Card from '@/component/card/Card.tsx'
import { Eye, Receipt, ReceiptText } from 'iconsax-react'
import { BtnInfo } from '@/component/general/Button.tsx'
import { RotateCcw } from 'react-feather'
import {
    TopBlogViews,
    TopBoatInquiries,
} from '@/page/analytics/type/analytics.type.ts'
import { Link } from 'react-router'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { compactNumber } from '@/helper/number.helper.ts'
import { NotAvailable } from '@/component/general/TextDefault.tsx'

const TopBoatInquiriesCard = ({
    inquiries,
}: {
    inquiries: TopBoatInquiries[]
}) => {
    return (
        <Card title="Top Boat Inquiries" classNameBlog="h-analytic-card">
            {inquiries?.length ? (
                <div className="vstack gap-2 overflow-y-auto max-h-400px">
                    {inquiries?.map((inq, idx) => (
                        <div
                            key={inq.id}
                            className="p-3 rounded-3 bg-neutral-700">
                            <div className="row">
                                <div className="col">
                                    <div className="hstack gap-2 align-items-start">
                                        <p className="fw-bold m-0">
                                            #{idx + 1}
                                        </p>
                                        <p className="m-0 text-black">
                                            {inq.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="hstack gap-1 justify-content-end">
                                        <ReceiptText
                                            size={15}
                                            variant="Linear"
                                        />
                                        <span>
                                            {compactNumber(inq.totalInquiries)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NotAvailable />
            )}
        </Card>
    )
}
export default TopBoatInquiriesCard
