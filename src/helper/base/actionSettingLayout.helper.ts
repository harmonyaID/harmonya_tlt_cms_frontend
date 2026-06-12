import {
   DATA_SERVICE_NAME_THEME_MODE,
   DATA_THEME_NAME,
} from '@/config/base/themeMode.config'

const getHtmlElement = (): HTMLElement | null => {
   return document.querySelector('html') as HTMLElement
}

const getBodyElement = (): HTMLBodyElement | null => {
   return document.querySelector('body') as HTMLBodyElement
}

export const settingClassNameHTMLMain = (isAdd : boolean = true) => {
   const htmlElement = getHtmlElement()
   if (isAdd) {
      htmlElement?.classList.add(DATA_SERVICE_NAME_THEME_MODE)
   } else {
      htmlElement?.classList.remove(DATA_SERVICE_NAME_THEME_MODE)
      htmlElement?.removeAttribute(DATA_THEME_NAME)
   }
}

export const settingBodyLayout = (): void => {
   setTimeout(() => {
      const htmlElement = getHtmlElement()
      htmlElement?.classList.add(DATA_SERVICE_NAME_THEME_MODE)

      const bodyElement = getBodyElement()
      bodyElement?.classList.add('bg-neutral-700', 'overflow-y')
   }, 1)
}

export const clearSettingBodyLayout = (): void => {
   const htmlElement = getHtmlElement()
   htmlElement?.classList.remove(DATA_SERVICE_NAME_THEME_MODE)
   htmlElement?.removeAttribute(DATA_THEME_NAME)

   const bodyElement = getBodyElement()
   bodyElement?.classList.remove('bg-neutral-700', 'overflow-y')
}
