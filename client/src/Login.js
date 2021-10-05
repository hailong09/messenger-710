import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { CustomButton } from "./styled-components/CustomButton";

// const
const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Box sx={{ width: "60%", margin: 20 }}>
        <Grid container item alignItems="center" justifyContent="flex-end">
          <Typography variant="caption">Don't have an account?</Typography>

          <CustomButton
            variant="contained"
            onClick={() => history.push("/register")}
          >
            Create account
          </CustomButton>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid container direction="column" justify="center">
            <Typography variant="h5">Wecome Back!</Typography>
            <Grid>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  size="medium"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid container justify="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ fontFamily: "Montserrat" }}
              >
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
