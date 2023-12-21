import React from "react";
import Grid from "@mui/material/Grid";
import Header from "../../movie/headerMovieList";
import ReviewList from "../../review/reviewList";

function ReviewPageTemplate({reviews, action, children}) {

    return (
        <Grid container sx={{padding: '20px'}}>
            <Grid item xs={12}>
                <Header title="My Reviews"/>
            </Grid>
            <Grid item container xs={12} spacing={5} sx={{marginBottom: '20px'}}>
                <ReviewList reviews={reviews} action={action}></ReviewList>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ReviewPageTemplate;