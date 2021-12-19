import {
  Button,
  Fab,
  Grid,
  IconButton,
  Input,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";

import NavigationIcon from "@material-ui/icons/Navigation";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MoodIcon from "@material-ui/icons/Mood";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import { Avtar } from "../../components/Avtar/Avrtar";
import { useState } from "react";
import { getId, getName, getUserPic, isUserLoggedIn } from "../Auth/hepler";
import axios from "axios";
import swal from "sweetalert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LanguageIcon from "@material-ui/icons/Language";
import { useHistory } from "react-router-dom";
/**
 * @author
 * @function Post
 **/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 85,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  paper1: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
  },
}));

export const Post = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const [img, setImg] = React.useState("");
  const [url, setUrl] = React.useState("");
  const isLoggedIN = isUserLoggedIn();
  const userPic = getUserPic();
  const history = useHistory();

  console.log(img);

  const getID = getId();
  const userName = getName();

  useEffect(async () => {
    if (url) {
      try {
        const result = await axios.post("/api/post/post", {
          title,
          userId: getID,
          img: url,
          userPic,
          userName,
        });
        if (result) {
          console.log("post created successfully");
          swal("Great...", "New Post Created Successfully", "success");
          setTitle("");
          window.location.reload();
        }
      } catch (err) {
        swal("Sorry...", "New Post Creation is failed", "error");
      }
    }
  }, [url]);

  const createPost = async (title, userId, userName) => {
    swal("Posting", "Wait.. for few moments,  ");
    if (title === "" && img === "") {
      swal("Wait ..", "at least image or tilte is require", "info");
      return;
    }
    if (img === "") {
      try {
        const result = await axios.post("/api/post/post", {
          title,
          userId,
          img,
          userPic,
          userName,
        });
        if (result) {
          console.log("post created successfully");
          swal("Great...", "New Post Created Successfully", "success");
          setTitle("");
          window.location.reload();
        }
      } catch (err) {
        swal("Sorry...", "New Post Creation is failed", "error");
      }
    } else {
      console.log("**********************************", img);
      const formdata = await new FormData();
      formdata.append("file", img);
      formdata.append("upload_preset", "bestpeers");
      formdata.append("cloud_name", "sahu-s-theclassic");
      await fetch(
        "https://api.cloudinary.com/v1_1/sahu-s-theclassic/image/upload",
        {
          method: "post",
          body: formdata,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImg(fileUploaded);
  };
  return (
    <>
      <Paper className={classes.paper}>
        <div style={{ display: "flex" }}>
          <Grid item xs={1} style={{ marginTop: 30 }}>
            <Avtar userPic={userPic} />
          </Grid>
          <Grid
            item
            xs={11}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <>
              <Input
                rows={20}
                placeholder="whats is in your mind ? "
                style={{ blockSize: 80, width: 555, marginRight: 30 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Fab
                variant="extended"
                type="file"
                // color="primary"
                style={{ marginRight: 5 }}
              >
                <CloudUploadIcon onClick={handleClick} />
              </Fab>
              <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <Fab
                variant="extended"
                color="primary"
                onClick={() => {
                  if (isLoggedIN) {
                    createPost(title, getID, userName);
                  } else {
                    swal({
                      title: "Login First",
                      text: "your are not login",
                      icon: "info",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        history.push("/login");
                      }
                    });
                  }
                }}
              >
                <NavigationIcon size="small" className={classes.extendedIcon} />
                Post
              </Fab>
            </>
          </Grid>
        </div>
        <div style={{ display: "flex" }}>
          <Grid item xs={1} style={{ marginTop: 30 }}></Grid>
          <Grid
            item
            xs={11}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <h2 style={{ color: "black" }}>
              <LanguageIcon />
              Everyone can reply
            </h2>
            <br></br>
          </Grid>
        </div>
        <div style={{ display: "flex" }}>
          <Grid item xs={1} style={{ marginTop: 30 }}></Grid>
          <Grid
            item
            xs={11}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <IconButton aria-label="add to favorites">
              <CloudQueueIcon />
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={() => history.push(`/user/${getID}`)}
            >
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <MoodIcon />
            </IconButton>
          </Grid>
        </div>
      </Paper>
    </>
  );
};
