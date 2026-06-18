import { RESTORE_STATE } from './advanceSearch.config'

type AnyObject = Record<string, any>

export const objPassState = (allState: AnyObject = {}) => ({
   state: {
      passState: allState,
   },
})

export const objRestoreState = (allState: AnyObject = {}) => ({
   state: { restoreState: allState },
})

export const objDataSearch = (passData: AnyObject = {}) => ({
   [RESTORE_STATE]: passData,
})

export const objDataSearchOther = (
   passData: AnyObject = {},
   otherState: AnyObject = {},
) => ({
   [RESTORE_STATE]: passData,
   ...otherState,
})
