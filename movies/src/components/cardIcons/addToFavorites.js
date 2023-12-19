import React, {useContext} from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToFavoritesIcon = ({movie}) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToFavorites = (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.addToFavorites(movie);
        } else {
            // Redirect to login page
            console.log('Redirecting to login page');
            navigate('/login');
        }
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
            <FavoriteIcon color="primary" fontSize="large"/>
        </IconButton>
    );
};

export default AddToFavoritesIcon;