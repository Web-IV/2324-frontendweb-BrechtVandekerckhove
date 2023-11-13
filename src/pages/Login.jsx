import { Formik, Form, Field } from "formik";
import { Input, SubmitButton, FormItem, ResetButton } from "formik-antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Link } from "react-router-dom";

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Ongeldig e-mailadres")
    .required("E-mail is verplicht!"),
  wachtwoord: Yup.string()
    .required("Wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
});
export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async ({ email, wachtwoord }) => {
      const loggedIn = await login(email, wachtwoord);

      if (loggedIn) {
        navigate("/", {
          replace: true,
        });
      }
    },
    [login, navigate]
  );

  return (
    <Formik
      initialValues={{
        email: "",
        wachtwoord: "",
      }}
      validationSchema={validation}
      onSubmit={handleLogin}
    >
      <Form className="login-form">
        <FormItem className="formMargin" name="email">
          <Field
            name="email"
            type="email"
            as={Input}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            size="large"
            rules={[
              {
                required: true,
                message: "E-mail is verplicht!",
              },
            ]}
          />
        </FormItem>
        <FormItem className="formMargin" name="wachtwoord">
          <Field
            name="wachtwoord"
            type="password"
            as={Input}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Wachtwoord"
            size="large"
            rules={[
              {
                required: true,
                message: "Wachtwoord is verplicht!",
              },
            ]}
          />
        </FormItem>{" "}
        <div className="login-form-button-container">
          <SubmitButton
            type="primary"
            size="large"
            disabled={loading}
            className="login-form-button blue formMargin"
          >
            Log in
          </SubmitButton>{" "}
          <ResetButton
            type="primary"
            size="large"
            className="login-form-button formMargin blue"
          >
            Reset
          </ResetButton>
        </div>
        Nieuw?{"  "}
        <Link to="/registreer" className="blueText ">
          Registreer hier!
        </Link>
        <Error error={error} />
      </Form>
    </Formik>
  );
}
