import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailReview } from "../../../reducers/review";
import { getDetailBlog } from "../../../reducers/blog";

function NewsDetail(props) {
  const dispatch = useDispatch();
  const { selectedReview } = useSelector((state) => state.review);
  const { selectedBlog } = useSelector((state) => state.blog);
  const { newsId } = useParams();

  useEffect(() => {
    if (props.path === "/review") {
      dispatch(getDetailReview(newsId));
    } else if (props.path === "/blog") {
      dispatch(getDetailBlog(newsId));
    }
  }, [dispatch, newsId, props.path]);

  return (
    <section className="news-detail-container">
      <h3>
        {props.path === "/review"
          ? selectedReview.title
          : props.path === "/blog"
          ? selectedBlog.title
          : ""}
      </h3>
      {props.path === "/review" && (
        <div className="rating-container">
          <div className="star-icon">
            <i className="fa fa-star"></i>
          </div>
          <div className="rating-info">
            <strong>{selectedReview.playingMovie?.ratingAverage}</strong>
            <span>/10 ({selectedReview.playingMovie?.ratingQuantity})</span>
          </div>
          <button className="rating-button">ĐÁNH GIÁ</button>
          <div className="rating-group">
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
            <div className="rating-item">
              <i className="fa fa-star"></i>
            </div>
          </div>
        </div>
      )}
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html:
            props.path === "/review"
              ? selectedReview.detail?.join("")
              : props.path === "/blog"
              ? selectedBlog.detail?.join("")
              : "",
        }}
      ></div>
    </section>
  );
}

export default NewsDetail;
