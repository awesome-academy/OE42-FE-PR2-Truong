import React, { useEffect } from "react";
import "./style.sass";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/images/user.png";
import * as routePath from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import PendingSpinner from "../../components/pending-spinner";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import CustomInput from "../../components/custom-input";
import SignUpSchema from "../../validations/signUpSchema";
import { postSignUp } from "../../reducers/auth";
import ToggleLanguageButton from "../../components/toggle-language-button";

function RegisterPage(props) {
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
    <section className="register-page-container">
      <div className="form-container">
        <div className="avatar">
          <img src={logo} alt="user icon" />
        </div>
        <div className="form-bound">
          <div className="toggle-btn">
            <div className="title">{t("common.list_title.language")}: </div>
            <ToggleLanguageButton />
          </div>
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              fullName: "",
              address: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              const { confirmPassword, ...restProps } = values;
              dispatch(postSignUp({ ...restProps }));
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-title">
                  {t("common.list_title.register_title")}
                </div>
                {error && <div className="error-item">{error}</div>}
                <Field
                  name="username"
                  component={CustomInput}
                  placeholder={t("placeholder.username")}
                  icon="user"
                  type="text"
                />
                {errors.username && touched.username ? (
                  <span>{t(errors.username)}</span>
                ) : null}
                <Field
                  name="password"
                  component={CustomInput}
                  placeholder={t("placeholder.password")}
                  icon="unlock-alt"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <span>{t(errors.password)}</span>
                ) : null}
                <Field
                  name="confirmPassword"
                  component={CustomInput}
                  placeholder={t("placeholder.confirm_password")}
                  icon="lock"
                  type="password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span>{t(errors.confirmPassword)}</span>
                ) : null}
                <Field
                  name="fullName"
                  component={CustomInput}
                  placeholder={t("placeholder.full_name")}
                  icon="user-md"
                  type="text"
                />
                {errors.fullName && touched.fullName ? (
                  <span>{t(errors.fullName)}</span>
                ) : null}
                <Field
                  name="address"
                  component={CustomInput}
                  placeholder={t("placeholder.address")}
                  icon="location-arrow"
                  type="text"
                />
                {errors.address && touched.address ? (
                  <span>{t(errors.address)}</span>
                ) : null}
                <button type="submit">
                  {t("common.button_title.register")}
                </button>
                <div className="register-item">
                  <span>{t("common.list_title.have_account")} </span>
                  <Link to={routePath.LOGIN_PAGE_PATH}>
                    {t("common.list_title.login_now")}
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {pending && <PendingSpinner />}
    </section>
  );
}

export default RegisterPage;
