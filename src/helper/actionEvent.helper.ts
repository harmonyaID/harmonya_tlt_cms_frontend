import { ChangeEvent } from 'react'
import { notifyError } from './base/notifyGeneral.helper'

interface EventChangeResult {
   name: string
   value: string | number
   isChecked: number | boolean | null
}

export const eventChange = (
   event: ChangeEvent<HTMLInputElement>,
   isBooleanChecked: boolean = false,
): EventChangeResult => {
   const target = event.target
   let isChecked: number | boolean | null = null

   const value = target?.type === 'number' ? Number(target.value) : target.value
   const name = target.name

   if (target?.type === 'checkbox') {
      if (!isBooleanChecked) {
         isChecked = target.checked ? 1 : 0
      } else {
         isChecked = target.checked ? true : false
      }
   }

   return { name, value, isChecked }
}

interface EventChangeFileResult {
   name: string
   files: File[]
   filesOverSize: any[]
}

export const eventUploadFile = (
   event: ChangeEvent<HTMLInputElement> | DragEvent,
   maxSize: number = 10240000,
): EventChangeFileResult => {
   const target = event.target as HTMLInputElement
   const files = target.files || (event as DragEvent).dataTransfer?.files
   const name = target.name
   const filesOverSize: any[] = []

   if (!files || !files.length) {
      return { name, files: [], filesOverSize }
   }

   const fileSizeUnder10MB: File[] = []

   Array.from(files).forEach((file, orderFile) => {
      const fileSize = files[orderFile].size

      if (fileSize <= maxSize) {
         fileSizeUnder10MB.push(files[orderFile])
      } else {
         filesOverSize.push(files[orderFile].name)
         notifyError(`Size file ${files[orderFile].name} <b>> 10MB</b>`)
      }
   })

   return { name, files: fileSizeUnder10MB, filesOverSize }
}
