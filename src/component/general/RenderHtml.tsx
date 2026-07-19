const RenderHtml = ({
    html = '',
    className,
}: {
    html: string
    className?: string
}) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}

export default RenderHtml
