import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToStar = ({ actor }) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToStar = (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.addToStar(actor);
        } else {
            // Redirect to login page
            console.log('Redirecting to login page');
            navigate('/login');
        }
    };

    return (
        <IconButton aria-label="add to star" onClick={handleAddToStar}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToStar;