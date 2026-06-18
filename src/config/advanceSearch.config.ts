import _ from 'lodash'
import { objectSelectOption } from './objectData.config'

export const RESTORE_STATE = 'dataSearch'
export const RESTORE_COUNT = 'dataCount'

export const RESTORE_COUNT_ADVANCE = 'countAdvance'
export const RESTORE_IS_USE_SEARCH = 'isUseSearch'

export const optionLimit = [
   objectSelectOption(100, 100),
   objectSelectOption(200, 200),
   objectSelectOption(300, 300),
   objectSelectOption(400, 400),
   objectSelectOption(500, 500),
]

export const countAdvanceSearch = (
   formRequest: object | any = {},
   formAdvanceSearch: object | any = {},
) => {
   return Object.keys(formRequest)
      .filter((key) => {
         const value = formRequest[key]

         if (value === 0 || value === '') {
            return false
         }

         if (typeof value === 'number') {
            return true
         }

         return !_.isEmpty(value)
      })
      .reduce((count, key) => {
         if (_.has(formAdvanceSearch, key) && !_.isEmpty(formAdvanceSearch)) {
            return count + 1
         }
         return count
      }, 0)
}
