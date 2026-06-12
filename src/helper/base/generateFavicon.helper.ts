import { LOGO_FAVICON } from '@/config/logoPath.config.ts'

const generateFaviconHelper = (): void => {
   let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
   if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
   }
   link.href = LOGO_FAVICON
}

export default generateFaviconHelper
