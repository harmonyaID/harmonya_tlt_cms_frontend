import { objectListDetail } from '@/config/objectList.config.ts'
import ContentMedia from '@/component/general/ContentMedia.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'

const TabListContent = ({
    tabId = 'section-tabs',
    tabs = [],
}: {
    tabId: string
    tabs: any[]
}) => {
    const tabPointId = tabId + '-point-content'

    const tabContent = tabId + '-content'

    const btnTabId = (index) => tabPointId + 'tab-' + index

    const tabTargetId = (index) => tabPointId + '-tab-pane-' + index

    return (
        <>
            <ul className="nav nav-tabs" id={tabId} role="tablist">
                {tabs.map((tab, index) => (
                    <li key={index} className="nav-item" role="presentation">
                        <button
                            className={
                                'nav-link ' + (index < 1 ? 'active' : '')
                            }
                            id={btnTabId(index)}
                            data-bs-toggle="tab"
                            data-bs-target={'#' + tabTargetId(index)}
                            type="button"
                            role="tab"
                            aria-controls={tabTargetId(index)}
                            aria-selected="true">
                            {tab.tabName}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="tab-content" id={tabContent}>
                {tabs.map((tab, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                'tab-pane fade ' +
                                (index < 1 ? 'show active' : '')
                            }
                            id={tabTargetId(index)}
                            role="tabpanel"
                            aria-labelledby={btnTabId(index)}
                            tabIndex={index}>
                            <div className="vstack gap-4">
                                {tab.items.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="border-bottom border-neutral-500 pb-4">
                                            <HorizontalLoopDataLogic
                                                config={{
                                                    contentColumn: 'col-md-9',
                                                }}
                                                list={[
                                                    objectListDetail(
                                                        'Background Image',
                                                        <ContentMedia
                                                            src={item.image}
                                                            type="image"
                                                        />,
                                                    ),
                                                    objectListDetail(
                                                        'Title',
                                                        <RenderHtml
                                                            html={item.title}
                                                        />,
                                                    ),
                                                    objectListDetail(
                                                        'Description',
                                                        <RenderHtml
                                                            html={
                                                                item.description
                                                            }
                                                        />,
                                                    ),
                                                    objectListDetail(
                                                        'Button Text',
                                                        <RenderHtml
                                                            html={
                                                                item.buttonText
                                                            }
                                                        />,
                                                    ),
                                                    objectListDetail(
                                                        'Button Link',
                                                        <RenderHtml
                                                            html={
                                                                item.buttonLink
                                                            }
                                                        />,
                                                    ),
                                                ]}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TabListContent
