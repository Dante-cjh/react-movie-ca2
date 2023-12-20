import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromStarIcon = ({ actor }) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated, userName} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveFromStar = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            try {
                await fetch(`http://localhost:8080/api/users/actors`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username: userName, actorId: actor.id}),
                });
                // 更新前端状态或上下文
            } catch (error) {
                console.error('Error removing from favorite actors:', error);
            }
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
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