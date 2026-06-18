import { FC } from 'react'
import { Link } from 'react-router'
import {
    BreadActiveProps,
    BreadBeforeProps,
    NavBreadcrumbProps,
} from './type/general.type'

const BreadBefore: FC<BreadBeforeProps> = ({
    name,
    url = '',
    actions = {},
}) => {
    return (
        <li className="breadcrumb-item" aria-current="page">
            {url ? (
                <Link to={url || '#'}>{name}</Link>
            ) : (
                <Link
                    to={actions.url || '#'}
                    state={{
                        ...actions.state,
                    }}>
                    {name}
                </Link>
            )}
        </li>
    )
}

const BreadActive: FC<BreadActiveProps> = ({ name }) => (
    <li className="breadcrumb-item active" aria-current="page">
        {name}
    </li>
)

const NavBreadcrumb: FC<NavBreadcrumbProps> = ({
    extraClass = '',
    navs = [],
}) => {
    return (
        <nav aria-label="breadcrumb" className={extraClass}>
            <ol className="breadcrumb">
                {navs.map((page, index) => {
                    const n = index + 1

                    if (navs.length === n) {
                        return <BreadActive name={page.name} key={index} />
                    }

                    return (
                        <BreadBefore
                            key={index}
                            url={page.url}
                            actions={page.actions}
                            name={page.name}
                        />
                    )
                })}
            </ol>
        </nav>
    )
}

export default NavBreadcrumb
