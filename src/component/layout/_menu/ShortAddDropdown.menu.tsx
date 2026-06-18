import { ReactNode } from 'react'
import { Link } from 'react-router'
import {
    ChartSuccess,
    MessageTick,
    Setting3,
    Electricity,
    Microscope,
    Broom,
    Signpost,
} from 'iconsax-react'
import { ShortAddObject } from '../type/layout.type'

const createShortAddObject = (
    name: string,
    url: string,
    icon: ReactNode,
    shortCut: string[] = [],
): ShortAddObject => ({
    name,
    url,
    icon,
    shortCut,
})

const linkShortAdds: ShortAddObject[] = [
    createShortAddObject('Ticket', '#', <MessageTick variant="Bulk" />, [
        '⌘',
        '1',
    ]),
    createShortAddObject('Maintenance', '#', <Setting3 variant="Bulk" />, [
        '⌘',
        '2',
    ]),
    createShortAddObject('Wire Down', '#', <Electricity variant="Bulk" />, [
        '⌘',
        '3',
    ]),
    createShortAddObject('General', '#', <Microscope variant="Bulk" />, [
        '⌘',
        '4',
    ]),
    createShortAddObject('Gamas', '#', <Broom variant="Bulk" />, ['⌘', '5']),
    createShortAddObject('Patrol', '#', <Signpost variant="Bulk" />, [
        '⌘',
        '6',
    ]),
    createShortAddObject('Project', '#', <ChartSuccess variant="Bulk" />, [
        '⌘',
        '7',
    ]),
]

const ShortAddDropdownMenu = () => {
    return (
        <>
            {linkShortAdds.map((vm, index) => (
                <Link
                    to={vm.url}
                    className="dropdown-item profile-item d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="me-4">
                        <span className="icon">{vm.icon}</span> {vm.name}
                    </div>
                    <div className="ms-auto opacity-50">
                        {vm.shortCut.map((st, key) => (
                            <i key={key} className={key < 1 ? 'me-1' : ''}>
                                {st}
                            </i>
                        ))}
                    </div>
                </Link>
            ))}
        </>
    )
}

export default ShortAddDropdownMenu
