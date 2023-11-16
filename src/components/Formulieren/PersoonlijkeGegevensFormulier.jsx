import { Typography, message } from "antd";
import { Formik, Form, Field } from "formik";
import { Input, SubmitButton, FormItem, Select } from "formik-antd";
import { Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { MEDEWERKER_ID_KEY } from "../../contexts/Auth.context";
import useSWRMutation from "swr/mutation";
import { update } from "../../api";
import Error from "../Error";

const { Title } = Typography;

const validation = Yup.object().shape({
  voornaam: Yup.string().required("Voornaam is verplicht!"),
  naam: Yup.string().required("Naam is verplicht!"),
  dienst: Yup.string().required("Dienst is verplicht!"),
  email: Yup.string()
    .email("Ongeldig e-mailadres")
    .required("E-mail is verplicht!"),
  huidigWachtwoord: Yup.string()
    .required("Wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
});

export default function PersoonlijkeGegevensFormulier({
  medewerker,
  diensten,
}) {
  const {
    isMutating: loading,
    error: error,
    trigger: updateMedewerker,
  } = useSWRMutation(
    ["medewerkers", localStorage.getItem(MEDEWERKER_ID_KEY)],
    ([url, id], data) => update(url, id, data)
  );

  const [messageApi, contextHolder] = message.useMessage();
  const showConfirmation = () => {
    messageApi.open({
      type: "success",
      content: "Persoonlijke gegevens succesvol gewijzigd",
      duration: 3,
    });
  };

  return (
    <>
      <Title level={2}>Persoonlijke gegevens</Title>
      <Formik
        initialValues={{
          naam: medewerker?.naam,
          voornaam: medewerker?.voornaam,
          dienst: medewerker?.dienst.naam,
          email: medewerker?.email,
          huidigWachtwoord: "",
        }}
        validationSchema={validation}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          updateMedewerker({ ...data });
          resetForm({ values: { ...data, huidigWachtwoord: "" } });
          setSubmitting(false);
          showConfirmation();
        }}
      >
        <Form className="form-profiel">
          <FormItem className="formMargin" name="voornaam">
            <Field
              name="voornaam"
              type="text"
              as={Input}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Voornaam"
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
              rules={[
                {
                  required: true,
                  message: "Naam is verplicht!",
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
          <FormItem className="formMargin" name="email">
            <Field
              name="email"
              type="email"
              as={Input}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
              rules={[
                {
                  required: true,
                  message: "E-mail is verplicht!",
                },
              ]}
            />
          </FormItem>
          <FormItem className="formMargin" name="huidigWachtwoord">
            <Field
              name="huidigWachtwoord"
              id="1"
              type="password"
              as={Input}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Huidig wachtwoord"
              rules={[
                {
                  required: true,
                  message: "Huidig wachtwoord is verplicht!",
                },
              ]}
            />
          </FormItem>{" "}
          <div className="form-button-container">
            <SubmitButton
              type="primary"
              className="form-button blue formMargin"
            >
              Opslaan
            </SubmitButton>
            <Button className="form-button formMargin">
              <Link to="/">Annuleren</Link>
            </Button>
          </div>
          <Error error={error} />
          {contextHolder}
        </Form>
      </Formik>
    </>
  );
}
