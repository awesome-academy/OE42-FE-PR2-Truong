import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.sass";

function Header(props) {
  const [showTopMenu, setShowTopMenu] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(true);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useLayoutEffect(() => {
    const resizeWindow = () => {
      const { innerWidth: width } = window;
      if (width < 576 && !showTopButton && !showBottomButton) {
        setShowTopButton(true);
        setShowBottomButton(true);
        setShowTopMenu(false);
        setShowBottomMenu(false);
      } else if (width >= 576 && showTopButton && showBottomButton) {
        setShowTopButton(false);
        setShowBottomButton(false);
        setShowTopMenu(true);
        setShowBottomMenu(true);
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [showTopButton, showBottomButton]);

  const handleClick = (type) => {
    if (type === "top") {
      setShowTopMenu(!showTopMenu);
    } else {
      setShowBottomMenu(!showBottomMenu);
    }
  };

  return (
    <header>
      <nav className="top-header">
        {showTopButton && (
          <button className="menu-button" onClick={() => handleClick("top")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showTopMenu && (
          <ul>
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link to="/member-card">Thẻ thành viên</Link>
            </li>
            <li>
              <Link to="/support">Hỗ trợ khách hàng</Link>
            </li>
          </ul>
        )}
      </nav>
      <section className="main-logo">
        <a href="/">
          <img
            src="http://www.lottecinemavn.com/LCHS/Image/logo_main.gif"
            alt="Lotte cinema"
          />
        </a>
      </section>
      <nav className="bottom-header">
        {showBottomButton && (
          <button className="menu-button" onClick={() => handleClick("bottom")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showBottomMenu && (
          <ul>
            <li>
              <Link to="/gift">SHOP QUÀ TẶNG</Link>
            </li>
            <li>
              <Link to="/ticket">MUA VÉ</Link>
            </li>
            <li>
              <Link to="/film">PHIM</Link>
            </li>
            <li>
              <Link to="/cinema">RẠP CHIẾU PHIM</Link>
            </li>
            <li>
              <Link to="/promotion">KHUYẾN MÃI</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
