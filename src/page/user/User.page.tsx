import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiStaff } from '@/service/api/staff.api.ts'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import userPath from '@/path/user.path.ts'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import CardNotes from '@/component/card/CardNotes.tsx'
import { AvatarInTable } from '@/component/general/Avatar.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'

const UserPage = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiStaff.list,
        advancedSearch: {
            page: 1,
            limit: 10,
            typeIds: [],
            categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit } = usePageFlowHandlerHook({
        basePath: userPath,
        pathFromKey: 'server-main',
    })

    return (
        <>
            <CardListData
                title="Staff"
                componentAction={
                    <BtnPrimary onClick={() => __handleToAdd()}>
                        Add New
                    </BtnPrimary>
                }>
                <div className="row overflow-y position-relative">
                    <div className="col-md-12 table-responsive-md">
                        <TableThemeLogic
                            isLoading={__isLoading}
                            isNoWrap
                            ths={[
                                'Full Name',
                                'Address',
                                'Info',
                                'Country',
                                'Status',
                                // 'Created',
                                '',
                            ]}
                            tds={__list}>
                            {__list.map((vm, index) => {
                                return (
                                    <tr
                                        key={index}
                                        title="Preview Detail"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            // __handleChooseAndNextStep(vm)
                                        }}>
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm.fullName}
                                            />

                                            <TblPointData
                                                title="Gender"
                                                value={vm?.gender?.name || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.address || '-'}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <TblPointData
                                                title="Email"
                                                value={vm.email || '-'}
                                            />
                                            <TblPointData
                                                title="Phone"
                                                value={vm.phone || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.country?.name || '-'}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        {/*<td>*/}
                                        {/*    <AvatarInTable*/}
                                        {/*        className="mt-1"*/}
                                        {/*        {...(vm.createdBy*/}
                                        {/*            ? {*/}
                                        {/*                  title: vm.createdBy,*/}
                                        {/*              }*/}
                                        {/*            : {})}*/}
                                        {/*        subTitle={*/}
                                        {/*            vm.createdAt*/}
                                        {/*                ? vm.createdAt*/}
                                        {/*                : '-'*/}
                                        {/*        }*/}
                                        {/*        isSmall*/}
                                        {/*    />*/}
                                        {/*</td>*/}
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                <BtnCircleRemove
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            // _handleChooseRemove(
                                                            //     vm,
                                                            // )
                                                        },
                                                    }}
                                                />
                                                <BtnCircleEdit
                                                    title="Edit Data"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            __handleToEdit(
                                                                vm.id,
                                                            )
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </TableThemeLogic>
                    </div>
                </div>

                {isShowPagination(__isLoading, __list, __pagination) ? (
                    <Pagination
                        onMove={(step) => __actionPagination(step)}
                        className="mt-2"
                        pagination={configDefaultPagination(
                            __pagination,
                            'totalPage',
                        )}
                    />
                ) : null}
            </CardListData>
        </>
    )
}

export default UserPage
