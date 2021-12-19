import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Button, Fab } from "@material-ui/core";
import axios from "axios";
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupIcon from '@material-ui/icons/Group';
import {
  getId,
  getName,
  getRole,
  getUserPic,
  isUserLoggedIn,
  signout,
} from "../Pages/Auth/hepler";
import { useDispatch } from "react-redux";
import { Avtar } from "./Avtar/Avrtar";
// import AppBar from './Appbar';

const mobileMenuId = "primary-search-account-menu-mobile";
const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  grow2: {
    flexGrow: 0.8,
  },
  grow1: {
    flexGrow: 0.1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniDrawer = (props) => {
  //  console.log("props hh",props)
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [cartLength, setCartLength] = useState(0);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  // const { history } = props;

  const userType = getRole();
  const userName = getName();
  const userId = getId()
  const userPic = getUserPic();
  // alert(userPic)
  const isLoggedIN = isUserLoggedIn();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  // alert(userType)
  const adminNavigationconfig = [
    {
      title: "Home",
      icon: <HomeIcon />,
      onClick: () => history.push("/"),
      exact: true,
    },

    {
      title: "My Post",
      icon: <ListAltIcon />,
      onClick: () => history.push(`/user/${userId}`),
      exact: true,
    },
    {
      title: "Notification",
      icon: <NotificationsIcon/>,
      onClick: () => history.push("/"),
      exact: true,
    },
    {
      title: "Chat",
      icon: <ChatIcon/>,
      onClick: () => history.push("/"),
      exact: true,
    },
    {
      title: "Group",
      icon: <GroupIcon/>,
      onClick: () => history.push("/"),
      exact: true,
    },
    
   
  ];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIN ? (
        <>
          <MenuItem
            onClick={() => {
              signout();
              window.location.reload();
            }}
          >
            logout
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>{" "}
        </>
      ) : (
        <MenuItem
          onClick={() => {
            history.push("/login");
          }}
        >
          login
        </MenuItem>
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {isLoggedIN ? (
          <Button color="secondary" variant="contained">
            {userName}
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => history.push("/login")}
          >
            login
          </Button>
        )}
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => history.push("/cart")}
        >
          <Badge badgeContent={cartLength} color="secondary">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avtar userPic={userPic} quantity={1} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  useEffect(async () => {
    try {
      const result = await axios.get("/api/cart/cart");
      if (result) {
        // console.log("CART Data",result.data.data.length)
        setCartLength(result.data.data.length);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  // alert(isLoggedIN)
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {/* <AppBar/> */}
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ background: "white" }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Infograins
            </Typography>

            <div className={classes.grow2} />
            <Button onClick={() => history.push("/")}>Home</Button>

            <div className={classes.grow1} />
            <Button>Notification</Button>

            <div className={classes.grow1} />
            <Button>Chat</Button>

            <div className={classes.grow1} />
            <Button>Group</Button>
            <div className={classes.grow} />
            {/* cart */}
            <div className={classes.sectionDesktop}>
              {/* {isLoggedIN ? (
                <Button color="primary" variant="contained">
                  {userName}
                </Button>
              ) : (
                // <Button
                //   color="secondary"
                //   variant="contained"
                //   onClick={() => history.push("/login")}
                // >
                //   login
                // </Button>
              )} */}

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avtar userPic={userPic} quantity={1} /> 
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
                style={{fontSize :15}}
              >
              {userName}
              </IconButton>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {renderMenu}

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {adminNavigationconfig.map((text, index) => (
              <ListItem button key={index} onClick={text.onClick}>
                <ListItemIcon>{text.icon}</ListItemIcon>

                <ListItemText primary={text.title}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default withRouter(MiniDrawer);
