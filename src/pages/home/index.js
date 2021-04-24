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
    dispatch(getPromotions());
    dispatch(getReviewNewses({ page: 1, limit: 4 }));
    dispatch(getBlogNewses({ page: 1, limit: 4 }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="responsive-container">
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
        <div className="main-title">Khuyến mãi</div>
        <section className="promotion-container">
          {promotions &&
            promotions.map((promotion) => (
              <a href="/" key={promotion.id}>
                <article className="promotion-item">
                  <img src={promotion.img} alt={promotion.title} />
                  <div className="info">
                    <h5>{promotion.title}</h5>
                    <p>{promotion.description}</p>
                    <span>CHI TIẾT</span>
                  </div>
                </article>
              </a>
            ))}
        </section>
        <section className="news-container">
          <section className="review-container">
            <a href="/" className="news-title">
              BÌNH LUẬN PHIM
            </a>
            {reviewNewses &&
              reviewNewses.map((review) => (
                <article className="news-item" key={review.id}>
                  <div className="img-container">
                    <a href="/" className="img-link">
                      <img src={review.img} alt="" />
                      <div className="icon">
                        <i className="fa fa-link"></i>
                      </div>
                    </a>
                  </div>
                  <div className="info">
                    <a href="/">
                      <h5>{`[Review] ${review.film}: ${review.title}`}</h5>
                    </a>
                    <div className="rating">
                      <i className="fa fa-star"></i>&nbsp;
                      <b>{review.ratingAverage}</b>
                      <span>/10 ({review.ratingQuantity})</span>
                    </div>
                    <p>{review.summary}</p>
                  </div>
                </article>
              ))}
          </section>
          <section className="blog-container">
            <a href="/" className="news-title">
              BLOG ĐIỆN ẢNH
            </a>
            {blogNewses &&
              blogNewses.map((blog) => (
                <article className="news-item" key={blog.id}>
                  <div className="img-container">
                    <a href="/" className="img-link">
                      <img src={blog.img} alt="" />
                      <div className="icon">
                        <i className="fa fa-link"></i>
                      </div>
                    </a>
                  </div>
                  <div className="info">
                    <a href="/">
                      <h5>{blog.title}</h5>
                    </a>
                    <p>{blog.summary}</p>
                  </div>
                </article>
              ))}
          </section>
        </section>
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
