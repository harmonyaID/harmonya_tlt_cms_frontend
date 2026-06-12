const googleMapURL: string = 'https://www.google.com/maps/search/?api=1&query='

export const openMapLocationBlank = (
    latitude: string | number = 0,
    longitude: string | number = 0,
) => {
    const coordinate: string | any = latitude + ',' + longitude
    window.open(googleMapURL + coordinate, '_blank')
}

export const openMapLocationBlankString = (location: string) => {
    window.open(googleMapURL + location, '_blank')
}
