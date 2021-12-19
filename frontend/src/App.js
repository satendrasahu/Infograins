import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "./components/Navigation";
import "./App.css";
import { Switch, Route } from "react-router";
import { Home } from "./components/Home.jsx";
import PersistentDrawerSmall from "./components/MobNav";
import LoginPage from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { getRole, isUserLoggedIn } from "./Pages/Auth/hepler";
import { useHistory } from "react-router-dom";
import { IndivisualPost } from "./Pages/Post/indivisualPost";
import { DialogBox } from "./components/Dialog/DialogBox";
import { UserProfile } from "./Pages/User/UserProfile";
/**
 * @author
 * @function App
 **/

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handelResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);
  return size;
};

const App = (props) => {
  const [height, width] = useWindowSize();
  const userType = getRole();
  const isUserLoggedIN = isUserLoggedIn();
  const history = useHistory();
  // const [width] = useWindowSize();

  return (
    <>
      {width < 800 ? <PersistentDrawerSmall /> : <PersistentDrawerLeft />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/indivisual/:userId" component={DialogBox} />
        <Route
          exact
          path="/user/:userId"
          component={() => (isUserLoggedIN ? <IndivisualPost /> : <LoginPage />)}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/userprofile/:userId" component={UserProfile} />
        <Route component={Home} />
      </Switch>
    </>
  );
};

export default App;

export { useWindowSize };
