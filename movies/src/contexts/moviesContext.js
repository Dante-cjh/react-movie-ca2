import React, {useContext, useState} from "react";
import {AuthContext} from "./authContext";
import {
    addFavouriteMovies,
    addMustWatchMovies,
    getFavouriteMovies,
    getMustWatchMovies,
    removeFavouriteMovies, removeMustWatchMovies
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [myReviews, setMyReviews] = useState({});
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
        console.log(favorites)
    };

    const removeFromFavorites = async (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
        await removeFavouriteMovies(userName,movie);
    };

    const addToWatch = async (movie) => {
        let newToWatch = [];
        if (isAuthenticated) {
            newToWatch = await getMustWatchMovies(userName);
            console.log(newToWatch);
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

    const addReview = (movie, review) => {
        setMyReviews({...myReviews, [movie.id]: review})
    };
    //console.log(myReviews);

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatch,
                addToFavorites,
                addToWatch,
                removeFromFavorites,
                removeFromToWatch,
                addReview,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;