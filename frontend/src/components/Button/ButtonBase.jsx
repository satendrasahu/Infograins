import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Avtar } from "../Avtar/Avrtar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { OpenDialog } from "../../actions";
import { useDispatch } from "react-redux";
import { Button, Card, Paper } from "@material-ui/core";
import DeckIcon from "@material-ui/icons/Deck";
import EventNoteIcon from "@material-ui/icons/EventNote";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
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

export const ButtonBases = (props) => {
  const classes = useStyles();
  const [postData, setPostData] = useState([]);
  const [userNameData, setUserNameData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    const result = await axios.get("/api/post/post");
    if (result) {
      setPostData(result.data.data);
      console.log("result.data.data", result.data.data);
      const allUsers = [...new Set(result.data.data.map((val) => val.userId))];
      setUserNameData(allUsers);
      console.log("setUserNameData :", userNameData);
    }
  }, []);

  return (
    <Paper>
      <div className={classes.root}>
        {props.Quantity ? (
          <>
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
                    <EventNoteIcon /> Events
                  </h3>
                  <p>Join events neer you for free</p>
                  <Button variant="contained">ExploreAll</Button>
                </Typography>
              </span>
            </ButtonBase>
          </>
        ) : (
          postData.map((image) => (
            <ButtonBase
              focusRipple
              key={image.userName}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "30%",
              }}
              onClick={() => {
                history.push(`/indivisual/${image.userId}`);
                dispatch(OpenDialog(true));
              }}
              // onClick={()=>history.push(`/${image.userId}`)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.img})`,
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
                  <div
                    style={{
                      marginTop: 40,
                      marginBottom: 10,
                      border: "4px solid blue",
                      borderRadius: "50%",
                      padding: "10px",
                      background:"white"
                    }}
                  >
                    <Avtar userPic={image.img} alt="" />
                  </div>
                  {image.userName}
                </Typography>
              </span>
            </ButtonBase>
          ))
        )}
      </div>
    </Paper>
  );
};
