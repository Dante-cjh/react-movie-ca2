import React from "react";
import Review from "../reviewCard";
import Grid from "@mui/material/Grid";

const ReviewList = ({reviews, action}) => {
    let reviewCards = reviews.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Review key={m.id} review={m} action={action}/>
        </Grid>
    ));
    return reviewCards;
};

export default ReviewList;