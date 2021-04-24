import React from "react";
import "./style.sass";

function Footer(props) {
  return (
    <footer>
      <img
        src="http://www.lottecinemavn.com/LCHS/Image/logo_footer.gif?v=17111301"
        alt="lotte cinema"
      />
      <div className="info-item">CÔNG TY TNHH LOTTE CINEMA VIỆT NAM</div>
      <div className="info-item">
        Địa chỉ: Tầng 3, TTTM Lotte, số 469 đường Nguyễn Hữu Thọ, Phường Tân
        Hưng, Quận 7, TPHCM, Việt Nam
      </div>
      <div className="info-item">Hotline: (028) 3775 2524</div>
      <div className="info-item">
        COPYRIGHT © LOTTECINEMAVN.COM - ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
