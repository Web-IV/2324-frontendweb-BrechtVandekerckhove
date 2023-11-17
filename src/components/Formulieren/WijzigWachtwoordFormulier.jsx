import { Typography ,message} from "antd";
import { Formik, Form, Field } from "formik";
import { Input, SubmitButton, FormItem } from "formik-antd";
import { Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { update } from "../../api";
import Error from "../Error";
import { MEDEWERKER_ID_KEY } from "../../contexts/Auth.context";


const { Title } = Typography;

const validation = Yup.object().shape({
  huidigWachtwoord: Yup.string()
    .required("Huidig wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
  nieuwWachtwoord: Yup.string()
    .required("Nieuw wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
  bevestigingNieuwWachtwoord: Yup.string()
    .equals([Yup.ref("nieuwWachtwoord")], "Wachtwoorden komen niet overeen")
    .required("Bevestiging nieuw wachtwoord is verplicht!"),
});

export default function WijzigWachtwoordFormulier() {
  const {
    isMutating: loading,
    error: error,
    trigger: updateMedewerker,
  } = useSWRMutation(
    ["medewerkers", localStorage.getItem(MEDEWERKER_ID_KEY)],
    ([url, id], data) => update(url, id, data)
  );

  const [messageApi, contextHolder] = message.useMessage();

  const history = useHistory();
  const handleAnnuleerClick = () {history.push("/");}
  
  const showConfirmation = () => {
    messageApi.open({
      type: "success",
      content: "Wachtwoord succesvol gewijzigd",
      duration: 3,
    });
  };
  return (
    <>
      <Title level={2}>Wachtwoord wijzigen</Title>
     
      <Formik
        initialValues={{
          huidigWachtwoord: "",
          nieuwWachtwoord: "",
          bevestigingNieuwWachtwoord: "",
        }}
        validationSchema={validation}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          updateMedewerker({
            ...data,
          });
          resetForm();
          setSubmitting(false);
          showConfirmation();
        }}
      >
        <Form className="form-profiel">
          <FormItem className="formMargin" name="huidigWachtwoord">
            <Field
              name="huidigWachtwoord"
              id="2"
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
          <FormItem className="formMargin" name="nieuwWachtwoord">
            <Field
              name="nieuwWachtwoord"
              type="password"
              as={Input}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nieuw wachtwoord"
              rules={[
                {
                  required: true,
                  message: "Nieuw wachtwoord is verplicht!",
                },
              ]}
            />
          </FormItem>{" "}
          <FormItem className="formMargin" name="bevestigingNieuwWachtwoord">
            <Field
              name="bevestigingNieuwWachtwoord"
              type="password"
              as={Input}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Bevestig je nieuw wachtwoord"
              rules={[
                {
                  required: true,
                  message: "Nieuw wachtwoord is verplicht!",
                },
              ]}
            />
          </FormItem>
          <div className="form-button-container">
            <SubmitButton
              type="primary"
              className="form-button blue formMargin"
            >
              Opslaan
            </SubmitButton>    
            <Button onClick={handleAnnuleerClick} "className="form-button formMargin">
         Annuleren
            </Button>
          </div>
          <Error error={error} />
          {contextHolder}
        </Form>
  
      </Formik>
    </>
  );
}
