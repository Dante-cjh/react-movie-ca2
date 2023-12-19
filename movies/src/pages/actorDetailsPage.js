import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templatePage/templateActorPage";
import { getActor, getActorFilmCredits } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';


const ActorDetailPage = () => {
    const { actorId } = useParams();
    // 获取演员详细信息
    const {
        data: actorDetails,
        isLoading: isActorDetailsLoading,
        isError: isActorDetailsError,
        error: actorDetailsError,
    } = useQuery(["actor", { id: actorId }], getActor);

    // 获取演员的电影作品列表
    const {
        data: movieCredits,
        isLoading: isMovieCreditsLoading,
        isError: isMovieCreditsError,
        error: movieCreditsError,
    } = useQuery(["movieCredits", { id: actorId }], getActorFilmCredits);

    if (isActorDetailsLoading || isMovieCreditsLoading) {
        return <Spinner />;
    }

    if (isActorDetailsError) {
        return <h1>{actorDetailsError.message}</h1>;
    }

    if(isMovieCreditsError) {
        return <h1>{movieCreditsError.message}</h1>;
    }

    return (
        <>
            {actorDetails ? (
                <>
                    <PageTemplate actorDetails={actorDetails} movieCredits={movieCredits} />
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default ActorDetailPage;