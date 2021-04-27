import React from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";

function NotFoundPage(props) {
  const { t } = useTranslation();

  return (
    <section className="not-found-container">
      <div className="content-container">
        <div className="error-code">404</div>
        <div className="message">{t("error.not_found_page")}</div>
      </div>
    </section>
  );
}

export default NotFoundPage;
