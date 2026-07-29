export const mapSEOFormConfig = (passSEO) => ({
    info: passSEO?.info || '',
    title: passSEO?.title || '',
    slug: passSEO?.slug || '',
    description: passSEO?.description || '',
    metaKeyword: passSEO?.metaKeyword || '',
    canonicalUrl: passSEO?.canonicalUrl || '',
    robotIndex: passSEO.robotIndex ? 1 : 0,
    robotFollow: passSEO.robotFollow ? 1 : 0,
    thumbnail: '',
    deleteThumbnail: '',
    schemaMarkup: null,
})

export const initSEOFormConfig = {
    info: '',
    title: '',
    slug: '',
    description: '',
    metaKeyword: '',
    canonicalUrl: '',
    robotIndex: 1,
    robotFollow: 1,
    thumbnail: '',
    schemaMarkup: null,
}
