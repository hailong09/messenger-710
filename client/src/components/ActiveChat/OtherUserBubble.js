import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, images } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        {images && (
          <Box sx={{ maxWidth: 167 }}>
            <Grid container spacing={1}>
              {images.map((image) => (
                <Grid item xs={images.length > 2 ? 4 : 6} key={image}>
                  <Box
                    component="img"
                    sx={{
                      width: `calc(167px/${images.length})`,
                      height: `calc(167px/${images.length})`,
                      minWidth: `calc(167px/3)`,
                      minHeight: `calc(167px/3)`,
                      borderRadius: "10px 10px 0px 10px",
                    }}
                    alt={image}
                    src={image}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
