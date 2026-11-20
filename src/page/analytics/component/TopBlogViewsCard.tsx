import Card from '@/component/card/Card.tsx'
import { Eye } from 'iconsax-react'
import { BtnInfo } from '@/component/general/Button.tsx'
import { RotateCcw } from 'react-feather'
import { TopBlogViews } from '@/page/analytics/type/analytics.type.ts'
import { Link } from 'react-router'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { compactNumber } from '@/helper/number.helper.ts'
import { NotAvailable } from '@/component/general/TextDefault.tsx'

const TopBlogViewsCard = ({ blogs }: { blogs: TopBlogViews[] }) => {
    return (
        <Card title="Top 10 Blog view" classNameBlog="h-analytic-card">
            {blogs?.length ? (
                <div className="vstack gap-2 overflow-y-auto max-h-400px">
                    {blogs?.map((blog, idx) => (
                        <div
                            key={blog.id}
                            className="p-3 rounded-3 bg-neutral-700">
                            <div className="row">
                                <div className="col">
                                    <div className="hstack gap-2 align-items-start">
                                        <p className="fw-bold m-0">
                                            #{idx + 1}
                                        </p>
                                        <Link
                                            target="_blank"
                                            to={contentBlogPath.detail(blog.id)}
                                            className="m-0 text-black">
                                            {blog.title}
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="hstack gap-1 justify-content-end">
                                        <Eye size={15} variant="Linear" />
                                        <span>
                                            {compactNumber(blog.totalViews)}
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
export default TopBlogViewsCard
