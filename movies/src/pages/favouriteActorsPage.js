import React, {useContext, useEffect, useState} from "react";
import ActorListPageTemplate from "../components/templatePage/templateActorListPage"; // 调整为正确的路径
import { useQueries } from "react-query";
import {getActor, getFavouriteActors} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromStar from "../components/cardIcons/removeFromStar";
import {AuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

const FavoriteActorsPage = () => {
    const {isAuthenticated, userName} = useContext(AuthContext);
    const [actorIds, setActorIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const fetchFavouriteActors = async () => {
                try {
                    const ids = await getFavouriteActors(userName);
                    setActorIds(ids);
                } catch (error) {
                    console.error("Failed to fetch favourite actors", error);
                }
            };

            fetchFavouriteActors();
        }
    }, [userName, isAuthenticated, navigate, actorIds]);

    const favoriteActorQueries = useQueries(
        actorIds.map((actorId) => {
            return {
                queryKey: ["actor", { id: actorId }],
                queryFn: getActor,
            };
        })
    );

    // 检查是否有任何查询仍在加载中
    const isLoading = favoriteActorQueries.some((query) => query.isLoading);

    if (isLoading) {
        return <Spinner />;
    }

    // 提取演员数据
    const actors = favoriteActorQueries.map((q) => q.data);
    console.log(actors)

    return (
        <ActorListPageTemplate
            actors={actors}
            action={(actor) => <RemoveFromStar actor={actor} />}
        />
    );
};

export default FavoriteActorsPage;
