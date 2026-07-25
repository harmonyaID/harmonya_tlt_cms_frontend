import TabDataTable from '@/common/dataFeature/tabDataTable/TabDataTable.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import {
    TblLineFirst,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import {
    getLogActivity,
    getLogActivitySettingAction,
    getLogActivitySettingType,
} from '@/service/api/systemManagement.api.ts'

const SystemActivityLogPage = () => {
    const ACTIVITY = 'Activity'

    const SETTING_ACTION = 'Setting Action'

    const SETTING_TYPE = 'Setting Type'

    return (
        <>
            <PageTitle title="Activity Log" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab(ACTIVITY, 'tabActivity'),
                    // objectTab(SETTING_ACTION, 'tabSettingAction'),
                    objectTab(SETTING_TYPE, 'tabSettingType'),
                ]}
                tabContents={[
                    objectTabContent(
                        '',
                        <TabDataTable
                            title={ACTIVITY}
                            api={{ list: getLogActivity }}
                            ths={[
                                'Action',
                                'Description',
                                'Type',
                                'Caused By Name',
                                'Created At',
                            ]}
                            content={{
                                tr: (data) => {
                                    return (
                                        <tr key={data.key}>
                                            <td>
                                                <TblLineFirst className="text-capitalize">
                                                    {data.action}
                                                </TblLineFirst>
                                            </td>
                                            <td>
                                                <TblLineSecond>
                                                    {data.description}
                                                </TblLineSecond>
                                            </td>
                                            <td>
                                                <TblLineSecond>
                                                    {data.type}
                                                </TblLineSecond>
                                            </td>
                                            <td>
                                                <TblLineSecond>
                                                    {data.causedByName}
                                                </TblLineSecond>
                                            </td>
                                            <td>
                                                <TblLineSecond>
                                                    {data.createdAt}
                                                </TblLineSecond>
                                            </td>
                                        </tr>
                                    )
                                },
                            }}
                        />,
                    ),
                    // objectTabContent(
                    //     '',
                    //     <TabDataTable
                    //         title={SETTING_ACTION}
                    //         api={{ list: getLogActivitySettingAction }}
                    //         ths={['Name', 'Code']}
                    //         content={{
                    //             tr: (data) => {
                    //                 return (
                    //                     <tr key={data.key}>
                    //                         <td>
                    //                             <TblLineFirst className="text-capitalize">
                    //                                 {data.name}
                    //                             </TblLineFirst>
                    //                         </td>
                    //                         <td>
                    //                             <TblLineSecond>
                    //                                 {data.code}
                    //                             </TblLineSecond>
                    //                         </td>
                    //                     </tr>
                    //                 )
                    //             },
                    //         }}
                    //     />,
                    // ),
                    objectTabContent(
                        '',
                        <TabDataTable
                            title={SETTING_TYPE}
                            api={{ list: getLogActivitySettingType }}
                            ths={['Name', 'Code']}
                            content={{
                                tr: (data) => {
                                    return (
                                        <tr key={data.key}>
                                            <td>
                                                <TblLineFirst className="text-capitalize">
                                                    {data.name}
                                                </TblLineFirst>
                                            </td>
                                            <td>
                                                <TblLineSecond>
                                                    {data.code}
                                                </TblLineSecond>
                                            </td>
                                        </tr>
                                    )
                                },
                            }}
                        />,
                    ),
                ]}
            />
        </>
    )
}

export default SystemActivityLogPage
