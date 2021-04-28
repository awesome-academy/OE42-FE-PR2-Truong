import React, { useEffect } from "react";
import "./style.sass";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/images/user.png";
import * as routePath from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import PendingSpinner from "../../components/pending-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postLogin } from "../../reducers/auth";
import { useTranslation } from "react-i18next";
import signInSchema from "../../validations/signInSchema";
import CustomInput from "../../components/custom-input";

function LoginPage(props) {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { token, pending, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const newPath = location.state?.from?.pathname || "/";
      history.replace(newPath);
    }
  }, [history, location, token]);

  return (
    <section className="login-page-container">
      <div className="form-container">
        <div className="avatar">
          <img src={logo} alt="user icon" />
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            dispatch(postLogin(values));
          }}
        >
          <Form>
            <div className="form-title">
              {t("common.list_title.login_title")}
            </div>
            {error && <div className="error-item">{error}</div>}
            <Field
              name="username"
              component={CustomInput}
              placeholder={t("placeholder.username")}
              icon="user"
              type="text"
            />
            <ErrorMessage name="username" component="span" />
            <Field
              name="password"
              component={CustomInput}
              placeholder={t("placeholder.password")}
              icon="unlock-alt"
              type="password"
            />
            <ErrorMessage name="password" component="span" />
            <button type="submit">{t("common.button_title.login")}</button>
            <div className="register-item">
              <span>{t("common.list_title.not_have_account")} </span>
              <Link to={routePath.REGISTER_PAGE_PATH}>
                {t("common.list_title.register_now")}
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
      {pending && <PendingSpinner />}
    </section>
  );
}

export default LoginPage;
