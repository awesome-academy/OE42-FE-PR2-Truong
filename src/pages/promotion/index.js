import React, { useLayoutEffect } from "react";
import "./style.sass";
import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import PromotionList from "./promotion-list";
import PromotionDetail from "./promotion-detail";
import PendingSpinner from "../../components/pending-spinner";
import AdditionalFilmList from "../../components/additional-film-list";

function PromotionPage(props) {
  const { path } = useRouteMatch();
  const { pending: pendingPromotion } = useSelector((state) => state.promotion);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="promotion-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Switch>
            <Route exact path={path}>
              <PromotionList />
            </Route>
            <Route path={`${path}/:promotionId`}>
              <PromotionDetail />
            </Route>
          </Switch>
          <section className="sub-content-container">
            <AdditionalFilmList movies={[]} />
          </section>
        </main>
        <Footer />
      </div>
      {pendingPromotion && <PendingSpinner />}
    </div>
  );
}

export default PromotionPage;
