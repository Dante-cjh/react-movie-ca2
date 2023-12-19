import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const formControl = {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterActorCard(props) {
    const handleTextChange = (e) => {
        e.preventDefault();
        props.onUserInput("name", e.target.value);
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor: "rgb(204, 204, 0)"
            }}
            variant="outlined"
        >
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the actors.
                </Typography>
                <TextField
                    sx={{...formControl}}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.nameFilter}
                    onChange={handleTextChange}
                />
            </CardContent>
        </Card>
    );
}
