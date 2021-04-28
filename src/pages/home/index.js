import React, { useEffect, useState } from "react";
import "./style.sass";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getBanners } from "../../reducers/banner";
import { getPromotions } from "../../reducers/promotion";
import PendingSpinner from "../../components/pending-spinner";
import { Link } from "react-router-dom";
import * as routePath from "../../constants/routes";
import { useTranslation } from "react-i18next";

function HomePage(props) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { banners, pending: pendingBanners } = useSelector(
    (state) => state.banner
  );
  const { promotions, pending: pendingPromotions } = useSelector(
    (state) => state.promotion
  );

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getPromotions({ page: 1, limit: 8 }));
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="responsive-container">
        <main>
          <section className="main-slide">
            <Carousel
              activeIndex={index}
              onSelect={(selectedIndex) => setIndex(selectedIndex)}
            >
              {banners.length &&
                banners.map((banner) => (
                  <Carousel.Item key={banner.id}>
                    <img
                      className="d-block w-100"
                      src={banner.img}
                      alt={banner.name}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </section>
          <div className="main-title">
            {t("common.list_title.playing_movie")}
          </div>
          <div className="main-title">
            {t("common.list_title.ongoing_movie")}
          </div>
          <div className="main-title">
            <Link
              to={routePath.PROMOTION_PAGE_PATH}
              className="promotion-title"
            >
              {t("common.list_title.promotion")}
            </Link>
          </div>
          <section className="promotion-container">
            {promotions.length &&
              promotions.map((promotion) => (
                <Link
                  to={routePath.PROMOTION_PAGE_PATH + "/" + promotion.id}
                  key={promotion.id}
                >
                  <article className="promotion-item">
                    <img src={promotion.img} alt={promotion.title} />
                    <div className="info">
                      <h5>{promotion.title}</h5>
                      <p>{promotion.description}</p>
                      <span>{t("common.button_title.detail")}</span>
                    </div>
                  </article>
                </Link>
              ))}
          </section>
          <section className="news-container">
            <section className="review-container">
              <Link to={routePath.REVIEW_PAGE_PATH} className="news-title">
                {t("common.list_title.review")}
              </Link>
            </section>
            <section className="blog-container">
              <Link to={routePath.BLOG_PAGE_PATH} className="news-title">
                {t("common.list_title.blog")}
              </Link>
            </section>
          </section>
        </main>
        <Footer />
      </div>
      {(pendingBanners || pendingPromotions) && <PendingSpinner />}
    </div>
  );
}

export default HomePage;
