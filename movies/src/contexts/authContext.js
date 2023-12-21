import React, {useState, createContext} from "react";
import {
    login,
    signup
} from "../api/tmdb-api";
import {navigate} from "@storybook/addon-links";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");
    const [redirect, setRedirect] = useState(null);

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (username, password) => {
        const result = await login(username, password);
        if (result.token) {
            setToken(result.token)
            setIsAuthenticated(true);
            setUserName(username);
            return {success: true, status: result.status, message: "Login Successfully!"}
        }
        return {success: false, status: result.status, message: result.message};
    };

    const register = async (username, password) => {
        const result = await signup(username, password);
        return {success: result.success, status: result.status, message: result.message};
    };

    const signOut = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signOut,
                userName,
                redirect,
                setRedirect
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;