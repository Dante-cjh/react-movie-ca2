import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

const ActorDetails = ({ actor }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={`Headshot of ${actor.name}`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h2" variant="h5">
                        {actor.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="p">
                        Birthday: {actor.birthday || "Unknown"}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="p">
                        Place of birth: {actor.place_of_birth || "Unknown"}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default ActorDetails;