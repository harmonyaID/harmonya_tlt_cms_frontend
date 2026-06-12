export const secondSidebar = (): void => {
    const bodyElement: HTMLBodyElement =
        document.getElementsByTagName('body')[0]
    const isMobileSide: boolean = window.matchMedia(
        '(max-width: 1024px)',
    ).matches

    if (isMobileSide) {
        bodyElement.classList.toggle('wp-second-sidebar')
    } else {
        bodyElement.classList.add('wp-second-sidebar')
    }
}

export const removeSecondSidebar = (): void => {
    const bodyElement: HTMLBodyElement =
        document.getElementsByTagName('body')[0]
    bodyElement.classList.remove('wp-second-sidebar')
}
