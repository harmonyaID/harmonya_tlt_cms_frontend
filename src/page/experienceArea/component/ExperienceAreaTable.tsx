import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirstPrimary, TblLineSecond } from '@/component/general/TablePartial.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import { BtnCircleDetail, BtnCircleEdit, BtnCircleRemove } from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'

const ExperienceAreaTable = ({
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
        __handleChooseDetail?: (data: any) => void
    }
}) => {
    return (
        <>
            <div className="row overflow-y position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={[
                            // {
                            //     content: 'Area',
                            //     className: 'max-w-200px',
                            // },
                            'Area',
                            'Type',
                            'Featured Image',
                            'Banner',
                            // 'Description',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    // onClick={(e) => {
                                    //     e.stopPropagation()
                                    //     __handleChooseDetail(vm)
                                    // }}
                                    // title="Preview Detail"
                                    // className="cursor-pointer"
                                >
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.name || ''}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.type?.name || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <BoxImage src={vm.featuredImage} />
                                    </td>
                                    <td>
                                        <BoxImage src={vm.banner} />
                                    </td>
                                    {/*<td>*/}
                                    {/*    {vm.description ? (*/}
                                    {/*        <RenderHtml*/}
                                    {/*            html={vm.description}*/}
                                    {/*        />*/}
                                    {/*    ) : (*/}
                                    {/*        '-'*/}
                                    {/*    )}*/}
                                    {/*</td>*/}
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
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

                                            <BtnCircleDetail
                                                actions={{
                                                    onClick: (e) => {
                                                        e.stopPropagation()
                                                        actions?.__handleChooseDetail(
                                                            vm,
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

export default ExperienceAreaTable