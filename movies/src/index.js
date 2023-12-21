import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviesContextProvider from "./contexts/moviesContext";
import SiteHeader from './components/siteHeader';
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import UpcomingMoviePage from './pages/upcomingMoviePage';
import AddMovieReviewPage from './pages/addMovieReviewPage';
import ToWatchMoviesPage from './pages/toWatchMoviesPage';
import ActorPage from "./pages/actorPage";
import ActorDetailPage from "./pages/actorDetailsPage";
import MovieTrendingPage from "./pages/movieTrendingPage";
import ActorsContextProvider from "./contexts/actorsContext";
import FavoriteActorsPage from "./pages/favouriteActorsPage";
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import UserReviewPage from "./pages/userReviewPage";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthContextProvider>
                    <SiteHeader/>
                    <MoviesContextProvider>
                        <ActorsContextProvider>
                            <Routes>
                                <Route path="/movies/upcoming" element={<UpcomingMoviePage/>}/>
                                <Route path="/movies/trending" element={<MovieTrendingPage/>}/>
                                <Route path="/reviews/:id" element={<MovieReviewPage/>}/>
                                <Route path="/movies/:id" element={<MoviePage/>}/>
                                <Route path="/actors/:actorId/movies/:id" element={<MoviePage/>}/>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="*" element={<Navigate to="/"/>}/>
                                <Route path="/actor" element={<ActorPage/>}/>
                                <Route path="/actors/:actorId" element={<ActorDetailPage/>}/>
                                <Route path="/movies/:movieId/actors/:actorId" element={<ActorDetailPage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/signup" element={<SignUpPage/>}/>
                                <Route element={<ProtectedRoutes />}>
                                    <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
                                    <Route path="/movies/toWatch" element={<ToWatchMoviesPage/>}/>
                                    <Route path="/actor/favorites" element={<FavoriteActorsPage/>}/>
                                    <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
                                    <Route path="/reviews/my" element={<UserReviewPage/>}/>
                                </Route>
                            </Routes>
                        </ActorsContextProvider>
                    </MoviesContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App/>);