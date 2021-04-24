import React from "react";
import "./style.sass";

function AdditionalFilmList(props) {
  return (
    <>
      <div className="sub-content-title">PHIM ĐANG CHIẾU</div>
      {props.movies &&
        props.movies.map((movie) => (
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
    </>
  );
}

export default AdditionalFilmList;
