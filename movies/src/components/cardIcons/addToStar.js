import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToStar = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleAddToStar = (e) => {
        e.preventDefault();
        context.addToStar(actor);
    };

    return (
        <IconButton aria-label="add to star" onClick={handleAddToStar}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToStar;