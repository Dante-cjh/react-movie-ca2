import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";

const RemoveFromStarIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleRemoveFromStar = (e) => {
        e.preventDefault();
        context.removeFromStar(actor);
    };
    return (
        <IconButton
            aria-label="remove from stars"
            onClick={handleRemoveFromStar}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromStarIcon;