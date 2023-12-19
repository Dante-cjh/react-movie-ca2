import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from '../contexts/authContext';
import TextField from "@mui/material/TextField";
import {Alert, Container} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SignUpPage = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [passwordError1, setPasswordError1] = useState("");
    const [passwordError2, setPasswordError2] = useState("");
    const register = () => {
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const validPassword = passwordRegEx.test(password);

        if (!validPassword) {
            setPasswordError1("密码必须包含数字、字母和特殊字符。");
            return;
        } else {
            setPasswordError1("");
        }

        if (password !== passwordAgain) {
            setPasswordError2("前后密码不一致");
        } else {
            setPasswordError2("");
        }

        if (validPassword && password === passwordAgain) {
            setPasswordError1("");
            setPasswordError2("");
            context.register(userName, password);
            setRegistered(true);
        }
    }

    if (registered === true) {
        return <Navigate to="/login"/>;
    }

    return (
        <Container maxWidth="xs"
                   sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card sx={{padding: 4, width: '100%', backgroundColor: '#e3f2fd', boxShadow: 3}}>
                <Typography variant="h5" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="userName"
                    name="userName"
                    value={userName}
                    autoFocus
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
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
                    value={passwordAgain}
                    onChange={e => {
                        setPasswordAgain(e.target.value)
                    }}
                />
                {passwordError1 && <Alert severity="error">{passwordError1}</Alert>}
                {passwordError2 && <Alert severity="error">{passwordError2}</Alert>}
                <Button
                    onClick={register}
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2, bgcolor: 'primary.main'}}
                >
                    Sign Up
                </Button>
            </Card>
        </Container>
    );
};

export default SignUpPage;