import { Formik, Form, useField } from "formik";
import { Select, FormItem, SubmitButton, DatePicker } from "formik-antd";
import { message } from "antd";
import {
  hoofdschotelOpties,
  dessertOpties,
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
          hoofdschotel: hoofdschotelOpties[0].value,
          soep: soepOpties[0].value,
          dessert: dessertOpties[0].value,
          leverdatum: "",
        }}
        validationSchema={validation}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          saveMaaltijd({
            type: "warmeMaaltijd",
            ...data,
          });
          resetForm();
          setSubmitting(false);
          showConfirmation();
        }}
      >
        <Form>
          <MySelect
            label="Hoofdschotel"
            name="hoofdschotel"
            options={hoofdschotelOpties}
          />
          <MySelect label="Soep" name="soep" options={soepOpties} />
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
