import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CardComp } from "../../components/Card/Card";
import { indivisualPost } from "../../Service/PostAPI";
import { UserDataByUserId } from "../../Service/UserAPI";
const useStyles = makeStyles((theme) => ({
  divMargin: {
    margin: 100,
    marginBottom: 10,
  },
  root: {
    flexGrow: 1,
  },
  img :{
    maxWidth : 460
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export const UserProfile = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [userProfileData, setUserProfileData] = useState([]);
  const [indivisualUserPostData, setIndivisualPostData] = useState([]);
  const { userId } = useParams();
  

  useEffect(async () => {
    try {
      // alert(userId)
      const result = await UserDataByUserId(userId);
      if (result) {
        setUserProfileData(result);
        console.log("THIS IS SATTENDRA SATA", result)
      }
    } catch (err) {
      console.log("USER PROFILE USER DATA", err.message);
    }
  }, [userId]);

  useEffect(async () => {
    const result = await indivisualPost(userId);
    if (result) setIndivisualPostData(result);
  }, [userId]);
  return (
    <>
      <Button className={classes.divMargin} onClick={() => history.goBack()}>
        Go Back
      </Button>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {userProfileData.map((userData, ind) => {
              return(
                <>

                <Grid item xs={5}>
                  <Paper className={classes.paper}>
                    <img src={userData.userPic} className={classes.img} alt="" />
                  </Paper>
                </Grid>
                <Grid item xs={7}>
                  <Paper className={classes.paper}>
                    <div>
                      <h3>{userData.userName}</h3>
                      <h3>{userData.email}</h3>
                      <h3>{userData.phoneNo}</h3>
                    </div>
                  </Paper>
                </Grid>
              </>
              )
            })}

            <Grid item xs={12}>
              {/* <Paper className={classes.paper}></Paper> */}
            <CardComp PostData={indivisualUserPostData}/>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
