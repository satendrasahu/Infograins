import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Fab } from "@material-ui/core";
import axios from "axios";
import { getId } from "../../Pages/Auth/hepler";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ListComp = (props) => {
  const classes = useStyles();
  const history = useHistory()
  const [checked, setChecked] = React.useState([1]);
  const [registerUserData, setRegisterUserData] = React.useState([]);

  const userId = getId();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(async () => {
    const result = await axios.get("/api/auth/user");
    if (result) {
      setRegisterUserData(result.data.data);
    }
  }, []);

  return (
    <List dense className={classes.root}>
      {registerUserData &&
        registerUserData.map((value, ind) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <>
              {value.email !== userId ? (
                <ListItem key={ind} button   onClick={()=>{history.push(`/userprofile/${value.email}`)}}>
                  <ListItemAvatar >
                    <Avatar alt={value.userName} src={value.userPic}/>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ color: "black" }}
                    id={labelId}
                    primary={value.userName}
                  />

                  <ListItemSecondaryAction>
                    {props.ButtonShow ? (
                      <Fab size="small" variant="extended">
                        follow
                      </Fab>
                    ) : (
                      ""
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                ""
              )}
            </>
          );
        })}
    </List>
  );
};
