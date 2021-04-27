import React from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";

function AdditionalFilmList({ movies }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="sub-content-title">
        {t("common.list_title.playing_movie")}
      </div>
      {movies.length &&
        movies.map((movie) => (
          <article className="movie-item" key={movie.id}>
            <div className="img-container">
              <img src={movie.img} alt={movie.name} />
              <div className="action-container">
                <a href="/">{t("common.button_title.order_ticket")}</a>
              </div>
            </div>
            <h5>{movie.name}</h5>
          </article>
        ))}
    </>
  );
}

export default AdditionalFilmList;
