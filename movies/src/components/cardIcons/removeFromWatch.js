import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromToWatchIcon = ({movie}) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated, userName} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveFromToWatch = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            try {
                await fetch(`http://localhost:8080/api/users/toWatch`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username: userName, movieId: movie.id}),
                });
                // 更新前端状态或上下文
            } catch (error) {
                console.error('Error removing from must watch movies:', error);
            }
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
        context.removeFromToWatch(movie);
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