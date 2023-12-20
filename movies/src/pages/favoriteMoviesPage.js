import React, {useContext, useEffect, useState} from "react";
import PageTemplate from "../components/templatePage/templateMovieListPage";
import {useQueries} from "react-query";
import {getFavouriteMovies, getMovie} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import {AuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

const FavoriteMoviesPage = () => {
    const {isAuthenticated, userName} = useContext(AuthContext);
    const [movieIds, setMovieIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const fetchFavouriteMovies = async () => {
                try {
                    const ids = await getFavouriteMovies(userName);
                    setMovieIds(ids);
                } catch (error) {
                    console.error("Failed to fetch favourite movies", error);
                }
            };

            fetchFavouriteMovies();
        }
    }, [userName, isAuthenticated, navigate, movieIds]);

    // Create an array of queries and run in parallel.
    const favoriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", {id: movieId}],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner/>;
    }

    const movies = favoriteMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    return (
        <PageTemplate
            title="Favorite Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromFavorites movie={movie}/>
                        <WriteReview movie={movie}/>
                    </>
                );
            }}
        />
    );
};

export default FavoriteMoviesPage;