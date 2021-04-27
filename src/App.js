import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.sass";
import * as routePath from "./constants/routes";
import HomePage from "./pages/home";

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={routePath.HOME_PAGE_PATH} component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
