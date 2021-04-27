import React, { useEffect, useState } from "react";
import "./style.sass";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getBanners } from "../../reducers/banner";
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

  useEffect(() => {
    dispatch(getBanners());
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
              {banners &&
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
      {pendingBanners && <PendingSpinner />}
    </div>
  );
}

export default HomePage;
