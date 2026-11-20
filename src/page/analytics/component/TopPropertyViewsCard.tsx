import Card from '@/component/card/Card.tsx'
import { Eye } from 'iconsax-react'
import { BtnInfo } from '@/component/general/Button.tsx'
import { RotateCcw } from 'react-feather'
import {
    TopBlogViews,
    TopPropertyViews,
} from '@/page/analytics/type/analytics.type.ts'
import { Link } from 'react-router'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { compactNumber } from '@/helper/number.helper.ts'
import PropertyVariantPath from '@/path/propertyVariant.path.ts'
import { NotAvailable } from '@/component/general/TextDefault.tsx'

const TopPropertyViewsCard = ({
    properties,
}: {
    properties: TopPropertyViews[]
}) => {
    return (
        <Card title="Top 10 Property view" classNameBlog="h-analytic-card">
            {properties?.length ? (
                <div className="vstack gap-2 overflow-y-auto max-h-400px">
                    {properties?.map((prop, idx) => (
                        <div
                            key={prop.id}
                            className="p-3 rounded-3 bg-neutral-700">
                            <div className="row">
                                <div className="col">
                                    <div className="hstack gap-2 align-items-start">
                                        <p className="fw-bold m-0">
                                            #{idx + 1}
                                        </p>
                                        <Link
                                            target="_blank"
                                            to={PropertyVariantPath.detail(
                                                prop.id,
                                            )}
                                            className="m-0 text-black">
                                            {prop.nickname}
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="hstack gap-1 justify-content-end">
                                        <Eye size={15} variant="Linear" />
                                        <span>
                                            {compactNumber(prop.totalViews)}
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
export default TopPropertyViewsCard
