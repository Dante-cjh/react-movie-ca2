import React from 'react';
import { Typography, Paper } from '@mui/material';

const Biography = ({ bio }) => {
    console.log(bio)
    return (
        <Paper style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Biography
            </Typography>
            <Typography variant="body1" paragraph>
                {bio || "We don't have a biography for this actor."}
            </Typography>
        </Paper>
    );
};

export default Biography;
