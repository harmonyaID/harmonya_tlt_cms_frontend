import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import {
    MDGeneralRemove,
    MDPSTabWebContactFormRemove,
    MDWebConfigSettingUpdate,
} from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    getWebConfig,
    updateWebConfig,
} from '@/service/api/systemManagement.api.ts'

const initSocialMediaForm = (passData: any) => {
    return {
        icon: passData?.icon || '',
        key: passData?.key || '',
        link: passData?.link || '',
        name: passData?.name || '',
    }
}

const initEmailForm = (passData: any) => ({
    title: passData?.title || '',
    email: passData?.email || '',
})

const initPhoneForm = (passData: any) => ({
    title: passData?.title || '',
    phone: passData?.phone || '',
})

const initMapForm = (passData) => {
    return {
        name: passData.name,
        title: passData.title || '',
        // email: passData.email || '',
        // phone: passData.phone || '',
        emails: !isEmpty(passData.emails) ? passData.emails : [],
        phones: !isEmpty(passData.phones) ? passData.phones : [],
        fax: passData.fax || '',
        whatsapp: passData.whatsapp || '',
        country: passData?.country?.code || 'ID',
        postalCode: passData.postalCode || '',
        address: passData.address || '',
        mapEmbed: passData.mapEmbed || '',
        socialMedia: !isEmpty(passData.socialMedia) ? passData.socialMedia : [],
    }
}

const TabWebConfig = () => {
    const { __detail, __isLoading, __actionUpdate } = useDataDetailHook({
        urlAPI: () => getWebConfig(),
    })

    const {
        __formRequest,
        __detailData,
        __selectedId,
        __isEdit,
        __setFormRequest,
        __setSelectedId,
        __actionAddModal,
        __actionUpdateModal,
        __actionCloseModal,
        __actionRemoveModal,
    } = useCRUDModalRequestHook({
        modalId: MDWebConfigSettingUpdate,
        modalRemoveId: MDGeneralRemove + 'webConfig',
        mapDetailToFormRequest: initMapForm,
    })

    const { _handleChange, _handleArrToggle, _handleArrChange } =
        useNestedFormHook(__formRequest, __setFormRequest)

    console.log('index: ', __formRequest?.socialMedia?.length)

    return (
        <>
            <div className="row pb-3">
                <div className="col-md-6">
                    <h5 className="fs-18 fw-500 mb-0">Web Information</h5>
                </div>
                <div className="col-md-6 text-end">
                    {!__isLoading && __detail ? (
                        <BtnPrimary
                            isOutline
                            handle={(e) => {
                                e.stopPropagation()
                                __actionUpdateModal(__detail)
                            }}>
                            Edit
                        </BtnPrimary>
                    ) : null}
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__detail}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mb-0">
                            <HorizontalLoopDataLogic
                                config={{
                                    contentColumn: 'col-md-9',
                                }}
                                list={[
                                    objectListDetail(
                                        'Title',
                                        __detail.title || '-',
                                    ),
                                    objectListDetail(
                                        'Address',
                                        __detail.address || '-',
                                    ),
                                    objectListDetail(
                                        'Postal Code',
                                        __detail.postalCode || '-',
                                    ),
                                    objectListDetail(
                                        'Country',
                                        __detail?.country?.name || '-',
                                    ),
                                    // objectListDetail(
                                    //     'Email',
                                    //     __detail.email || '-',
                                    // ),
                                    objectListDetail(
                                        'Fax',
                                        __detail.fax || '-',
                                    ),
                                    // objectListDetail(
                                    //     'Map Embed',
                                    //     __detail.mapEmbed || '-',
                                    // ),
                                    // objectListDetail(
                                    //     'Phone',
                                    //     __detail.phone || '-',
                                    // ),
                                    // objectListDetail(
                                    //     'Whatsapp',
                                    //     __detail.whatsapp || '-',
                                    // ),

                                    objectListDetail(
                                        'Phones',
                                        !isEmpty(__detail.phones) ? (
                                            <div className="vstack gap-2">
                                                {__detail.phones.map(
                                                    (vm, index) => (
                                                        <div
                                                            className="border px-3 py-2 rounded-2"
                                                            key={index}>
                                                            <p className="fs-12 mb-1">
                                                                {vm.title}
                                                            </p>
                                                            <p className="fs-13 mb-0 fw-600">
                                                                {vm.phone}
                                                            </p>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            '-'
                                        ),
                                    ),

                                    objectListDetail(
                                        'Emails',
                                        !isEmpty(__detail.emails) ? (
                                            <div className="vstack gap-2">
                                                {__detail.emails.map(
                                                    (vm, index) => (
                                                        <div
                                                            className="border px-3 py-2 rounded-2"
                                                            key={index}>
                                                            <p className="fs-12 mb-1">
                                                                {vm.title}
                                                            </p>
                                                            <p className="fs-13 mb-0 fw-600">
                                                                {vm.email}
                                                            </p>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            '-'
                                        ),
                                    ),

                                    objectListDetail(
                                        'Social Media',
                                        <>
                                            {!isEmpty(__detail.socialMedia) ? (
                                                <div className="vstack gap-3">
                                                    {__detail?.socialMedia.map(
                                                        (vm, index) => {
                                                            return (
                                                                <div
                                                                    className="vstack gap-2 px-3 py-2 border rounded-3 border-neutral-400 hover-action-border-primary"
                                                                    key={index}>
                                                                    <a
                                                                        href={
                                                                            vm.link ||
                                                                            '#'
                                                                        }
                                                                        target={
                                                                            vm.link
                                                                                ? '_blank'
                                                                                : ''
                                                                        }
                                                                        className="text-neutral-100">
                                                                        <div className="fs-13 pb-1">
                                                                            <i
                                                                                className={
                                                                                    vm.icon
                                                                                }
                                                                            />{' '}
                                                                            {
                                                                                vm.key
                                                                            }
                                                                        </div>
                                                                        <div className="fs-14 fw-600">
                                                                            {
                                                                                vm.name
                                                                            }
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            ) : null}
                                        </>,
                                    ),
                                ]}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        {__detail?.mapEmbed ? (
                            <iframe
                                src={__detail.mapEmbed}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        ) : null}
                    </div>
                </div>

                <CreatePortalLayout>
                    <ModalWithActionFormCRUDLogic
                        title="Website Config"
                        id={MDWebConfigSettingUpdate}
                        detail={__detail}
                        isEdit={__isEdit}
                        formRequest={__formRequest}
                        actions={{
                            change: _handleChange,
                            toggleModal: __actionCloseModal,
                        }}
                        width={740}
                        isUseDefaultInput={false}
                        externalForm={
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="Title"
                                            name="title"
                                            required
                                            placeholder="e.g Uni"
                                        />
                                    </div>

                                    {/*<div className="col-md-6">*/}
                                    {/*    <FormInput*/}
                                    {/*        label="Email"*/}
                                    {/*        name="email"*/}
                                    {/*        type="email"*/}
                                    {/*        required*/}
                                    {/*        placeholder="e.g arbi@tlt.com"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    {/*<div className="col-md-6">*/}
                                    {/*    <FormInput*/}
                                    {/*        label="Phone"*/}
                                    {/*        name="phone"*/}
                                    {/*        type="phone"*/}
                                    {/*        // required*/}
                                    {/*        placeholder="e.g 6287xxxx"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className="col-md-6">
                                        <FormInput
                                            label="Fax"
                                            name="fax"
                                            isNumberOnly
                                            // required
                                            placeholder="e.g 6287xxxx"
                                        />
                                    </div>

                                    {/*<div className="col-md-6">*/}
                                    {/*    <FormInput*/}
                                    {/*        label="Whatsapp"*/}
                                    {/*        name="whatsapp"*/}
                                    {/*        isNumberOnly*/}
                                    {/*        required*/}
                                    {/*        placeholder="e.g 6287xxxx"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    {/*<div className="col-md-6">*/}
                                    {/*    <FormInput*/}
                                    {/*        label="Country"*/}
                                    {/*        name="country"*/}
                                    {/*        required*/}
                                    {/*        placeholder="e.g Indonesia"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className="col-md-6">
                                        <FormInput
                                            label="Postal Code"
                                            name="postalCode"
                                            isNumberOnly
                                            required
                                            placeholder="e.g 80361"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <FormTextArea
                                            label="Address"
                                            name="address"
                                            required
                                            placeholder="e.g Jl.Pantai Berawa No.13, Bali - Indonesia"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <FormInput
                                            label="Map Embed"
                                            name="mapEmbed"
                                            placeholder="e.g https://www.google.com/maps/embed?"
                                        />

                                        {__formRequest?.mapEmbed ? (
                                            <div className="max-h-148px w-100 position-relative">
                                                <iframe
                                                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75255.57767416943!2d115.40225729051069!3d-8.692688057142671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd26d1fd9a2805d%3A0x53dd9b00e8e16da3!2sThe%20Lembongan%20Traveller!5e0!3m2!1sen!2sid!4v1783960380802!5m2!1sen!2sid"
                                                    src={__formRequest.mapEmbed}
                                                    width="100%"
                                                    height="100%"
                                                    loading="lazy"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                {/*Emails*/}
                                <div className="pb-4 pt-3">
                                    <div className="hstack align-items-center text-center">
                                        <h6 className="">Phones</h6>
                                        <BtnPrimary
                                            className="ms-auto"
                                            isOutline
                                            handle={(e) => {
                                                e.preventDefault()
                                                _handleArrToggle(
                                                    -1,
                                                    'phones',
                                                    //@ts-ignore
                                                    initPhoneForm(),
                                                )
                                            }}>
                                            Add Phone
                                        </BtnPrimary>
                                    </div>

                                    {!isEmpty(__formRequest?.phones) ? (
                                        <div className="pt-3 vstack gap-3">
                                            {__formRequest?.phones.map(
                                                (vm, index) => {
                                                    return (
                                                        <div
                                                            className="p-3 border border-neutral-400 rounded-2"
                                                            key={index}>
                                                            <div className="row gx-3">
                                                                <div className="col-md">
                                                                    <FormInput
                                                                        required
                                                                        label="Title"
                                                                        name="title"
                                                                        placeholder="e.g Info"
                                                                        value={
                                                                            vm.title
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'phones',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md">
                                                                    <FormInput
                                                                        required
                                                                        label="phone"
                                                                        name="phone"
                                                                        placeholder="e.g 628770xxxx"
                                                                        value={
                                                                            vm.phone
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'phones',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="">
                                                                        <BtnCircleRemove
                                                                            actions={{
                                                                                remove: () =>
                                                                                    _handleArrToggle(
                                                                                        index,
                                                                                        'phones',
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                    ) : null}
                                </div>

                                {/*Phones*/}
                                <div className="pb-4 pt-3">
                                    <div className="hstack align-items-center text-center">
                                        <h6 className="">Emails</h6>
                                        <BtnPrimary
                                            className="ms-auto"
                                            isOutline
                                            handle={(e) => {
                                                e.preventDefault()
                                                _handleArrToggle(
                                                    -1,
                                                    'emails',
                                                    //@ts-ignore
                                                    initEmailForm(),
                                                )
                                            }}>
                                            Add Email
                                        </BtnPrimary>
                                    </div>

                                    {!isEmpty(__formRequest?.emails) ? (
                                        <div className="pt-3 vstack gap-3">
                                            {__formRequest?.emails.map(
                                                (vm, index) => {
                                                    return (
                                                        <div
                                                            className="p-3 border border-neutral-400 rounded-2"
                                                            key={index}>
                                                            <div className="row gx-3">
                                                                <div className="col-md">
                                                                    <FormInput
                                                                        required
                                                                        label="Title"
                                                                        name="title"
                                                                        placeholder="e.g Info"
                                                                        value={
                                                                            vm.title
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'emails',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md">
                                                                    <FormInput
                                                                        required
                                                                        label="Email"
                                                                        name="email"
                                                                        type="email"
                                                                        placeholder="e.g demo@tlt.com"
                                                                        value={
                                                                            vm.email
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'emails',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="">
                                                                        <BtnCircleRemove
                                                                            actions={{
                                                                                remove: () =>
                                                                                    _handleArrToggle(
                                                                                        index,
                                                                                        'emails',
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                    ) : null}
                                </div>

                                {/*Media Social*/}
                                <div className="pb-4 pt-3">
                                    <div className="hstack align-items-center text-center">
                                        <h6 className="">Media Social</h6>
                                        <BtnPrimary
                                            className="ms-auto"
                                            isOutline
                                            handle={(e) => {
                                                e.preventDefault()
                                                _handleArrToggle(
                                                    -1,
                                                    'socialMedia',
                                                    //@ts-ignore
                                                    initSocialMediaForm(),
                                                )
                                            }}>
                                            Add Media Social
                                        </BtnPrimary>
                                    </div>

                                    {!isEmpty(__formRequest?.socialMedia) ? (
                                        <div className="pt-3 vstack gap-3">
                                            {__formRequest?.socialMedia.map(
                                                (vm, index) => {
                                                    return (
                                                        <div
                                                            className="p-3 border border-neutral-400 rounded-2"
                                                            key={index}>
                                                            <div className="row gx-3">
                                                                <div className="col-12 hstack flex-wrap justify-content-beetwen gap-3">
                                                                    <h6 className="fs-14">
                                                                        {
                                                                            vm.name
                                                                        }
                                                                    </h6>

                                                                    <div className="">
                                                                        <BtnCircleRemove
                                                                            actions={{
                                                                                remove: () =>
                                                                                    _handleArrToggle(
                                                                                        index,
                                                                                        'socialMedia',
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <FormInput
                                                                        required
                                                                        label="Key"
                                                                        name="key"
                                                                        placeholder="e.g Facebook"
                                                                        value={
                                                                            vm.key
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'socialMedia',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <FormInput
                                                                        required
                                                                        label="Name"
                                                                        name="name"
                                                                        placeholder="e.g Facebook TLT Property"
                                                                        value={
                                                                            vm.name
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'socialMedia',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <FormInput
                                                                        className="mb-0"
                                                                        required
                                                                        label="Icon"
                                                                        name="icon"
                                                                        placeholder="e.g fa-facebook"
                                                                        value={
                                                                            vm.icon
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'socialMedia',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <FormInput
                                                                        className="mb-0"
                                                                        required
                                                                        label="Link"
                                                                        name="link"
                                                                        placeholder="e.g https://www.facebook.com/TLT-Property"

                                                                        value={
                                                                            vm.link
                                                                        }
                                                                        actions={{
                                                                            onChange:
                                                                                (
                                                                                    name,
                                                                                    value,
                                                                                ) =>
                                                                                    _handleArrChange(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        'socialMedia',
                                                                                    ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        }
                        configHandle={{
                            urlAPIUpdate: () =>
                                updateWebConfig(__selectedId, __formRequest),
                            initialForm: () =>
                                __setFormRequest(initMapForm(__detailData)),
                            callBack: (newData) => {
                                if (__isEdit) {
                                    __actionUpdate(newData)
                                }
                            },
                            emptySelect: () =>
                                __setFormRequest(() => ({
                                    ...initMapForm({}),
                                })),
                        }}
                    />
                </CreatePortalLayout>
            </LoadingStatePreviewData>
        </>
    )
}

export default TabWebConfig
