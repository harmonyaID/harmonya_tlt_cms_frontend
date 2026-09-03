import { ReactNode } from 'react'

const RenderHtml = ({
    html = '',
    className,
}: {
    html: ReactNode
    className?: string
}) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}

export default RenderHtml
