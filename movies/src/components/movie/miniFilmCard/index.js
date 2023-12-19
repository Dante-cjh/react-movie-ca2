import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png'
import {ImageListItemBar} from "@mui/material";

export default function MiniMovieCard({movie}) {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 200}}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container item xs={6}>
                    <ImageListItemBar title={movie.title}/>
                </Grid>
            </CardContent>
        </Card>
    )
}