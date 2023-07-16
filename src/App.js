import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import CssBaseline from "@mui/material/CssBaseline";
import MainHeader from "./shared/components/Navigation/MainHeader";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import React from "react";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlaces />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlaces />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ token: token, isLoggedIn: !!token, userId: userId, login: login, logout: logout }}
    >
      <CssBaseline />
      <Router>
        <MainHeader />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
