export const sidebarToggleSize = (): void => {
   const isDesktop: boolean = window.matchMedia('(min-width: 1440px)').matches
   const isMobileSide: boolean = window.matchMedia(
      '(max-width: 1024px)',
   ).matches

   if (isDesktop) {
      const elementBody: HTMLBodyElement =
         document.getElementsByTagName('body')[0]
      // const elementNavbar = document.querySelector('.navbar-main') as HTMLElement | null;
      // const elementContent = document.querySelector('.page-container') as HTMLElement | null;

      elementBody.classList.toggle('body-wp-small')
      // elementNavbar?.classList.toggle('body-wp-small');
      // elementContent?.classList.toggle('body-wp-small');
   } else if (isMobileSide) {
      const bodyElement: HTMLBodyElement =
         document.getElementsByTagName('body')[0]
      const overlay: HTMLElement | null =
         document.querySelector('.overlay-sidebar')
      const elementSidebar: HTMLElement | null =
         document.querySelector('.page-sidebar')

      bodyElement.classList.toggle('body-hide-overlay')
      overlay?.classList.toggle('overlay-active')
      elementSidebar?.classList.toggle('sidebar-full')
   }
}

export const hideSidebar = (): void => {
   const bodyElement: HTMLBodyElement = document.getElementsByTagName('body')[0]
   const isMobileSide: boolean = window.matchMedia(
      '(max-width: 1024px)',
   ).matches

   if (isMobileSide) {
      bodyElement.classList.toggle('body-wp-small')
   } else {
      // bodyElement.classList.toggle('body-wp-small');
      bodyElement.classList.add('body-wp-small')
   }
}

export const showSidebar = (): void => {
   const bodyElement: HTMLBodyElement = document.getElementsByTagName('body')[0]
   // bodyElement.classList.toggle('body-wp-small');
   bodyElement.classList.remove('body-wp-small')
}

export const sidebarRemoveOverlay = (): void => {
   const bodyElement: HTMLBodyElement = document.getElementsByTagName('body')[0]
   const overlayActive: HTMLElement | null = document.querySelector(
      '.overlay-sidebar.overlay-active',
   )
   const elementSidebar: HTMLElement | null =
      document.querySelector('.page-sidebar')

   overlayActive?.classList.remove('overlay-active')
   elementSidebar?.classList.remove('sidebar-full')
   bodyElement.classList.remove('body-hide-overlay')
}

export const autoRunSidebarRemoveOverlay = (): void => {
   const bodyElement: HTMLBodyElement = document.getElementsByTagName('body')[0]
   const isCheck: boolean = bodyElement.classList.contains('body-hide-overlay')

   if (isCheck) {
      sidebarRemoveOverlay()
   }
}

export const sidebarDefault = (): void => {
   // Implement the function if needed
}

export const sidebarDropdownSubMenu = (): void => {
   // Implement the function if needed
}
