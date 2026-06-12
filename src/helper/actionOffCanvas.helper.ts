import loadBootstrapHelper from './base/loadBootstrap.helper'

export default async function actionOffCanvas(
    idCanvas: string,
    hidden: boolean = false,
    zIndex: number = 1005,
) {
    const dataCanvas: HTMLElement | null = document.getElementById(idCanvas)

    if (!dataCanvas) {
        return
    } else {
        const { Offcanvas } = await loadBootstrapHelper()

        if (hidden) {
            const bootstrapCanvasClose = Offcanvas.getInstance(dataCanvas)
            bootstrapCanvasClose.hide()
        } else {
            const bootstrapCanvas = new Offcanvas(dataCanvas)
            bootstrapCanvas.show()

            const canvasBackdrop = document.querySelector(
                'offcanvas-backdrop.show',
            )

            if (canvasBackdrop) {
                canvasBackdrop['style'].zIndex = zIndex
            }
        }
    }
}
