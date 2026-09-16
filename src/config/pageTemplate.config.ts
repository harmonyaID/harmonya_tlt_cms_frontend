// Key Template
export const TEMPLATE_ABOUT = 'template-page-about'
export const TEMPLATE_BLOG = 'template-page-blog'
export const TEMPLATE_BLOG_DETAIL = 'template-page-blog-detail'
export const TEMPLATE_CONTACT_US = 'template-page-contact-us'
export const TEMPLATE_EXPERIENCE = 'template-page-experience'
export const TEMPLATE_EXPERIENCE_DETAIL = 'template-page-experience-detail'
export const TEMPLATE_ISLAND_GUIDE = 'template-page-island-guide'
export const TEMPLATE_INFO_PRES_AND_MEDIA = 'template-page-press-and-media'
export const TEMPLATE_INFO_CONTACT = 'template-page-contact'
export const TEMPLATE_INFO_FAQ = 'template-page-FAQ'
export const TEMPLATE_INFO_TNC = 'template-page-term-and-conditions'
export const TEMPLATE_INFO_PRIVACY_POLICY = 'template-page-privacy-policy'
export const TEMPLATE_NEIGHBOURHOOD = 'template-page-neighbourhood'
export const TEMPLATE_NEIGHBOURHOOD_DETAIL =
    'template-page-neighbourhood-detail'
export const TEMPLATE_OFFER = 'template-page-offer'
export const TEMPLATE_OFFER_DETAIL = 'template-page-offer-detail'
export const TEMPLATE_PROPERTY = 'template-page-property'
export const TEMPLATE_PROPERTY_DETAIL = 'template-page-property-detail'

// ------------------------ Page Template
// 'template-page-blog-detail' -> 'Blog Detail'
export function formatTemplateLabel(value: string): string {
    return value
        .replace(/^template-page-/, '')
        .split('-')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const createTemplateOptions = <T extends string>(
    values: readonly T[],
) => {
    return values.map((value) => ({
        label: formatTemplateLabel(value),
        value,
    }))
}

// Config List
export const listTemplatePages = createTemplateOptions([
    TEMPLATE_ABOUT,
    TEMPLATE_BLOG,
    TEMPLATE_BLOG_DETAIL,
    TEMPLATE_CONTACT_US,
    TEMPLATE_EXPERIENCE,
    TEMPLATE_EXPERIENCE_DETAIL,
    TEMPLATE_ISLAND_GUIDE,
    TEMPLATE_INFO_PRES_AND_MEDIA,
    TEMPLATE_INFO_CONTACT,
    TEMPLATE_INFO_FAQ,
    TEMPLATE_INFO_TNC,
    TEMPLATE_INFO_PRIVACY_POLICY,
    TEMPLATE_NEIGHBOURHOOD,
    TEMPLATE_NEIGHBOURHOOD_DETAIL,
    TEMPLATE_OFFER,
    TEMPLATE_OFFER_DETAIL,
    TEMPLATE_PROPERTY,
    TEMPLATE_PROPERTY_DETAIL,
])
