import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { login, register } from "./store/utils/thunkCreators";
import { CustomButton } from "./styled-components/CustomButton";
const LoginOrSignup = (props) => {
  const history = useHistory();
  const { user, register, login } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const email =
      (props.authRoute === "register" && event.target.email.value) || null;
    const confirmPassword =
      (props.authRoute === "register" && event.target.confirmPassword.value) ||
      null;

    if (
      props.authRoute === "register" &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    props.authRoute === "register" &&
      (await register({ username, email, password }));
    props.authRoute === "login" && (await login({ username, password }));
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Box sx={{ width: "60%", margin: 20 }}>
        <Grid container item alignItems="center" justifyContent="flex-end">
          <Typography variant="caption">
            {props.authRoute === "register"
              ? "Already have an account?"
              : "Don't have an account?"}
          </Typography>
          <CustomButton
            variant="contained"
            onClick={() =>
              history.push(
                props.authRoute === "register" ? "/login" : "/register"
              )
            }
          >
            {props.authRoute === "register" ? "Login" : "Create account"}
          </CustomButton>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid container direction="column" justify="center">
            <Typography variant="h5">
              {props.authRoute === "register"
                ? "Create an account."
                : "Wecome Back!"}
            </Typography>
            <Grid>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            {props.authRoute === "register" && (
              <Grid>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
            )}
            <Grid>
              <FormControl
                error={!!formErrorMessage.confirmPassword}
                margin="normal"
                required
                fullWidth
              >
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            {props.authRoute === "register" && (
              <Grid>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  margin="normal"
                  required
                  fullWidth
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid container justify="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ fontFamily: "Montserrat" }}
              >
                {props.authRoute === "register" ? "Create" : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrSignup);
