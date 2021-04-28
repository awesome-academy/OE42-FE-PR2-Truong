import React, { useEffect, useLayoutEffect, useState } from "react";
import "./style.sass";
import AdditionalFilmList from "../../../components/additional-film-list";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailMovie,
  getPlayingHottestMovies,
} from "../../../reducers/film";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function FilmDetail(props) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { playingMovies, selectedMovie } = useSelector((state) => state.film);
  const { filmId } = useParams();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetailMovie(filmId));
    dispatch(getPlayingHottestMovies({ limit: 3 }));
  }, [dispatch, filmId]);

  return (
    <main className="film-detail-container">
      <section className="film-and-ticket-container">
        <article className="film-info">
          <section className="img-container">
            <div className="img-bound">
              <img src={selectedMovie.img} alt={selectedMovie.name} />
              <div className="play-btn">
                <button onClick={() => setShowModal(true)}>
                  <i className="fa fa-play"></i>
                </button>
              </div>
            </div>
          </section>
          <section className="main-info">
            <h5 className="film-name">{selectedMovie.name}</h5>
            <div className="rating-container">
              <i className="fa fa-star"></i>
              <strong>{selectedMovie.ratingAverage}</strong>
              <span>/10 ({selectedMovie.ratingQuantity})</span>
            </div>
            <div className="time">
              <i className="fa fa-clock-o"></i>
              <span>
                {selectedMovie.timeByMinutes}&nbsp;
                {selectedMovie.timeByMinutes === 1
                  ? t("unit.minute")
                  : t("unit.minutes")}
              </span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.category")}: </span>
              <span>{selectedMovie.category}</span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.nation")}: </span>
              <span>{selectedMovie.nation}</span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.producer")}: </span>
              <span>{selectedMovie.producer}</span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.director")}: </span>
              <span>{selectedMovie.director}</span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.actors")}: </span>
              <span>{selectedMovie.actors?.join(", ")}</span>
            </div>
            <div className="row-info">
              <span className="title">{t("movie_title.published_date")}: </span>
              <span>{selectedMovie.publishedDate}</span>
            </div>
          </section>
        </article>
        <div className="main-title">{t("common.list_title.movie_content")}</div>
        <p className="summary">{selectedMovie.summary}</p>
      </section>
      <section className="sub-content-container">
        <AdditionalFilmList movies={playingMovies} />
      </section>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="trailer"
            width="100%"
            height="100%"
            frameBorder={0}
            allowFullScreen
            src={`https://www.youtube.com/embed/${selectedMovie.trailer}?autoplay=1&controls=1&showinfo=1`}
          ></iframe>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default FilmDetail;
