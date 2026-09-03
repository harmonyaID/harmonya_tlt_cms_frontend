import { useNavigate } from 'react-router'
import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import Card from '@/component/card/Card.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import useUserDetail from '@/page/user/hook/useUserDetail.hook.ts'
import userPath from '@/path/user.path.ts'

const UserDetail = ({
    title = 'Staff Information',
    id,
}: {
    title?: string
    id?: string
}) => {
    const navigate = useNavigate()

    const { __detail, __isLoading } = useUserDetail(id)

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <Card>
                    <div className="row mb-4 g-3">
                        <div className="col-md">
                            <div className="fw-600 fs-18 text-neutral-100 mb-0">
                                {title}
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <BtnPrimary
                                className="btn-sm py-1"
                                isOutline
                                title="Edit Data"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(userPath.myProfileEdit)
                                }}>
                                Edit
                            </BtnPrimary>
                        </div>
                    </div>

                    {__isLoading || isEmpty(__detail) ? (
                        <LoadingNotAvailable isLoading={__isLoading} />
                    ) : (
                        <HorizontalLoopDataLogic
                            list={[
                                objectListDetail(
                                    'Full Name',
                                    __detail.fullName || '',
                                ),
                                objectListDetail(
                                    'Gender',
                                    __detail?.gender?.name || '-',
                                ),
                                objectListDetail(
                                    'Country',
                                    __detail?.country?.name || '',
                                ),
                                objectListDetail(
                                    'Address',
                                    __detail.address || '',
                                ),
                                objectListDetail('Email', __detail.email || ''),
                                objectListDetail('Phone', __detail.phone || ''),
                                objectListDetail(
                                    'Super Admin',
                                    <TextTrueOrFalse
                                        value={__detail.isSuperadmin}
                                    />,
                                ),
                                objectListDetail(
                                    'Status',
                                    <TextTrueOrFalse
                                        value={__detail.isActive}
                                        textTrue="Active"
                                        textFalse="Not Active"
                                    />,
                                ),
                            ]}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

export default UserDetail
