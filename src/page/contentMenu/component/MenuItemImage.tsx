import { useEffect, useState } from 'react'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import {
    getMenuItemTypeId,
    getMenuItemTypeName,
    MEGA_MENU_ID,
} from '@/config/menu.config.ts'

export const isMegaMenuItem = (item: any) =>
    getMenuItemTypeId(item) === MEGA_MENU_ID

export const MenuItemTypeBadge = ({ item }: { item: any }) => (
    <span
        className={
            'badge rounded-pill ' +
            (isMegaMenuItem(item)
                ? 'text-bg-primary'
                : 'text-bg-neutral-200')
        }>
        {getMenuItemTypeName(item)}
    </span>
)

const MenuItemImage = ({ image }: { image?: File | string | null }) => {
    const [src, setSrc] = useState<string>('')

    useEffect(() => {
        if (image instanceof File) {
            const objectUrl = URL.createObjectURL(image)
            setSrc(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }

        setSrc(image ? String(image) : '')
    }, [image])

    if (!src) return null

    return (
        <div className="overflow-hidden rounded position-relative flex-shrink-0">
            <div className="wp-img-preview">
                <Image
                    src={src}
                    alt="Mega Menu Image"
                    fallback={ImgGeneralDefault}
                    className="data-img data-img-contain avatar-46 object-fit-cover"
                />
            </div>
        </div>
    )
}

export default MenuItemImage
