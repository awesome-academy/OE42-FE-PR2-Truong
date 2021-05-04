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
import RatingFilm from "../../../components/rating-film";
import { getAverageRating } from "../../../utils/getAverageRating";
import { FILM_PAGE_PATH } from "../../../constants/routes";
import {
  getAllCities,
  getAllCinemas,
  getAllSchedules,
} from "../../../reducers/cinema";
import Schedule from "../../../components/schedule";
import moment from "moment";

function FilmDetail(props) {
  const [selectedCityId, setSelectedCityId] = useState(0);
  const [selectedCinemaId, setSelectedCinemaId] = useState(0);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { playingMovies, selectedMovie } = useSelector((state) => state.film);
  const { cities, cinemas, schedules } = useSelector((state) => state.cinema);
  const { token } = useSelector((state) => state.auth);
  const { filmId } = useParams();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetailMovie(filmId));
    dispatch(getPlayingHottestMovies({ limit: 3 }));
    dispatch(getAllCities());
    dispatch(getAllCinemas());
    dispatch(getAllSchedules(filmId));
  }, [dispatch, filmId]);

  const displayCinemas =
    selectedCityId === 0
      ? cinemas
      : cinemas.filter((cinema) => cinema.cityId === selectedCityId);

  const displaySchedules = displayCinemas
    .map((cinema) => {
      const { id, name } = cinema;
      const filterSchedules = schedules.filter(
        (schedule) =>
          (date.length
            ? schedule.date >= moment(date, "YYYY:MM:DD").valueOf()
            : true) && schedule.cinemaId === id
      );
      return { id, name, schedules: filterSchedules };
    })
    .filter((cinema) => {
      const { id, schedules } = cinema;
      if (selectedCinemaId !== 0) {
        return id === selectedCinemaId && schedules.length;
      }
      return schedules.length;
    });

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
              <strong>
                {selectedMovie.ratings?.length
                  ? getAverageRating(selectedMovie.ratings)
                  : 0}
              </strong>
              <span>/10 ({selectedMovie.ratings?.length || 0})</span>
            </div>
            {token && (
              <RatingFilm movie={selectedMovie} from={FILM_PAGE_PATH} />
            )}
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
        <div className="main-title">{t("common.list_title.schedule")}</div>
        <div className="select-cinema-container">
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(+e.target.value)}
          >
            <option value={0}>{t("select_option.all_cities")}</option>
            {cities.length &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={selectedCinemaId}
            onChange={(e) => setSelectedCinemaId(+e.target.value)}
          >
            <option value={0}>{t("select_option.all_cinemas")}</option>
            {displayCinemas.length &&
              displayCinemas.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))}
          </select>
        </div>
        {displaySchedules.length !== 0 &&
          displaySchedules.map((schedule) => {
            const { id, ...restProps } = schedule;
            return <Schedule key={id} {...restProps} />;
          })}
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
