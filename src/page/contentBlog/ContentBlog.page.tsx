import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useContentBlogMainHook from '@/page/contentBlog/hook/useContentBlogMain.hook.ts'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'

const ContentBlogPage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    } = useContentBlogMainHook()

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRemove, false),
        },
    })

    return (
        <>
            <CardListData
                title="Blog"
                componentAction={
                    <BtnPrimary onClick={() => __handleToAdd()}>
                        Add New
                    </BtnPrimary>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    // isDateRange
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <div className="row overflow-y position-relative">
                    <div className="col-md-12 table-responsive-md">
                        <TableThemeLogic
                            isLoading={__isLoading}
                            isNoWrap
                            ths={[
                                'Title',
                                // 'Author',
                                { content: 'Tags', className: 'max-w-200px' },
                                // 'Status Active',
                                // 'Published At',
                                'Info.',
                                'Created',
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
                                            __handleToDetail(vm.id)
                                        }}>
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm?.title || '-'}
                                            />
                                            <TblPointData title="Category">
                                                <BadgeStatusGeneral
                                                    value={
                                                        vm?.category?.name ||
                                                        '-'
                                                    }
                                                    className="text-bg-neutral-300 fw-normal"
                                                />
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <div className="d-inline-flex gap-2">
                                                {vm?.tags?.map((tag, index) => (
                                                    <BadgeStatusGeneral
                                                        value={tag?.name || '-'}
                                                        className="text-bg-neutral-300 fw-normal"
                                                        key={index}
                                                    />
                                                )) || '-'}
                                            </div>
                                        </td>

                                        <td>
                                            <TblPointData title="Status Active">
                                                <TextTrueOrFalse
                                                    value={vm.isActive}
                                                />
                                            </TblPointData>

                                            <TblPointData title="Published At">
                                                <TblLineSecond>
                                                    {vm?.publishedAt || '-'}
                                                </TblLineSecond>
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TblPointData title="Author">
                                                {vm?.author || '-'}
                                            </TblPointData>
                                            <TblPointData title="Create At">
                                                {vm?.createdAt || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                <BtnCircleRemove
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            _handleChooseRemove(
                                                                vm,
                                                            )
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

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () => apiBlogContent.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default ContentBlogPage
