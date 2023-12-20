import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromFavoritesIcon = ({movie}) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveFromFavorites = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.removeFromFavorites(movie);
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
    };

    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavorites}
        >
            <DeleteIcon color="primary" fontSize="large"/>
        </IconButton>
    );
};

export default RemoveFromFavoritesIcon;