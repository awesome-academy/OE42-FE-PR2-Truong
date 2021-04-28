import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.sass";
import * as routePath from "./constants/routes";
import HomePage from "./pages/home";
import PromotionPage from "./pages/promotion";

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={routePath.HOME_PAGE_PATH} component={HomePage} />
          <Route
            path={routePath.PROMOTION_PAGE_PATH}
            component={PromotionPage}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
