import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {getGenres} from "../../../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from '../../spinner'

const formControl =
    {
        margin: 1,
        minWidth: 220,
        backgroundColor: "rgb(255, 255, 255)"
    };

export default function FilterMoviesCard(props) {

    const {data, error, isLoading, isError} = useQuery("genres", getGenres);
    const sortType = ["null", "popularity", "vote"];
    const sortWay = ["null", "ASC", "DESC"];

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({id: "0", name: "All"});
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value); // NEW
    };

    const handleSortWay = (e) => {
        e.preventDefault();
        props.sortWayChange(e.target.value);
    }

    const handleSortOrder = (e) => {
        e.preventDefault();
        props.sortOrderChange(e.target.value);
    }

    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor: "rgb(204, 204, 0)"
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large"/>
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{...formControl}}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />
                <FormControl sx={{...formControl}}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{...formControl}}>
                    <InputLabel id="sort-way-label">Sort Way</InputLabel>
                    <Select
                        labelId="sort-way-label"
                        id="sort-way-select"
                        defaultValue=""
                        value={props.sortWayFilter}
                        onChange={handleSortWay}
                    >
                        {sortType.map((sort) => {
                            return (
                                <MenuItem key={sort} value={sort}>
                                    {sort}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{...formControl}}>
                    <InputLabel id="sort-order-label">Sort Order</InputLabel>
                    <Select
                        labelId="sort-order-label"
                        id="sort-order-select"
                        defaultValue=""
                        value={props.sortOrderFilter}
                        onChange={handleSortOrder}
                    >
                        {sortWay.map((way) => {
                            return (
                                <MenuItem key={way} value={way}>
                                    {way}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}