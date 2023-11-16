import { Formik, Form, Field } from "formik";
import {
  Input,
  SubmitButton,
  FormItem,
  ResetButton,
  Select,
} from "formik-antd";

import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import AsyncData from "../components/AsyncData";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Typography } from "antd";
import { getAll } from "../api";

const { Title } = Typography;

const validation = Yup.object().shape({
  voornaam: Yup.string().required("Voornaam is verplicht!"),
  naam: Yup.string().required("Naam is verplicht!"),
  dienst: Yup.string().required("Dienst is verplicht!"),
  email: Yup.string()
    .email("Ongeldig e-mailadres")
    .required("E-mail is verplicht!"),
  wachtwoord: Yup.string()
    .required("Wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
  bevestigingWachtwoord: Yup.string()
    .equals([Yup.ref("wachtwoord")], "Wachtwoorden komen niet overeen")
    .required("Bevestiging wachtwoord is verplicht!"),
});
export default function Register() {
  const {
    data: diensten = [],
    isLoading,
    error: dienstenError,
  } = useSWR("diensten", getAll);
  const { error: errorRegister, loading, register } = useAuth();
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  useEffect(() => {
    if (isAuthed) {
      navigate("/");
    }
  }, [isAuthed, navigate]);

  const handleRegister = useCallback(
    async ({
      voornaam,
      naam,
      email,
      dienst,
      wachtwoord,
      bevestigingWachtwoord,
    }) => {
      const registered = await register(
        voornaam,
        naam,
        email,
        dienst,
        wachtwoord,
        bevestigingWachtwoord
      );

      if (registered) {
        navigate("/", {
          replace: true,
        });
      }
    },
    [register, navigate]
  );

  return (
    <AsyncData
      loading={isLoading || loading}
      error={dienstenError || errorRegister}
    >
      {!(dienstenError || errorRegister) ? (
        <>
          <Title level={1} style={{ textAlign: "center"}}>
            Registreren
          </Title>
          <Formik
            initialValues={{
              voornaam: "",
              naam: "",
              email: "",
              dienst: "",
              wachtwoord: "",
              bevestigingWachtwoord: "",
            }}
            validationSchema={validation}
            onSubmit={handleRegister}
          >
            <Form className="form">
              <FormItem className="formMargin" name="voornaam">
                <Field
                  name="voornaam"
                  type="text"
                  as={Input}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Voornaam"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Voornaam is verplicht!",
                    },
                  ]}
                />
              </FormItem>
              <FormItem className="formMargin" name="naam">
                <Field
                  name="naam"
                  type="text"
                  as={Input}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Naam"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Naam is verplicht!",
                    },
                  ]}
                />
              </FormItem>
              <FormItem className="formMargin" name="email">
                <Field
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
              <FormItem className="formMargin" name="dienst">
                <Select
                  name="dienst"
                  placeholder="Selecteer een dienst"
                  options={diensten.map((dienst) => ({
                    value: dienst.naam,
                    label: dienst.naam,
                  }))}
                ></Select>
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
              <FormItem className="formMargin" name="bevestigingWachtwoord">
                <Field
                  name="bevestigingWachtwoord"
                  type="password"
                  as={Input}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Bevestig je wachtwoord"
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
                  type="primary"
                  size="large"
                  className="form-button blue formMargin"
                >
                  Registreer
                </SubmitButton>{" "}
                <ResetButton
                  type="primary"
                  size="large"
                  className="form-button formMargin blue"
                >
                  Reset
                </ResetButton>
              </div>
              Reeds een account?{"  "}
              <Link to="/login" className="blueText ">
                Log hier in!
              </Link>
            </Form>
          </Formik>
        </>
      ) : null}
    </AsyncData>
  );
}
