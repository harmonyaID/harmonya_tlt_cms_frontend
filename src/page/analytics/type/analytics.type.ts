export type TopBlogViews = {
    id: number
    title: string
    slug: string
    totalViews: number
}

export type TopBoatInquiries = {
    id: number
    name: string
    totalInquiries: number
}

export type TopPropertyViews = {
    id: number
    nickname: string
    totalViews: number
}

export type RatedProperties = {
    id: number
    nickname: string
    averageRating: number
    totalReviews: number
}

export type Analytics = {
    highestRatedProperties: RatedProperties[]
    lowestRatedProperties: RatedProperties[]
    topBlogViews: TopBlogViews[]
    topBoatInquiries: TopBoatInquiries[]
    topPropertyViews: TopPropertyViews[]
}
