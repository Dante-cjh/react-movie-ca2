import React, { useEffect, useState} from "react";
import Header from "../../movie/headerMovieList";
import FilterCard from "../../movie/filterMoviesCard";
import MovieList from "../../movie/movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({movies, title, action, children}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortWay, setSortWay] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [displayedMovies, setDisplayedMovies] = useState(movies);
    const genreId = Number(genreFilter);

    useEffect(() => {
        let displayedMovies = movies
            .filter((m) => {
                return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
            })
            .filter((m) => {
                return genreId > 0 ? m.genre_ids.includes(genreId) : true;
            });

        if (sortWay === "popularity" && sortOrder !== "null" && sortOrder) {
            displayedMovies = displayedMovies.sort((a, b) => {
                return sortOrder === 'DESC' ? b.popularity - a.popularity : a.popularity - b.popularity;
            });
        } else if (sortWay === "vote" && sortOrder !== "null" && sortOrder) {
            displayedMovies = displayedMovies.sort((a, b) => {
                return sortOrder === 'DESC' ? b.vote_average - a.vote_average : a.vote_average - b.vote_average;
            });
        }
        setDisplayedMovies(displayedMovies);
    }, [movies, nameFilter, genreId, sortWay, sortOrder]);

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    const sortWayChange = (type) => {
        if (type === "popularity") setSortWay(type);
        else if (type === "vote") setSortWay(type);
        else setSortWay("");
    }

    const sortOrderChange = (type) => {
        if (type === "ASC") setSortOrder(type);
        else if (type === "DESC") setSortOrder(type);
        else setSortOrder("");
    }

    return (
        <Grid container sx={{padding: '20px'}}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid item xs={12} container spacing={5} sx={{marginBottom: '20px'}}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortWayFilter={sortWay}
                        sortOrderFilter={sortOrder}
                        sortWayChange={sortWayChange}
                        sortOrderChange={sortOrderChange}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                {children}
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;