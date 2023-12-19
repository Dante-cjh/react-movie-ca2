import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Container} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const LoginPage = props => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ padding: 4, width: '100%', backgroundColor: '#e3f2fd', boxShadow: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form noValidate> {/* Update with your form handling logic */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="user name"
                        name="username"
                        autoComplete="user name"
                        autoFocus
                        onChange={e => {
                            setUserName(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <Button
                        onClick={login}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                    >
                        Sign In
                    </Button>
                    <p>Not Registered?
                        <Link to="/signup">Sign Up!</Link></p>
                </form>
            </Card>
        </Container>
    );
};

export default LoginPage;