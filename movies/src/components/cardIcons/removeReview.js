import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveReview = ({ review }) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveReview = async (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            console.log(review);
            console.log(review.id);
            await context.removeReview(review.id);
        } else {
            // 重定向到登录页面
            navigate('/login');
        }
    };

    return (
        <IconButton
            aria-label="remove review"
            onClick={handleRemoveReview}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveReview;