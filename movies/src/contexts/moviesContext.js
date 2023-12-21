import React, {useContext, useState} from "react";
import {AuthContext} from "./authContext";
import {
    addFavouriteMovies,
    addMustWatchMovies,
    getFavouriteMovies,
    getMustWatchMovies,
    removeFavouriteMovies,
    removeMustWatchMovies,
    addMoviewReview,
    deleteMovieReview,
    getUserMovieReviews
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [toWatch, setToWatch] = useState([]);
    const {isAuthenticated, userName} = useContext(AuthContext);

    const addToFavorites = async (movie) => {
        let newFavorites = [];
        if (isAuthenticated) {
            newFavorites = await getFavouriteMovies(userName)
        }
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
            await addFavouriteMovies(userName, movie);
        } else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const removeFromFavorites = async (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
        await removeFavouriteMovies(userName, movie);
    };

    const addToWatch = async (movie) => {
        let newToWatch = [];
        if (isAuthenticated) {
            newToWatch = await getMustWatchMovies(userName);
        }
        if (!toWatch.includes(movie.id)) {
            newToWatch = [...toWatch, movie.id];
            await addMustWatchMovies(userName, movie)
        } else {
            newToWatch = [...toWatch];
        }
        setToWatch(newToWatch)
    };

    const removeFromToWatch = async (movie) => {
        setToWatch(toWatch.filter(
            (mId) => mId !== movie.id
        ));
        await removeMustWatchMovies(userName, movie);
    };

    const addReview = async (review) => {
        let newReviews = [];
        console.log(review)
        if (isAuthenticated) {
            newReviews = await getUserMovieReviews(review.author);
        }
        if (!myReviews.includes(review)) {
            newReviews = [...myReviews, review];
            await addMoviewReview(review)
        } else {
            newReviews = [...myReviews];
        }
        setMyReviews(newReviews)
    };

    const removeReview = async (id) => {
        setMyReviews(myReviews.filter(
            (review) => review.id !== id
        ));
        await deleteMovieReview(id);
    }

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatch,
                myReviews,
                addToFavorites,
                addToWatch,
                removeFromFavorites,
                removeFromToWatch,
                addReview,
                removeReview
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;