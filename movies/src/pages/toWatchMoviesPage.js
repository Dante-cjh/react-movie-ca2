import React, {useContext, useEffect, useState} from "react";
import PageTemplate from "../components/templatePage/templateMovieListPage";
import {useQueries} from "react-query";
import {getMovie, getMustWatchMovies} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromToWatchIcon from "../components/cardIcons/removeFromWatch";
import {AuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

const ToWatchMoviesPage = () => {
    const {isAuthenticated, userName} = useContext(AuthContext);
    const [movieIds, setMovieIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const fetchToWatchMovies = async () => {
                try {
                    const ids = await getMustWatchMovies(userName);
                    setMovieIds(ids);
                } catch (error) {
                    console.error("Failed to fetch must watch movies", error);
                }
            };

            fetchToWatchMovies();
        }
    }, [userName, isAuthenticated, navigate, movieIds]);

    // Create an array of queries and run in parallel.
    console.log(movieIds)
    const toWatchMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["toWatch", {id: movieId}],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = toWatchMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner/>;
    }

    const movies = toWatchMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    return (
        <PageTemplate
            title="Must Watch"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromToWatchIcon movie={movie}/>
                    </>
                );
            }}
        />
    );
};

export default ToWatchMoviesPage;