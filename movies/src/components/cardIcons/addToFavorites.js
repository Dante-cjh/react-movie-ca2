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

    const handleAddToFavorites = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            await context.addToFavorites(movie); // 更新前端上下文
        } else {
            // 重定向到登录页面
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