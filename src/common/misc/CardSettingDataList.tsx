import { FC, ReactNode } from 'react'
import * as Icon from 'react-feather'
import CardPreview from '@/component/card/CardPreview'
import { BtnInfo } from '@/component/general/Button'
import {
   IconButtonEdit,
   IconButtonRemove,
} from '@/component/general/IconButton'
import { CardSettingDataListProps } from './type/misc.type'

const CardSettingDataList: FC<CardSettingDataListProps> = ({
   item = {},
   titleAssign = '',
   isRemove = true,
   isEdit = true,
   extraButtonAssign = <></>,
   actions = {
      remove: () => {},
      toggleAddOrEdit: () => {},
      toggleAssignCategory: () => {},
   },
}) => {
   return (
      <CardPreview className="hover-action-border-primary-without-pointer">
         <div className="d-flex align-items-center justify-content-between w-100">
            <p className="fw-400 text-neutral-100 my-0">{item.name}</p>

            <div className="d-flex align-items-center gap-2">
               {isRemove && (
                  <IconButtonRemove
                     actions={{
                        remove: () => actions.remove(item),
                     }}
                  />
               )}

               {isEdit && (
                  <IconButtonEdit
                     actions={{
                        edit: () => actions.toggleAddOrEdit(item),
                     }}
                  />
               )}
            </div>
         </div>

         {titleAssign && (
            <>
               <p className="fs-13 text-neutral-300 mt-4 mb-3">Assign</p>

               <div className="d-flex flex-grow-1 flex-wrap overflow-hidden">
                  <div className="pe-2 mb-2">
                     <BtnInfo
                        className="btn-sm"
                        hasIcon
                        isOutline
                        handle={() => actions.toggleAssignCategory(item)}>
                        <span className="me-1">{titleAssign}</span>
                        {isEdit ? <Icon.Edit size={16} /> : null}
                     </BtnInfo>
                  </div>

                  {extraButtonAssign}
               </div>
            </>
         )}
      </CardPreview>
   )
}

export default CardSettingDataList
