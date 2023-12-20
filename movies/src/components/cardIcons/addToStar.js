import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToStar = ({ actor }) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated, userName} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToStar = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            try {
                // 发送请求到后端，更新用户的喜欢电影列表
                await fetch(`http://localhost:8080/api/users/actors`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userName,
                        actorId: actor.id
                    }),
                });
                context.addToStar(actor); // 更新前端上下文
            } catch (error) {
                console.error('Error adding to favorites actors:', error);
            }
        } else {
            // 重定向到登录页面
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