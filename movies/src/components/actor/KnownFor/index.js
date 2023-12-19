import React from 'react';
import {Grid} from '@mui/material';
import {Link} from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import MiniMovieCard from "../../movie/miniFilmCard";

const KnownFor = ({actorId, knownFor}) => {
    return (
        <Grid container spacing={2}>

            <ImageList
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)"
                }}
            >
                {knownFor.map((film) => (
                    <ImageListItem>
                        <Link to={`/actors/${actorId}/movies/${film.id}`}>
                            <MiniMovieCard movie={film} />
                        </Link>
                    </ImageListItem>
                ))}

            </ImageList>
        </Grid>
    );
};

export default KnownFor;
