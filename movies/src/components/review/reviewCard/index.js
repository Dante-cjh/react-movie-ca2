import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png'
import {useQuery} from "react-query";
import {getMovie} from "../../../api/tmdb-api";
import Spinner from "../../spinner";

export default function ReviewCard({review, action}) {
    const {data: movie, error, isLoading, isError} = useQuery(
        ["movieReview", {id: review.movieId}],
        getMovie
    )

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title={
                    <Typography variant="h5" component="p">
                        {movie.original_title}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={{height: 500}}
                image={
                    movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <CalendarIcon fontSize="small"/>
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <StarRateIcon fontSize="small"/>
                            {"  "} {movie.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(review)}
                <Link
                    to={`/reviews/${review.movieId}`}
                    state={{
                        review: review,
                        movie: movie,
                    }}
                >
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}