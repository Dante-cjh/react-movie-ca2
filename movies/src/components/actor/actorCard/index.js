import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardHeader from "@mui/material/CardHeader";
import {ActorsContext} from "../../../contexts/actorsContext";

const ActorCard = ({actor, action}) => {
    const {myStar, addToStar} = useContext(ActorsContext);

    if (myStar.find((id) => id === actor.id)) {
        actor.favorite = true;
    } else {
        actor.favorite = false
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    actor.favorite ? (
                        <Avatar sx={{backgroundColor: 'red'}}>
                            <FavoriteIcon/>
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {actor.name}
                    </Typography>
                }
            />
                <Link to={`/actors/${actor.id}`}>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                    />
                </Link>
            <CardActions>
                <CardContent>
                    <Typography variant="subtitle1" color="text.sendary">
                        {action(actor)}
                        {actor.name}
                    </Typography>
                </CardContent>
            </CardActions>
        </Card>
    );
};

export default ActorCard;