import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeckIcon from "@material-ui/icons/Deck";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { ButtonBase } from "@material-ui/core";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 200,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 200,
    width: "100%",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export const CardWithImage = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <ButtonBase
            focusRipple
            key={1}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: "46%",
            }}
            // onClick={()=>history.push(`/${image.userId}`)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSaDkrBnx-4AO06-W69OiHebcDevK13X-sA&usqp=CAU"})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                // className={classes.imageTitle}
              >
                <h3>
                  {" "}
                  <DeckIcon /> Pop Corn
                </h3>
                <p>Start Watching with friends & family</p>
                <Button variant="contained">Watch Now</Button>
              </Typography>
            </span>
          </ButtonBase>
        </CardActionArea>
        <CardActionArea>
          <ButtonBase
            focusRipple
            key={1}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: "46%",
            }}
            // onClick={()=>history.push(`/${image.userId}`)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSaDkrBnx-4AO06-W69OiHebcDevK13X-sA&usqp=CAU"})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                // className={classes.imageTitle}
              >
                <h3>
                  {" "}
                  <DeckIcon /> Pop Corn
                </h3>
                <p>Start Watching with friends & family</p>
                <Button variant="contained">Watch Now</Button>
              </Typography>
            </span>
          </ButtonBase>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
