import { FC, useState } from 'react'
import { isEmpty } from 'lodash'
import { BadgeStatusGeneral } from '@/component/general/Badge'
import {
    NotAvailable,
    NotAvailableInTable,
} from '@/component/general/TextDefault'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import SystemSettingInformationList from '@/page/systemPlatformInfo/component/SystemSettingInformationList.tsx'
import { getLogActivitySetting } from '@/service/api/systemManagement.api.ts'
import { BtnInfo } from '@/component/general/Button.tsx'
import {
    SYSTEM_INFO_EMAIL_INFO,
    SYSTEM_INFO_INSTALL_PACKAGE,
    SYSTEM_INFO_SERVER_ENV,
    SYSTEM_INFO_SYSTEM_ENV,
    systemInfoMenu,
} from '@/config/systemInfo.config.ts'

const TabSystemInfo: FC = () => {
    const { __detail: __list, __isLoading } = useDataDetailHook({
        urlAPI: getLogActivitySetting,
    })

    const [selected, setSelected] = useState(SYSTEM_INFO_INSTALL_PACKAGE)

    return (
        <>
            {__isLoading || isEmpty(__list) ? (
                <LoadingNotAvailable isLoading={__isLoading} />
            ) : !isEmpty(__list) ? (
                <>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="vstack gap-3">
                                {systemInfoMenu.map((vm) => (
                                    <div
                                        key={vm.id}
                                        onClick={() => setSelected(vm.id)}
                                        className={`w-100 rounded-2 px-3 py-2 cursor-pointer ${vm.id === selected ? 'bg-primary text-white' : 'bg-neutral-500'}`}>
                                        {vm.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col">
                            {selected === SYSTEM_INFO_INSTALL_PACKAGE && (
                                <table className="table table-thead table-box">
                                    <thead>
                                        <tr className="">
                                            <th className="text-neutral-100">
                                                Installation Package
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {__list?.package &&
                                        __list.package.length ? (
                                            __list.package.map((pkg, key) => (
                                                <tr className="" key={key}>
                                                    <td className="text-neutral-200">
                                                        {pkg.name}
                                                        <BadgeStatusGeneral
                                                            value={pkg.version}
                                                            className="bg-primary-brand rounded-1 ms-2"
                                                            isRounded={false}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <NotAvailableInTable colSpan={2} />
                                        )}
                                    </tbody>
                                </table>
                            )}

                            {selected === SYSTEM_INFO_EMAIL_INFO && (
                                <SystemSettingInformationList
                                    title="Email Information"
                                    extraClass="mb-4"
                                    info={__list.email}
                                />
                            )}

                            {selected === SYSTEM_INFO_SYSTEM_ENV && (
                                <SystemSettingInformationList
                                    title="System Environment"
                                    extraClass="mb-4"
                                    info={__list.system}
                                />
                            )}

                            {selected === SYSTEM_INFO_SERVER_ENV && (
                                <SystemSettingInformationList
                                    title="Server Environment"
                                    extraClass="mb-4"
                                    info={__list.server}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <NotAvailable />
            )}
        </>
    )
}

export default TabSystemInfo
