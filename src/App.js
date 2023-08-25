import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MainHeader from "./shared/components/Navigation/MainHeader";
import { AuthContext } from "./shared/context/auth-context";
import React, { Suspense } from "react";
import { useAuth } from "./shared/hooks/auth-hook";
import { LoadingSpinner } from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlaces = React.lazy(() => import("./places/pages/NewPlaces"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlaces = React.lazy(() => import("./places/pages/UpdatePlaces"));
const Auth = React.lazy(() => import("./users/pages/Auth"));
const Calendar = React.lazy(() => import("./calendar/components/calendar"));
const NewEvents = React.lazy(() => import("./calendar/components/AddEvents"));
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
        <Route path="/events/new" exact>
          <NewEvents />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlaces />
        </Route>
        <Route path="/calendar/:userId" exact>
          <Calendar />
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
        <Suspense
          fallback={
            <div>
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
