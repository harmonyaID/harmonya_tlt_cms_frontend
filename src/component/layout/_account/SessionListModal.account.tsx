import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { MDAuthSessions } from '@/config/modal.config.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiGetAuthSessions } from '@/service/api/auth.api.ts'
import { Devices } from 'iconsax-react'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper.ts'
import { Button } from 'antd'
import { BtnDanger, BtnInfo } from '@/component/general/Button.tsx'
import { IconButtonRemove } from '@/component/general/IconButton.tsx'
import actionModal from '@/helper/base/actionModal.helper.ts'

const SessionListModalAccount = ({
    actions,
    list,
}: {
    list: any[]
    actions: {
        onConfirmRemoveAll: () => void
        onConfirmRemove: (session) => void
    }
}) => {
    return (
        <ModalMiddle
            id={MDAuthSessions}
            title="Logged In Devices"
            isScrollable={false}>
            <div className="vstack gap-3">
                {list?.map((item) => (
                    <div
                        key={item.id}
                        className="hstack gap-2 bg-neutral-500 rounded p-2">
                        <div>
                            <span className="me-2">
                                <Devices variant="Bulk" size={25} />
                            </span>
                        </div>
                        <div>
                            <p className="m-0 fw-semibold">{item.deviceName}</p>
                            <p className="m-0 text-neutral-300">
                                Last Active{' '}
                                {actionFormatDateStrict(
                                    item.lastActiveAt,
                                    'DD MMM YYYY',
                                    'YYYY-MM-DD HH:ii',
                                )}
                            </p>
                        </div>

                        <div className="ms-auto">
                            <IconButtonRemove
                                actions={{
                                    remove: () => actions.onConfirmRemove(item),
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="hstack gap-3 mt-3">
                <BtnInfo
                    isOutline
                    handle={() => actionModal(MDAuthSessions, true)}>
                    Close
                </BtnInfo>
                <BtnDanger handle={() => actions.onConfirmRemoveAll()}>
                    Logout All
                </BtnDanger>
            </div>
        </ModalMiddle>
    )
}

export default SessionListModalAccount
