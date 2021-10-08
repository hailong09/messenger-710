import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, images } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
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
  );
};

export default SenderBubble;
