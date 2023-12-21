import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./authContext";
import {addFavouriteActors, getFavouriteActors, removeFavouriteActors} from "../api/tmdb-api";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
    const [myStar, setToStar] = useState([]);
    const {isAuthenticated, userName} = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            setToStar([]);
        } else {
            async function fetchData() {
                setToStar(await getFavouriteActors(userName));
            }
            fetchData();
        }
    }, [isAuthenticated, userName]);
    const addToStar = async (actor) => {
        let newToStar = [];
        if (isAuthenticated) {
            newToStar = await getFavouriteActors(userName);
            console.log(newToStar);
        }
        if (!myStar.includes(actor.id)) {
            newToStar = [...myStar, actor.id];
            await addFavouriteActors(userName, actor);
        } else {
            newToStar = [...myStar];
        }
        setToStar(newToStar)
    };

    const removeFromStar = async (actor) => {
        setToStar(myStar.filter(
            (mId) => mId !== actor.id
        ))
        await removeFavouriteActors(userName, actor);
    };

    return (
        <ActorsContext.Provider
            value={{
                myStar,
                addToStar,
                removeFromStar
            }}
        >
            {props.children}
        </ActorsContext.Provider>
    );
};

export default ActorsContextProvider;