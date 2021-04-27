import translationVI from "../locales/vi/translation.json";
import translationEN from "../locales/en/translation.json";

const lng = localStorage.getItem("i18nextLng");

export default lng === "en" ? translationEN : lng === "vi" ? translationVI : {};
