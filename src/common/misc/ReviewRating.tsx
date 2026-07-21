interface TypeRatingProps {
    rating?: number
}

const ReviewRating = ({ rating }: TypeRatingProps) => {
    let stars: string = ''
    for (let i: number = 1; i <= rating; i++) {
        stars += "<span class='active text-warning-200'>★</span>"
    }

    for (let i: number = 4; i >= rating; i--) {
        stars += "<span class=''>★</span>"
    }

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: stars,
            }}
        />
    )
}

export default ReviewRating
