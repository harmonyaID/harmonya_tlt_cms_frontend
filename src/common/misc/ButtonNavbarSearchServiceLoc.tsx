import { FC } from 'react'
import * as Icon from 'react-feather'
import _ from 'lodash'
import { MDGeneralSearchServiceLocation } from '@/config/modal.config'
import actionModal from '@/helper/base/actionModal.helper'
import { ButtonNavbarSearchServiceLocProps } from './type/misc.type'

const ButtonNavbarSearchServiceLoc: FC<ButtonNavbarSearchServiceLocProps> = ({
   id = MDGeneralSearchServiceLocation,
   title = 'Search Service Location',
   actions = {
      handleClick: () => {},
   },
}) => {
   const _handleToggleSearchServiceLoc = (isClose: boolean = false) => {
      actionModal(id, isClose)

      if (_.isFunction(actions.handleClick)) {
         actions.handleClick()
      }
   }

   return (
      <>
         <button
            className="btn btn-neutral-500P bg-neutral-500 rounded-3 text-neutral-300"
            type="button"
            onClick={() => _handleToggleSearchServiceLoc()}>
            <span className="me-2">
               <Icon.Search size={18} />
            </span>{' '}
            {title}
            <span className="ms-4">
               <kbd className="me-1">⌘</kbd>
               <kbd>K</kbd>
            </span>
         </button>
      </>
   )
}

export default ButtonNavbarSearchServiceLoc
