import { Formik, Form, Field } from "formik";
import { Input, SubmitButton, FormItem, ResetButton } from "formik-antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

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
  const { isAuthed } = useAuth();

  useEffect(() => {
    if (isAuthed) {
      // Redirect to home page if the user is already authenticated
      navigate("/");
    }
  }, [isAuthed, navigate]);

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

    <>
      <Title level={1} style={{textAlign:"center"}}>Inloggen</Title>
      <Formik
        initialValues={{
          email: "",
          wachtwoord: "",
        }}
        validationSchema={validation}
        onSubmit={handleLogin}
      >
        <Form className="form">
          <FormItem className="formMargin" name="email">
            <Field
              data-cy="email_input"
              name="email"
              type="email"
              as={Input}
              prefix={<MailOutlined className="site-form-item-icon" />}
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
              data-cy="wachtwoord_input"
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
          <div className="form-button-container">
            <SubmitButton
              data-cy="submit_btn"
              type="primary"
              size="large"
              disabled={loading}
              className="form-button blue formMargin"
            >
              Log in
            </SubmitButton>{" "}
            <ResetButton
              type="primary"
              size="large"
              className="form-button formMargin blue"
            >
              Reset
            </ResetButton>
          </div>
          Nieuw?{"  "}
          <Link to="/register" className="blueText ">
            Registreer hier!
          </Link>
          <Error error={error} />
        </Form>
      </Formik>
    </>
  );
}
