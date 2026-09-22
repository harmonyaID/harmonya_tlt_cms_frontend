import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnCircleRestore,
    BtnCircleX,
} from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import { isClickToDetail } from '@/helper/condition.helper.ts'

const ContentBlogTable = ({
    isTrash = false,
    __isLoading,
    __list,
    __pagination,
    actions,
}: {
    isTrash?: boolean
    __isLoading: boolean
    __list: any[]
    __pagination: any
    actions: {
        __handleToDetail?: (id) => void
        __handleChooseRemove?: (id) => void
        __handleToEdit?: (id) => void
        __actionPagination: (page, search?: any) => void
        __handleChoosePermanentRemove?: (data: any) => void
        __handleChooseRestore?: (data: any) => void
    }
}) => {
    return (
        <>
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
                                    className={!isTrash && 'cursor-pointer'}
                                    onClick={(e) =>
                                        !isTrash &&
                                        actions?.__handleToDetail(vm.id)
                                    }>
                                    <td className="max-w-300px text-wrap">
                                        <div className="hstack gap-3 align-items-start">
                                            <PreviewFileModalLogic
                                                classNameWidth="avatar-46"
                                                dataUrl={vm.thumbnail || ''}
                                            />
                                            <div>
                                                <TblLineFirstPrimary
                                                    value={vm?.title || '-'}
                                                />
                                                <TblPointData title="Category">
                                                    <div className="hstack gap-2 flex-wrap">
                                                        {vm?.categories?.map(
                                                            (cat) => (
                                                                <BadgeStatusGeneral
                                                                    key={cat.id}
                                                                    value={
                                                                        cat.name ||
                                                                        '-'
                                                                    }
                                                                    className="text-bg-neutral-300 fw-normal"
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </TblPointData>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="max-w-300px">
                                        <div className="d-inline-flex gap-2 flex-wrap">
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

                                        <TblPointData title="Visible">
                                            <TextTrueOrFalse
                                                value={vm.visibility}
                                            />
                                        </TblPointData>

                                        <TblPointData title="Published At">
                                            <TblLineSecond>
                                                {vm?.publishedAt || '-'}
                                            </TblLineSecond>
                                        </TblPointData>

                                        <TblPointData title="Visitors">
                                            <TblLineSecond>
                                                {vm?.uniqueVisitorCount || '-'}
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
                                            {isTrash ? (
                                                <TrashActionButtons
                                                    selected={vm}
                                                    actions={{
                                                        restore:
                                                            actions?.__handleChooseRestore,
                                                        permanentRemove:
                                                            actions?.__handleChoosePermanentRemove,
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <BtnCircleRemove
                                                        actions={{
                                                            remove: (e) => {
                                                                e.stopPropagation()
                                                                actions?.__handleChooseRemove(
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
                                                                actions?.__handleToEdit(
                                                                    vm.id,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                </>
                                            )}
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
                    onMove={(step) => actions?.__actionPagination(step)}
                    className="mt-2"
                    pagination={configDefaultPagination(
                        __pagination,
                        'totalPage',
                    )}
                />
            ) : null}
        </>
    )
}

export default ContentBlogTable
