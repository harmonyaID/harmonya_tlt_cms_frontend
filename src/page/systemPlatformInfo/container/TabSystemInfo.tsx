import { FC } from 'react'
import { isEmpty } from 'lodash'
import { BadgeStatusGeneral } from '@/component/general/Badge'
import {
    NotAvailable,
    NotAvailableInTable,
} from '@/component/general/TextDefault'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useDataListHook from '@/hook/base/useDataList.hook'
// import SystemSettingInformationList from '../component/SystemSettingInformationList'
import SystemSettingInformationList from '@/page/systemPlatformInfo/component/SystemSettingInformationList.tsx'
import { getLogActivitySetting } from '@/service/api/systemManagement.api.ts'

const TabSystemInfo: FC = () => {
    const { __detail: __list, __isLoading } = useDataDetailHook({
        urlAPI: getLogActivitySetting,
    })

    return (
        <>
            {__isLoading || isEmpty(__list) ? (
                <LoadingNotAvailable isLoading={__isLoading} />
            ) : !isEmpty(__list) ? (
                <>
                    <div className="row">
                        <div className="col-12 col-md-6">
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
                        </div>

                        <div className="col-12 col-md-6">
                            <SystemSettingInformationList
                                title="Email Information"
                                extraClass="mb-4"
                                info={__list.email}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <SystemSettingInformationList
                                title="System Environment"
                                extraClass="mb-4"
                                info={__list.system}
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <SystemSettingInformationList
                                title="Server Environment"
                                extraClass="mb-4"
                                info={__list.server}
                            />
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
