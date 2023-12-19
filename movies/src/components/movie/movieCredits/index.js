import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import img from "../../../images/film-poster-placeholder.png";
import {useQuery} from "react-query";
import {getMovieCredits} from "../../../api/tmdb-api";
import Spinner from "../../spinner";

const MovieCredits = ({movieId}) => {

    const { data: credits, error, isLoading, isError } = useQuery(
        ["movieCredits", { id: movieId }],
        getMovieCredits
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const actors = credits.cast;

    return (
        <Grid container spacing={2} sx={{paddingTop: 2}}>
            {actors.map((actor) => (
                <Grid item xs={6} md={3} key={actor.id}>
                    <Card>
                        <CardActionArea>
                            <Link to={`/movies/${movieId}/actors/${actor.id}`}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : img
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle2">
                                        {actor.name}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MovieCredits;