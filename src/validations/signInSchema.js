import * as Yup from "yup";
import translation from "../utils/getTranslation";

export default Yup.object().shape({
  username: Yup.string().required(translation.validation_error?.username.null),
  password: Yup.string().required(translation.validation_error?.password.null),
});
