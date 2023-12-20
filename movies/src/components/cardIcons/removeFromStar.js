import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromStarIcon = ({ actor }) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveFromStar = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.removeFromStar(actor);
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
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