import { useLayoutEffect, useState } from 'react'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import UserDetail from '@/page/user/container/UserDetail.tsx'
import Card from '@/component/card/Card.tsx'
import SessionList from '@/page/user/component/SessionList.tsx'
import ModalConfirmRemove from '@/component/modal/ModalConfirmRemove.tsx'
import {
    MDAuthSessions,
    MDAuthSessionsRemove,
    MDAuthSessionsRemoveAll,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiDeleteAllAuthSession,
    apiDeleteAuthSession,
    apiGetAuthSessions,
} from '@/service/api/auth.api.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'

const UserMyProfilePage = () => {
    const { __profile, __isLoadingProfile, __handleReloadProfile } =
        useGlobalPrivateContext()

    const [selected, setSelected] = useState<any>()

    const { __list, __actionRemove } = useDataListHook({
        urlAPI: apiGetAuthSessions,
    })

    const _handleConfirmRemove = (session) => {
        setSelected(session)
        actionModal(MDAuthSessions, true)
        actionModal(MDAuthSessionsRemove)
    }

    const _handleConfirmRemoveAll = () => {
        actionModal(MDAuthSessions, true)
        actionModal(MDAuthSessionsRemoveAll)
    }

    const _handleSessionRemove = () => {
        apiDeleteAuthSession(selected?.id).then((res) => {
            if (isSuccess(res)) {
                __actionRemove(selected.id, 'id')
                setSelected(undefined)
                actionModal(MDAuthSessionsRemove, true)
                actionModal(MDAuthSessions, false)
            }
        })
    }

    const _handleSessionRemoveAll = () => {
        apiDeleteAllAuthSession().then((res) => {
            if (isSuccess(res)) {
                setSelected(undefined)
                actionModal(MDAuthSessionsRemoveAll, true)
                actionModal(MDAuthSessions, false)
            }
        })
    }

    useLayoutEffect(() => {
        __handleReloadProfile()
    }, [])

    return (
        <div className="vstack gap-4">
            <UserDetail title="Profile Information" id={__profile.id} />

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Card title="Logged In Sessions">
                        <SessionList
                            list={__list}
                            actions={{
                                onConfirmRemoveAll: _handleConfirmRemoveAll,
                                onConfirmRemove: _handleConfirmRemove,
                            }}
                        />
                    </Card>
                </div>
            </div>

            <CreatePortalLayout>
                <ModalConfirmRemove
                    id={MDAuthSessionsRemove}
                    title={`Logout ${selected?.deviceName}`}
                    handleDelete={_handleSessionRemove}
                    titleButton="Logout"
                    closeModal={() => {
                        actionModal(MDAuthSessionsRemove, true)
                        actionModal(MDAuthSessions, false)
                    }}>
                    <p>
                        This will logged out the {selected?.deviceName} session
                    </p>
                </ModalConfirmRemove>

                <ModalConfirmRemove
                    id={MDAuthSessionsRemoveAll}
                    title="Logout All"
                    handleDelete={_handleSessionRemoveAll}
                    titleButton="Logout All"
                    closeModal={() => {
                        actionModal(MDAuthSessionsRemoveAll, true)
                        actionModal(MDAuthSessions, false)
                    }}>
                    <p>
                        This will logged out all sessions, including the current
                        one
                    </p>
                </ModalConfirmRemove>
            </CreatePortalLayout>
        </div>
    )
}

export default UserMyProfilePage
