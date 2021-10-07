import {
  Box,
  createTheme,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import BgImg from "./assets/images/bg-img.png";
import LoginOrSignup from "./LoginOrSignup";
import { ReactComponent as BubbleIcon } from "./assets/images/bubble.svg";
const useInputStyles = makeStyles((theme) => ({
  bg: {
    backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85), rgba(134,185,255,0.85)),url(${BgImg})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    width: "100%",
    maxWidth: "100%",
  },
  icon: {
    fontSize: "100px",
  },
  box: {
    margin: "10px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridBox: {
    "@media (max-width:580px)": {
      display: "none",
    },
  },
}));
const theme = createTheme();

theme.typography.h4 = {
  fontSize: "1.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
};
const Auth = ({ authRoute }) => {
  const classes = useInputStyles();
  return (
    <Grid container>
      <Grid md={5} sm={5} className={classes.gridBox}>
        <Box className={classes.bg}>
          <Box className={classes.box}>
            <BubbleIcon className={classes.icon} />

            <Box sx={{ margin: "20px", padding: "30px" }}>
              <ThemeProvider theme={theme}>
                <Typography align="center" variant="h4">
                  Converse with anyone with any language
                </Typography>
              </ThemeProvider>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid container md={7} sm={7} xs={12}>
        <Box className={classes.inputForm}>
          <LoginOrSignup authRoute={authRoute} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
