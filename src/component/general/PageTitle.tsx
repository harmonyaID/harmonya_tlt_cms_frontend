import { FC } from 'react'
import { PageTitleProps } from './type/general.type'

const PageTitle: FC<PageTitleProps> = ({ title = '', second = '' }) => (
    <>
        <h5
            className={
                'fs-20P fw-500 text-neutral-100 ' + (second ? 'mb-2' : 'mb-0')
            }>
            {title}
        </h5>
        {second ? <p className="mb-0 pb-1">{second}</p> : null}
    </>
)

export default PageTitle
