import { Additem } from 'iconsax-react'
import { isEmpty } from 'lodash'
import SelectOptionCountry from '@/common/dataForm/SelectOptionCountry.tsx'
import Card from '@/component/card/Card.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import SelectOption from '@/component/form/SelectOption.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import {
    Loading,
    NotAvailable,
    TextIconLoading,
} from '@/component/general/TextDefault.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { MEGA_MENU_ID, menuNavbarTypes } from '@/config/menu.config.ts'
import {
    MDContentMenuAddMenuItem,
    MDGeneralPreview,
} from '@/config/modal.config.ts'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { textSlug } from '@/helper/convertText.helper.ts'
import { generateOptionByLength } from '@/helper/generateOption.helper.ts'
import useContentMenuMainFormHook from '@/page/contentMenu/hook/useContentMenuMainForm.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

const MenuItemRow = ({
    item,
    depth = 0,
    onEdit,
    onRemove,
    onAddChild,
    canAddChild,
}) => {
    return (
        <div style={{ marginLeft: depth * 24 }}>
            <div className="card card-body py-2 bg-neutral-600 border-0 hstack gap-3 mb-2">
                <div className="me-auto">
                    <p className="fs-16 fw-500 mb-1">{item.menuLabel}</p>
                    {/*<p className="fs-12 text-gray-500 mb-3">*/}
                    {/*    Order {item.menuOrder}*/}
                    {/*</p>*/}

                    <p className="fs-12 mb-0">
                        <span className="text-primary">{item.menuUrl}</span>
                    </p>
                </div>

                <div className="hstack gap-2">
                    <BtnDanger
                        className="btn-sm"
                        isOutline
                        onClick={() => onRemove(item.id)}>
                        Remove
                    </BtnDanger>
                    <BtnPrimary
                        className="btn-sm btn-xs"
                        isOutline
                        onClick={() => onEdit(item, item.menuParent || null)}>
                        Edit
                    </BtnPrimary>

                    {canAddChild(item.id) ? (
                        <BtnPrimary
                            className="btn-sm"
                            onClick={() => onAddChild(item.id)}>
                            Add New
                        </BtnPrimary>
                    ) : null}
                </div>
            </div>

            {item.children?.length
                ? item.children.map((child) => (
                      <MenuItemRow
                          key={child.id}
                          item={child}
                          depth={depth + 1}
                          onEdit={onEdit}
                          onRemove={onRemove}
                          onAddChild={onAddChild}
                          canAddChild={canAddChild}
                      />
                  ))
                : null}
        </div>
    )
}

const ContentMenuMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __setFormRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleChange,
        __handleChangeArr,
        __handleArrAddMulti,
        __listLanguages,
        __handleSubmit,
        __handleCancel,

        //Add Menu
        __formRequestMenuParent,
        __setFormRequestMenuParent,
        __changeMenuParent,
        __handleMenuParentAddNew,
        __handleMenuParentCancel,
        __handleMenuParentEdit,
        __handleMenuPushNew,
        __lengthOptionMenu,
        __handleMenuRemove,
        __canAddChild,
    } = useContentMenuMainFormHook({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Menu', {
                        url: contentMenuPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {__isLoadingDetail && isEdit ? (
                <Loading />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}>
                        <div className="row gy-4">
                            <div className="col-lg-4">
                                <Card title="Menu Information">
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
                                        <FormInput
                                            label="Title"
                                            name="title"
                                            required
                                            placeholder="e.g Main Menu"
                                            value={__formRequest.title}
                                            actions={{
                                                onChange: (name, value) => {
                                                    __setFormRequest((prev) => {
                                                        const newState = {
                                                            ...prev,
                                                        }
                                                        newState.title = value
                                                        newState.handle =
                                                            textSlug(value)

                                                        return newState
                                                    })
                                                },
                                            }}
                                        />

                                        <FormInput
                                            label="Handle"
                                            name="handle"
                                            disabled
                                            readOnly
                                            placeholder="by title"
                                        />

                                        <FormSelectOption
                                            label="Locale"
                                            required
                                            name="locale">
                                            <option value="">
                                                - Select Language -
                                            </option>
                                            {__listLanguages.map(
                                                (vm, index) => (
                                                    <option
                                                        value={vm.code}
                                                        key={index}>
                                                        {vm.country}
                                                    </option>
                                                ),
                                            )}
                                        </FormSelectOption>
                                    </WrapFormContext>
                                </Card>
                            </div>

                            <div className="col-lg-8">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                    }}>
                                    <Card>
                                        <div className="row mb-4">
                                            <div className="col-md">
                                                <h5 className="fs-18 fw-500">
                                                    Menu Items
                                                </h5>
                                            </div>
                                            <div className="col-auto">
                                                <BtnPrimary
                                                    onClick={() =>
                                                        __handleMenuParentAddNew()
                                                    }>
                                                    Add Menu
                                                </BtnPrimary>
                                            </div>
                                        </div>

                                        {!isEmpty(__formRequest.items) ? (
                                            <div className="vstack gap-3">
                                                {__formRequest.items.map(
                                                    (item) => (
                                                        <MenuItemRow
                                                            key={item.id}
                                                            item={item}
                                                            depth={0}
                                                            onEdit={
                                                                __handleMenuParentEdit
                                                            }
                                                            onRemove={
                                                                __handleMenuRemove
                                                            }
                                                            onAddChild={(
                                                                parentId,
                                                            ) =>
                                                                __handleMenuParentAddNew(
                                                                    parentId,
                                                                )
                                                            }
                                                            canAddChild={
                                                                __canAddChild
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <div className="py-3 vstack align-items-center">
                                                <div className="pb-4">
                                                    <div className="box-80 center bg-neutral-600 rounded-circle">
                                                        <Additem
                                                            size={40}
                                                            variant="Bulk"
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-neutral-100 fs-18 fw-500 mb-1">
                                                    Your menu is empty
                                                </p>
                                                <p className="fs-13 text-neutral-400">
                                                    Click "Add Menu" to create
                                                    your first menu item.
                                                </p>
                                            </div>
                                        )}
                                    </Card>
                                </WrapFormContext>
                            </div>
                        </div>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() =>
                                __handleCancel(__pageStateDataSearch)
                            }
                        />
                    </FormWrap>

                    <CreatePortalLayout>
                        <ModalMiddle
                            id={MDContentMenuAddMenuItem}
                            title="Add Menu"
                            isHideClose>
                            <FormWrap
                                actions={{
                                    handleSubmit: () => __handleMenuPushNew(),
                                }}>
                                <WrapFormContext
                                    formRequest={__formRequestMenuParent}
                                    actions={{
                                        change: __changeMenuParent,
                                    }}>
                                    <FormInput
                                        label="Menu Label"
                                        name="menuLabel"
                                        placeholder="e.g About"
                                        required
                                    />
                                    <FormInput
                                        label="Url"
                                        name="menuUrl"
                                        placeholder="e.g /about"
                                        // type="url"
                                        required
                                    />

                                    <FormSelectOption
                                        label="Order"
                                        name="menuOrder"
                                        required>
                                        {generateOptionByLength(
                                            __lengthOptionMenu,
                                        ).map((op) => (
                                            <option value={op} key={op}>
                                                Order {op}
                                            </option>
                                        ))}
                                    </FormSelectOption>

                                    <FormSelectOption
                                        label="Menu Type"
                                        name="typeId"
                                        required>
                                        {menuNavbarTypes.map((op) => (
                                            <option
                                                value={op.value}
                                                key={op.value}>
                                                {op.label}
                                            </option>
                                        ))}
                                    </FormSelectOption>

                                    {__formRequestMenuParent.typeId ===
                                    MEGA_MENU_ID ? (
                                        <>
                                            <FormTextArea
                                                label="Description"
                                                name="description"
                                            />
                                        </>
                                    ) : null}
                                </WrapFormContext>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <BtnPrimary
                                            isOutline
                                            handle={__handleMenuParentCancel}
                                            className="me-3">
                                            Cancel
                                        </BtnPrimary>

                                        <BtnPrimary type="submit">
                                            <TextIconLoading
                                                name={
                                                    isEdit ? 'Update' : 'Submit'
                                                }
                                                isAction={false}
                                            />
                                        </BtnPrimary>
                                    </div>
                                </div>
                            </FormWrap>
                        </ModalMiddle>
                    </CreatePortalLayout>
                </>
            )}
        </>
    )
}

export default ContentMenuMainForm
