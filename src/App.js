import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.sass";
import * as routePath from "./constants/routes";
import HomePage from "./pages/home";
import PromotionPage from "./pages/promotion";
import NewsPage from "./pages/news";

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
          <Route path={routePath.REVIEW_PAGE_PATH} component={NewsPage} />
          <Route path={routePath.BLOG_PAGE_PATH} component={NewsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
