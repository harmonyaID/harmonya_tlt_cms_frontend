import loadBootstrapHelper from './loadBootstrap.helper.ts'

export default async function actionModal(
   idName: string,
   hidden: boolean = false,
   zIndex: number = 1005,
) {
   const dataModal: HTMLElement | null = document.getElementById(idName)

   if (!dataModal) {
      return
   } else {
      const { Modal } = await loadBootstrapHelper()

      if (hidden) {
         const bootstrapModalClose = Modal.getInstance(dataModal)
         bootstrapModalClose.hide()
      } else {
         const bootstrapModal = new Modal(dataModal)
         bootstrapModal.show()

         const modalBackdrop = document.querySelector('.modal-backdrop.show')

         if (modalBackdrop) {
            modalBackdrop['style'].zIndex = zIndex
         }
      }
   }
}
