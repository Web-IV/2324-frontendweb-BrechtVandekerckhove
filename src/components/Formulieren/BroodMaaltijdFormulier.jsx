import { Formik, Form, useField } from "formik";
import { Select, FormItem, SubmitButton, DatePicker } from "formik-antd";
import { message } from "antd";
import {
  hartigBelegOpties,
  sandwichesOpties,
  zoetBelegOpties,
  dessertOpties,
  vetstofOpties,
  soepOpties,
} from "../../data/opties_maaltijdformulieren.js";
import * as Yup from "yup";
import Error from "../Error";

const formItemLayout = { labelCol: { span: 5 }, labelAlign: "left" };
const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem
        name={label}
        label={label}
        {...formItemLayout}
        style={{ marginBottom: "10px" }}
      >
        <Select {...field} {...props}></Select>
      </FormItem>
      {meta.touched && meta.error ? <Error error={meta.error} /> : null}
    </>
  );
};

const validation = Yup.object().shape({
  leverdatum: Yup.date().required("Leverdatum is verplicht"),
});

export default function BroodMaaltijdFormulier({ saveMaaltijd, disabledDate }) {
  const [messageApi, contextHolder] = message.useMessage();
  const showConfirmation = () => {
    messageApi.open({
      type: "success",
      content: "Maaltijd toegevoegd aan winkelmandje",
      duration: 3,
    });
  };
  
  return (
    <div className="maaltijdFormulier">
      {contextHolder}
      <Formik
        initialValues={{
          soep: soepOpties[0].value,
          typeSandwiches: sandwichesOpties[0].value,
          hartigBeleg: hartigBelegOpties[0].value,
          zoetBeleg: zoetBelegOpties[0].value,
          vetstof: vetstofOpties[0].value,
          dessert: dessertOpties[0].value,
          leverdatum: "",
        }}
        validationSchema={validation}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          saveMaaltijd({
            type: "broodMaaltijd",
            ...data,
          });
          resetForm();
          setSubmitting(false);
          showConfirmation();
        }}
      >
        <Form>
          <MySelect label="Soep" name="soep" options={soepOpties} />
          <MySelect
            label="Sandwiches"
            name="typeSandwiches"
            options={sandwichesOpties}
          />
          <MySelect
            label="Hartig beleg"
            name="hartigBeleg"
            options={hartigBelegOpties}
          />
          <MySelect
            label="Zoet beleg"
            name="zoetBeleg"
            options={zoetBelegOpties}
          />
          <MySelect label="Vetstof" name="vetstof" options={vetstofOpties} />
          <MySelect label="Dessert" name="dessert" options={dessertOpties} />
          <FormItem name="leverdatum" label="Leverdatum" {...formItemLayout}>
            <DatePicker
              name="leverdatum"
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
              placeholder="Selecteer een datum"
              style={{ width: "100%" }}
            />
          </FormItem>
          <SubmitButton disabled={false} className="blue">
            Voeg toe
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
}
