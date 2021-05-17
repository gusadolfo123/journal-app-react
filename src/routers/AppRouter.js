import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { JournalPage } from "../components/journal/JournalPage";
import { NotFoundPage } from "../components/NotFoundPage";
import { AuthRouter } from "./AuthRouter";

import firebase from "firebase";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/auth"
            isAuth={isLoggedIn}
            component={AuthRouter}
          />
          <PrivateRouter
            exact
            isAuth={isLoggedIn}
            path="/"
            component={JournalPage}
          />
          <Route path="**" component={NotFoundPage} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
