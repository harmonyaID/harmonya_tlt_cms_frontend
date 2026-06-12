import * as _ from 'lodash'
import { listAvatarStyle } from '@/config/base/avatarStyle.config'

const URL_API: string = 'https://ui-avatars.com/api/'

interface AvatarStyle {
   color?: string
   background?: string
   hard?: {
      color: string
      background: string
   }
   alphabet?: string[]
}

export const requestAvatarStyle = (textName: string = ''): AvatarStyle => {
   const alpha = textName.charAt(0).toLowerCase()
   let styleDefault = listAvatarStyle[0]

   for (let i = 0; i < listAvatarStyle.length; i++) {
      if (
         listAvatarStyle[i].alphabet &&
         listAvatarStyle[i].alphabet.findIndex((e) => e === alpha) > -1
      ) {
         styleDefault = listAvatarStyle[i]
         break
      }
   }

   return styleDefault
}

export const urlAvatarText = (
   name: string = 'By System',
   bg: string = '',
   isCircle: boolean = false,
   isHard: boolean = true,
) => {
   const requestStyle = requestAvatarStyle(name)

   let query = ''

   if (isCircle) {
      query += '&rounded=true'
   }

   if (!_.isEmpty(requestStyle)) {
      const dataColor =
         isHard && requestStyle.hard
            ? requestStyle.hard.color
            : requestStyle.color
      const dataBackground =
         isHard && requestStyle.hard
            ? requestStyle.hard.background
            : requestStyle.background

      query += '&color=' + dataColor + '&background=' + dataBackground
   } else if (!bg) {
      query += '&color=fff&background=random'
   }

   return URL_API + '?name=' + name + query
}

export const defaultURLAvatarText = (
   name = '',
   isCircle = true,
   isHard = true,
) => {
   const requestStyle = requestAvatarStyle(name)

   let query = ''
   if (isCircle) {
      query += '&rounded=true'
   }

   if (!_.isEmpty(requestStyle)) {
      const dataColor =
         isHard && requestStyle.hard
            ? requestStyle.hard.color
            : requestStyle.color
      const dataBackground =
         isHard && requestStyle.hard
            ? requestStyle.hard.background
            : requestStyle.background

      query += '&color=' + dataColor + '&background=' + dataBackground
   } else {
      query += '&color=fff&background=random'
   }

   return URL_API + '?name=' + name + query
}
