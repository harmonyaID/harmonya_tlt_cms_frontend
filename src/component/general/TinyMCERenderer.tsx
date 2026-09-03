import { PropsWithChildren } from 'react'

const TinyMCERenderer = ({content}: {content: any}) => {
    return (
        <div className="tinymce">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default TinyMCERenderer