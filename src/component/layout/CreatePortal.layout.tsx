import { FC } from 'react'
import { createPortal } from 'react-dom'
import { CreatePortalLayoutProps } from './type/layout.type'

const CreatePortalLayout: FC<CreatePortalLayoutProps> = ({
    children,
    isUseBody = true,
}) => {
    const rootElement = isUseBody
        ? document.body
        : document.getElementById('root')

    if (!rootElement) {
        return null
    }

    return createPortal(children, rootElement)
}

export default CreatePortalLayout
