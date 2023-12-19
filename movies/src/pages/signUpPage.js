import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import TextField from "@mui/material/TextField";
import {Container} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
      <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ padding: 4, width: '100%', backgroundColor: '#e3f2fd', boxShadow: 3 }}>
              <Typography variant="h5" align="center" gutterBottom>
                  Sign Up
              </Typography>
              <form noValidate> {/* Update with your form handling logic */}
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
                  <Button
                      onClick={register}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                  >
                      Sign Up
                  </Button>
              </form>
          </Card>
      </Container>
  );
};

export default SignUpPage;