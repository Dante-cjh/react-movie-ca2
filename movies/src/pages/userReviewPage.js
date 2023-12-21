import React, {useContext} from "react";
import {MoviesContext} from "../contexts/moviesContext";
import PageTemplate from "../components/templatePage/templateReviewPage";
import RemoveReview from "../components/cardIcons/removeReview";

const UserReviewPage = () => {
    const {myReviews} = useContext(MoviesContext);
    console.log(myReviews)
    return (
        <PageTemplate
            reviews={myReviews}
            action={(review) => <RemoveReview review={review} />}
        />
    )
}

export default UserReviewPage;