import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getPlayingHottestMovies } from "../../reducers/film";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import PromotionList from "./promotion-list";
import PromotionDetail from "./promotion-detail";
import PendingSpinner from "../../components/pending-spinner";

function PromotionPage(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { playingMovies, pendingPlayingMovies: pendingMovies } = useSelector(
    (state) => state.film
  );
  const { pending: pendingPromotion } = useSelector((state) => state.promotion);

  useEffect(() => {
    dispatch(getPlayingHottestMovies({ limit: 3 }));
  }, [dispatch]);

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
            <div className="sub-content-title">PHIM ĐANG CHIẾU</div>
            {playingMovies &&
              playingMovies.map((movie) => (
                <article className="movie-item" key={movie.id}>
                  <div className="img-container">
                    <img src={movie.img} alt={movie.name} />
                    <div className="action-container">
                      <a href="/">MUA VÉ</a>
                    </div>
                  </div>
                  <h5>{movie.name}</h5>
                </article>
              ))}
          </section>
        </main>
        <Footer />
      </div>
      {(pendingMovies || pendingPromotion) && <PendingSpinner />}
    </div>
  );
}

export default PromotionPage;
