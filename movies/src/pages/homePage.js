import React from "react";
import {getMovies} from "../api/tmdb-api";
import PageTemplate from "../components/templatePage/templateMovieListPage";
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import {Pagination} from "@mui/material";

const HomePage = (props) => {

    const [page, setPage] = React.useState(1);
    const {data, error, isLoading, isError} = useQuery(['discover', {page: page}], getMovies)

    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    const handleChange = (event, value) => {
        setPage(value);
    };

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie}/>
            }}
        >
            <Pagination count={100} defaultPage={6} boundaryCount={2}
                        showFirstButton showLastButton color="primary"
                        page={page} size="large" onChange={handleChange}/>
        </PageTemplate>
    );
};
export default HomePage;