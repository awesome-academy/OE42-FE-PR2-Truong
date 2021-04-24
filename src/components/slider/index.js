import React, { useLayoutEffect, useRef, useState } from "react";
import "./style.sass";

function Slider(props) {
  const [pageQuantity, setPageQuantity] = useState(0);
  const [page, setPage] = useState(1);

  const sliderRef = useRef();

  useLayoutEffect(() => {
    const resizeWindow = () => {
      const { innerWidth: width } = window;
      let totalPage;
      const totalItems = props.data.length;
      if (width < 576) {
        totalPage = totalItems;
      } else if (width < 768) {
        totalPage = Math.ceil(totalItems / 2);
      } else if (width < 992) {
        totalPage = Math.ceil(totalItems / 4);
      } else {
        totalPage = Math.ceil(totalItems / 5);
      }
      if (pageQuantity !== totalPage) {
        setPageQuantity(totalPage);
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [pageQuantity, props.data]);

  const handleClick = (direction) => {
    if (direction === "left") {
      if (page <= 1) return;
      sliderRef.current.style.transform = `translateX(-${100 * (page - 2)}%)`;
      setPage(page - 1);
    } else {
      if (page >= pageQuantity) return;
      sliderRef.current.style.transform = `translateX(-${100 * page}%)`;
      setPage(page + 1);
    }
  };

  return (
    <section className="slider">
      {page > 1 && (
        <div className="left-arrow">
          <i
            className="fa fa-angle-left"
            onClick={() => handleClick("left")}
          ></i>
        </div>
      )}
      {page < pageQuantity && (
        <div className="right-arrow">
          <i
            className="fa fa-angle-right"
            onClick={() => handleClick("right")}
          ></i>
        </div>
      )}
      <div className="slider-container">
        <div className="slider-group" ref={sliderRef}>
          {props.data &&
            props.data.map((film) => (
              <div className="slider-item" key={film.id}>
                <img src={film.img} alt={film.name} />
                <div className="action">
                  <button>Đặt vé</button>
                  <button>Chi tiết</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Slider;
