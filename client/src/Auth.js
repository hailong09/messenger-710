import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import BgImg from "./assets/images/bg-img.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LoginOrSignup from "./LoginOrSignup";
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
}));

const Auth = ({ authRoute }) => {
  const classes = useInputStyles();
  return (
    <Grid container>
      <Grid item md={5} sm={5}>
        <div className={classes.bg}>
          <Box className={classes.box}>
            <WhatsAppIcon className={classes.icon} />
            <Typography align="center" variant="h4">
              Converse with anyone with any language
            </Typography>
          </Box>
        </div>
      </Grid>
      <Grid item md={7} sm={7} xs={12}>
        <LoginOrSignup authRoute={authRoute} />
      </Grid>
    </Grid>
  );
};

export default Auth;
