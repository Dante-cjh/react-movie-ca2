import React, { useState } from "react";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
    const [myStar, setToStar] = useState([]);

    const addToStar = (actor) => {
        let newToStar = [];
        if (!myStar.includes(actor.id)){
            newToStar = [...myStar, actor.id];
        }
        else{
            newToStar = [...myStar];
        }
        setToStar(newToStar)
    };

    const removeFromStar = (actor) => {
        setToStar( myStar.filter(
            (mId) => mId !== actor.id
        ) )
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