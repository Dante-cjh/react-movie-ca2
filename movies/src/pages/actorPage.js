import React from "react";
import { getActors } from "../api/tmdb-api";
import ActorListPageTemplate from '../components/templatePage/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToStar from "../components/cardIcons/addToStar";
import {Pagination} from "@mui/material";

const ActorPage = (props) => {

    const [page, setPage] = React.useState(1);
    const {  data, error, isLoading, isError }  = useQuery(['actor', {page: page}], getActors)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const actors = data.results;

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <ActorListPageTemplate
            actors={actors}
            action={(actor) => {
                return <AddToStar actor={actor} />
            }}
        >
            <Pagination count={10} defaultPage={6} boundaryCount={2}
                        showFirstButton showLastButton color="primary"
                        page={page} size="large" onChange={handleChange}/>
        </ActorListPageTemplate>
    )
}

export default ActorPage;