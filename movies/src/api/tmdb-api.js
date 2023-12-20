export const getMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb?page=${page}`
    );
    return response.json();
};

export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/movie/${id}`
    );
    return response.json();
};

export const getGenres = async () => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/genres`
    );
    return response.json();
};

export const getMovieImages = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/${id}/images`
    );
    return response.json();
};

export const getMovieReviews = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/${id}/reviews`
    )
    return response.json();
};

export const getUpcomingMovie = async () => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/upcoming`
    )
    return response.json();
}

export const getTrendingMovie = async () => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/trendingMovie`
    )
    return response.json();
}

export const getMovieCredits = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/${id}/credits`
    )
    return response.json();
}

export const getActors = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;
    const response = await fetch(
        `http://localhost:8080/api/actors/tmdb?page=${page}`
    )
    return response.json();
};

export const getActor = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/actors/tmdb/${id}`
    )
    return response.json();
};

export const getActorFilmCredits = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(
        `http://localhost:8080/api/actors/tmdb/${id}/credits`
    )
    return response.json();
}

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const getFavouriteMovies = async (username) => {
    const response = await fetch(
        `http://localhost:8080/api/users/${username}/movies`
    )
    return response.json();
}

export const getMustWatchMovies = async (username) => {
    const response = await fetch(
        `http://localhost:8080/api/users/${username}/toWatch`
    )
    return response.json();
}

export const getFavouriteActors = async (username) => {
    const response = await fetch(
        `http://localhost:8080/api/users/${username}/actors`
    )
    return response.json();
}