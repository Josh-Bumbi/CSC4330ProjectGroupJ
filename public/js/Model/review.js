class Review {
    constructor(reviewerId, reviewedId, message, stars, reviewId = null) {
        this.reviewerId = reviewerId;
        this.reviewedId = reviewedId;
        this.message = message;
        this.stars = stars;
        this.reviewId = reviewId;
    }
}

export {Review};
