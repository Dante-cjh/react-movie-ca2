import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromToWatchIcon = ({movie}) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveFromToWatch = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.removeFromToWatch(movie);
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
    };
    return (
        <IconButton
            aria-label="remove from To Watch"
            onClick={handleRemoveFromToWatch}
        >
            <DeleteIcon color="primary" fontSize="large"/>
        </IconButton>
    );
};

export default RemoveFromToWatchIcon;