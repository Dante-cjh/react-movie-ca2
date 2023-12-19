import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Header from "../../movie/headerMovieList";
import ActorList from "../../actor/actorList";
import FilterCard from "../../actor/filterActorsCard";

function ActorListPageTemplate({actors, action, children}) {
    const [nameFilter, setNameFilter] = useState("");

    let displayedActors = actors
        .filter((a) => {
            return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        });

    const handleChange = (type, value) => {
        if (type==="name") setNameFilter(value);
    };

    return (
        <Grid container sx={{padding: '20px'}}>
            <Grid item xs={12}>
                <Header title="Popular People"/>
            </Grid>
            <Grid item container xs={12} spacing={5} sx={{marginBottom: '20px'}}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        nameFilter={nameFilter}
                    />
                </Grid>
                <ActorList actors={displayedActors} action={action}></ActorList>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ActorListPageTemplate;