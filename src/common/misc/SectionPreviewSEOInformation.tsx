import ReactJson from '@microlink/react-json-view'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import PreviewJson from '@/component/general/PreviewJson.tsx'
import SEOPreviewPublic from '@/component/general/SEOPreviewPublic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTabContent } from '@/config/objectNavTab.config.ts'

const SectionPreviewSEOInformation = ({
    seo,
    classNameColumn = 'col-md-12',
    isTitle = true,
    variant = 'horizontal',
}: {
    seo?: any
    classNameColumn?: string
    isTitle?: boolean
    variant?: 'vertical' | 'horizontal'
}) => {
    const list = [
        objectTabContent('Title', seo?.title || '-'),
        objectTabContent('Slug', seo?.slug || '-'),
        objectTabContent('Canonical Url', seo?.canonicalUrl || '-'),
        objectTabContent('Description', seo?.description || '-'),
        objectTabContent(
            'Meta Keyword',
            seo?.metaKeyword ? <PreElement>{seo.metaKeyword}</PreElement> : '-',
        ),
        objectTabContent(
            'Meta Image',
            seo?.thumbnail ? (
                <PreviewFileModalLogic
                    dataUrl={seo?.thumbnail?.toString()}
                    dataBy="file"
                    dataFile={seo?.thumbnail}
                    classNameWidth="w-100 max-h-148px"
                />
            ) : (
                '-'
            ),
        ),
        objectListDetail(
            'Robot Follow',
            <TextTrueOrFalse value={seo?.robotFollow} />,
        ),
        objectListDetail(
            'Robot Index',
            <TextTrueOrFalse value={seo?.robotIndex} />,
        ),
        objectListDetail(
            'Schema Markup',
            seo?.schemaMarkup ? <PreviewJson value={seo.schemaMarkup} /> : '-',
        ),
    ]

    return (
        <>
            {isTitle ? (
                <h6 className="fs-16 fw-500 mb-3">SEO Information</h6>
            ) : null}

            <div className="row">
                <div className={classNameColumn}>
                    <SEOPreviewPublic
                        title={seo?.title || ''}
                        description={seo?.description || ''}
                        urlPhoto={seo.thumbnail || ''}
                        className="mb-4"
                    />

                    {variant === 'horizontal' ? (
                        <HorizontalLoopDataLogic list={list} />
                    ) : (
                        <VerticalLoopDataLogic list={list} />
                    )}
                </div>
            </div>
        </>
    )
}

export default SectionPreviewSEOInformation
