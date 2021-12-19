import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { CardComp } from "../../components/Card/Card";
import { indivisualPost } from "../../Service/PostAPI";
import { isUserLoggedIn } from "../Auth/hepler";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
  },
  divMargin: {
    margin: 100,
    marginBottom: 5,
  },
}));
export const IndivisualPost = (props) => {
  const { userId } = useParams();
  const isUserLoggedIN = isUserLoggedIn();
  const history = useHistory();
  const [indivisualUserPostData, setIndivisualPostData] = useState([]);
  useEffect(async () => {
    const result = await indivisualPost(userId);
    if (result) setIndivisualPostData(result);
  }, [userId]);
  const classes = useStyles();
  return (
    <>
      {isUserLoggedIN ? 
        <>
          <Button
            className={classes.divMargin}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <Container>
            <CardComp PostData={indivisualUserPostData} />
          </Container>
        </>
       : 
        () => {
          swal("Wait", "Login First", "info");
          history.push("/login");
        }
      }
    </>
  );
};
