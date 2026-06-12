import { series } from 'async'
import notifyMessageHelper from './notifyMessage.helper.ts'

export const notifySuccess = (
   msg: string,
   timeout: number = 3000,
   container: string = '.page-container',
): void => {
   notifyMessageHelper(container, {
      style: 'simple',
      message: msg,
      position: 'top-right',
      type: 'success',
      showClose: true,
      timeout: timeout,
      onShown: function () {},
      onClosed: function () {},
   })
}

export const notifyError = (
   msg: string,
   timeout: number = 3000,
   container: string = '.page-container',
): void => {
   notifyMessageHelper(container, {
      style: 'simple',
      message: msg,
      position: 'top-right',
      type: 'danger',
      showClose: true,
      timeout: timeout,
      onShown: function () {},
      onClosed: function () {},
   })
}

export const notifyAPIError = (
   errData: any,
   displayInternalMsg: boolean = false,
   timeout: number = 3500,
): void => {
   const container: string = '.page-container'

   if (errData) {
      if (displayInternalMsg) {
         let internalMsg: string = ''

         series([
            function (cb: any) {
               if (errData.internalMsg !== '') {
                  try {
                     // Loop through JSON messages
                     const parseInternalMsg: any = JSON.parse(
                        errData.internalMsg,
                     )
                     let totalErr: number = 0
                     const maxDisplayErr: number = 5

                     Object.keys(parseInternalMsg).forEach((key) => {
                        if (totalErr <= maxDisplayErr) {
                           internalMsg += parseInternalMsg[key] + '<br>'
                           totalErr++
                        }
                     })
                  } catch (err) {
                     // Display as string
                     if (errData.code !== 'E004') {
                        // Do not display DATABASE TRANSACTION ERROR
                        if (typeof errData.internalMsg === 'string') {
                           const maxLength: number = 150

                           internalMsg =
                              errData.internalMsg.length > maxLength
                                 ? errData.internalMsg.substring(
                                      0,
                                      maxLength - 3,
                                   ) + '...'
                                 : errData.internalMsg
                        }
                     }
                  }
               }

               cb(null, '')
            },
            function (cb: any) {
               notifyMessageHelper(container, {
                  style: 'flip',
                  message:
                     '<span class="f-w-500">' +
                     errData.message +
                     ' [' +
                     errData.code +
                     ']' +
                     '</span>' +
                     '<br>' +
                     internalMsg,
                  position: 'top-right',
                  timeout: timeout + 2000, // Add Extra time
                  type: 'danger',
                  showClose: true,
                  onShown: function () {},
                  onClosed: function () {},
               })

               if (errData.attributes && errData.attributes.length) {
                  errData.attributes.forEach((vd: any) => {
                     notifyMessageHelper(container, {
                        style: 'flip',
                        message:
                           '<span class="f-w-500">' +
                           (vd?.msg ? vd?.msg : vd?.message) +
                           '</span>',
                        position: 'top-right',
                        type: 'danger',
                        showClose: true,
                        timeout: timeout + 2000, // Add Extra time
                        onShown: function () {},
                        onClosed: function () {},
                     })
                  })
               }

               cb(null, '')
            },
         ])
      } else {
         notifyMessageHelper(container, {
            style: 'flip',
            message: errData.msg + ' [' + errData.code + ']',
            position: 'top-right',
            type: 'danger',
            showClose: true,
            timeout: timeout,
            onShown: function () {},
            onClosed: function () {},
         })
      }
   } else {
      notifyMessageHelper(container, {
         style: 'flip',
         message: 'Unknown Error Occurred',
         position: 'top-right',
         type: 'danger',
         showClose: true,
         timeout: timeout,
         onShown: function () {},
         onClosed: function () {},
      })
   }
}
