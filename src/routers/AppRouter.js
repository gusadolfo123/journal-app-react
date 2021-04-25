import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { JournalPage } from "../components/journal/JournalPage";
import { NotFoundPage } from "../components/NotFoundPage";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={JournalPage} />
          <Route path="**" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};
