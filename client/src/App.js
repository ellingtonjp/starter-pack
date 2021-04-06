import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import AddScientist from "./features/scientists/AddScientistForm";
import EditScientist from "./features/scientists/EditScientistForm";
import ScientistsCardGridContainer from "./features/scientists/ScientistsCardGridContainer";
import ScientistPage from "./features/scientists/ScientistPage";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="flex m-8 border-b">
          <Link to="/" className="text-black">
            <i className="text-3xl fa fa-home"></i>
          </Link>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/addScientist">
            <AddScientist />
          </Route>
          <Route
            exact
            path="/editScientist/:scientistId"
            component={EditScientist}
          />
          <Route
            exact
            path="/scientist/:scientistId"
            component={ScientistPage}
          />
          <Route path="/">
            <ScientistsCardGridContainer />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
