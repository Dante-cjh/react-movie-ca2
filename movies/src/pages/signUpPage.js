import React, {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
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
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const navigate = useNavigate();
    const register = async () => {
        setPasswordError1("");
        setPasswordError2("");
        setMsg("");
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const validPassword = passwordRegEx.test(password);

        if (!validPassword) {
            setPasswordError1("密码大于8位(包含数字、字母和特殊字符)");
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
            const {success, status, message} = await context.register(userName, password);
            if (success){
                console.log(status)
                console.log(typeof status)
                setMsg(message);
                setMsgType("success");
                setRegistered(true);
                navigate('/login');
            } else {
                switch (status) {
                    case 401:
                        setMsgType("warning");
                        break;
                    default:
                        setMsgType("error");
                        break;
                }
                setMsg(message);
            }
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
                {msg && <Alert severity={msgType}>{msg}</Alert>}
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