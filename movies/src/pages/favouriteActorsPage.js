import React, { useContext } from "react";
import ActorListPageTemplate from "../components/templatePage/templateActorListPage"; // 调整为正确的路径
import { ActorsContext } from "../contexts/actorsContext";
import { useQueries } from "react-query";
import {getActor} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromStar from "../components/cardIcons/removeFromStar";

const FavoriteActorsPage = () => {
    const { myStar: actorIds } = useContext(ActorsContext);

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
