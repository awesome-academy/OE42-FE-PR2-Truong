import React, { useEffect } from "react";
import "./style.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as routePath from "./constants/routes";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./reducers/auth";
import PrivateRoute from "./routes/privateRoute";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/home";
import PromotionPage from "./pages/promotion";
import NewsPage from "./pages/news";
import FilmPage from "./pages/film";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/not-found";
import PersonalInfoPage from "./pages/personal-info";
import OrderTicketPage from "./pages/order-ticket";
import SupportPage from "./pages/support";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserInfo(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Switch>
          <Route exact path={routePath.HOME_PAGE_PATH} component={HomePage} />
          <Route
            path={routePath.PROMOTION_PAGE_PATH}
            component={PromotionPage}
          />
          <Route path={routePath.REVIEW_PAGE_PATH} component={NewsPage} />
          <Route path={routePath.BLOG_PAGE_PATH} component={NewsPage} />
          <Route path={routePath.FILM_PAGE_PATH} component={FilmPage} />
          <Route exact path={routePath.SUPPORT_PAGE_PATH} component={SupportPage} />
          <Route exact path={routePath.LOGIN_PAGE_PATH} component={LoginPage} />
          <Route
            exact
            path={routePath.REGISTER_PAGE_PATH}
            component={RegisterPage}
          />
          <PrivateRoute
            path={routePath.PERSONAL_PAGE_PATH}
            component={PersonalInfoPage}
          />
          <PrivateRoute
            exact
            path={routePath.ORDER_TICKET_PAGE_PATH + "/:scheduleId"}
            component={OrderTicketPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
