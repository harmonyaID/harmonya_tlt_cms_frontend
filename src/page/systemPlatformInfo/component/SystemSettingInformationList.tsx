import { isEmpty, startCase } from 'lodash'
import { NotAvailableInTable } from '@/component/general/TextDefault'

interface SystemSettingInformationListProps {
    title?: string
    extraClass?: string
    info?: object | any
}

const _isBoolean = (v) => {
    return typeof v == 'boolean' ? (v ? 'Yes' : 'No') : v || '-'
}

const SystemSettingInformationList = ({
    title = '',
    extraClass = '',
    info = {},
}: SystemSettingInformationListProps) => {
    return (
        <table className={'table table-box ' + (extraClass || '')}>
            <thead>
                <tr className="">
                    <th className="text-neutral-100">{title}</th>
                </tr>
            </thead>

            <tbody>
                {!isEmpty(info) ? (
                    Object.keys(info).map((key) => (
                        <tr className="" key={key}>
                            <td className="text-neutral-300">
                                <span className="fw-500 text-neutral-200">
                                    {startCase(key)} :{' '}
                                </span>{' '}
                                {_isBoolean(info[key])}
                            </td>
                        </tr>
                    ))
                ) : (
                    <NotAvailableInTable />
                )}
            </tbody>
        </table>
    )
}

export default SystemSettingInformationList
