import React, { useEffect, useState } from "react";
import "./style.sass";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getPlayingMovies, getOngoingMovies } from "../../reducers/film";
import { getBanners } from "../../reducers/banner";
import { getPromotions } from "../../reducers/promotion";
import { getReviewNewses } from "../../reducers/review";
import { getBlogNewses } from "../../reducers/blog";
import Slider from "../../components/slider";
import PendingSpinner from "../../components/pending-spinner";
import { Link } from "react-router-dom";
import * as routePath from "../../constants/routes";

function HomePage(props) {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const {
    playingMovies,
    ongoingMovies,
    pendingPlayingMovies,
    pendingOngoingMovies,
  } = useSelector((state) => state.film);
  const { banners, pending: pendingBanners } = useSelector(
    (state) => state.banner
  );
  const { promotions, pending: pendingPromotions } = useSelector(
    (state) => state.promotion
  );
  const { reviewNewses, pending: pendingReviewNewses } = useSelector(
    (state) => state.review
  );
  const { blogNewses, pending: pendingBlogNewses } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getPlayingMovies());
    dispatch(getOngoingMovies());
    dispatch(getPromotions({ page: 1, limit: 8 }));
    dispatch(getReviewNewses({ page: 1, limit: 4 }));
    dispatch(getBlogNewses({ page: 1, limit: 4 }));
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
          <div className="main-title">Phim đang chiếu</div>
          <Slider data={playingMovies} />
          <div className="main-title">Phim sắp chiếu</div>
          <Slider data={ongoingMovies} />
          <div className="main-title">
            <Link to={routePath.PROMOTION_PAGE_PATH}>KHUYẾN MÃI</Link>
          </div>
          <section className="promotion-container">
            {promotions &&
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
                      <span>CHI TIẾT</span>
                    </div>
                  </article>
                </Link>
              ))}
          </section>
          <section className="news-container">
            <section className="review-container">
              <Link to={routePath.REVIEW_PAGE_PATH} className="news-title">
                BÌNH LUẬN PHIM
              </Link>
              {reviewNewses &&
                reviewNewses.map((review) => (
                  <article className="news-item" key={review.id}>
                    <div className="img-container">
                      <Link
                        to={routePath.REVIEW_PAGE_PATH + "/" + review.id}
                        className="img-link"
                      >
                        <img src={review.img} alt="" />
                        <div className="icon">
                          <i className="fa fa-link"></i>
                        </div>
                      </Link>
                    </div>
                    <div className="info">
                      <Link to={routePath.REVIEW_PAGE_PATH + "/" + review.id}>
                        <h5>{`[Review] ${review.playingMovie?.name}: ${review.title}`}</h5>
                      </Link>
                      <div className="rating">
                        <i className="fa fa-star"></i>&nbsp;
                        <b>{review.playingMovie?.ratingAverage}</b>
                        <span>/10 ({review.playingMovie?.ratingQuantity})</span>
                      </div>
                      <p>{review.summary}</p>
                    </div>
                  </article>
                ))}
            </section>
            <section className="blog-container">
              <Link to={routePath.BLOG_PAGE_PATH} className="news-title">
                BLOG ĐIỆN ẢNH
              </Link>
              {blogNewses &&
                blogNewses.map((blog) => (
                  <article className="news-item" key={blog.id}>
                    <div className="img-container">
                      <Link
                        to={routePath.BLOG_PAGE_PATH + "/" + blog.id}
                        className="img-link"
                      >
                        <img src={blog.img} alt="" />
                        <div className="icon">
                          <i className="fa fa-link"></i>
                        </div>
                      </Link>
                    </div>
                    <div className="info">
                      <Link to={routePath.BLOG_PAGE_PATH + "/" + blog.id}>
                        <h5>{blog.title}</h5>
                      </Link>
                      <p>{blog.summary}</p>
                    </div>
                  </article>
                ))}
            </section>
          </section>
        </main>
        <Footer />
      </div>
      {(pendingBanners ||
        pendingPlayingMovies ||
        pendingOngoingMovies ||
        pendingPromotions ||
        pendingReviewNewses ||
        pendingBlogNewses) && <PendingSpinner />}
    </div>
  );
}

export default HomePage;
