import { BtnCircleRestore, BtnCircleX } from '@/component/general/Button.tsx'

const TrashActionButtons = ({
    actions,
    selected,
}: {
    selected: any
    actions: {
        permanentRemove: (data) => void
        restore: (data) => void
    }
}) => {
    return (
        <>
            <BtnCircleX
                actions={{
                    click: () => {
                        actions?.permanentRemove(selected)
                    },
                }}
            />

            <BtnCircleRestore
                actions={{
                    click: () => {
                        actions?.restore(selected)
                    },
                }}
            />
        </>
    )
}

export default TrashActionButtons