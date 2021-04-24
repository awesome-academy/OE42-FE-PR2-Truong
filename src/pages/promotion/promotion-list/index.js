import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { getPromotions } from "../../../reducers/promotion";
import { Link } from "react-router-dom";
import * as routePath from "../../../constants/routes";

function PromotionList(props) {
  const dispatch = useDispatch();
  const { promotions } = useSelector((state) => state.promotion);

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  return (
    <section className="list-promotion-container">
      <div className="promotion-title">KHUYỄN MÃI</div>
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
  );
}

export default PromotionList;
