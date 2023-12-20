import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated, userName} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToWatch = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            try {
                // 发送请求到后端，更新用户的喜欢电影列表
                await fetch(`http://localhost:8080/api/users/toWatch`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userName,
                        movieId: movie.id
                    }),
                });
                context.addToWatch(movie); // 更新前端上下文
            } catch (error) {
                console.error('Error adding to must watch movies:', error);
            }
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
    };

    return (
        <IconButton aria-label="add to watch" onClick={handleAddToWatch}>
          <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
      );
}

export default AddToWatchIcon;