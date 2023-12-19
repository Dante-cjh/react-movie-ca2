import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToWatch = (e) => {
        if (isAuthenticated) {
            e.preventDefault();
            context.addToWatch(movie);
        } else {
            // Redirect to login page
            console.log('Redirecting to login page');
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