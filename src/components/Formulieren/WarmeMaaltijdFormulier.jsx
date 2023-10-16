import { Formik, Form, useField } from "formik";
import { Select, FormItem, SubmitButton, DatePicker } from "formik-antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import {
  hoofdschotelOpties,
  dessertOpties,
  soepOpties,
} from "../../data/opties_maaltijdedformulieren.js";
import * as Yup from "yup";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem name={label} label={label} style={{ marginBottom: "10px" }}>
        <Select {...field} {...props}></Select>
      </FormItem>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const disabledDate = (current) => {
  const dagenInVerledenEnVandaag = current < dayjs().endOf("day");
  //hier dynamisch instellen
  const dagenReedsBestelling = [dayjs("2023-10-20"), dayjs("2023-10-24")];

  return (
    (current && dagenInVerledenEnVandaag) ||
    dagenReedsBestelling.some((date) => current.isSame(date, "day"))
  );
};

const validation = Yup.object().shape({
  leverdatum: Yup.date().required("Leverdatum is verplicht"),
});

export default function BroodMaaltijdFormulier() {
  return (
    <div
      style={{
        marginTop: 80,
        maxWidth: 300,
        marginRight: "auto",
      }}
    >
      <Formik
        initialValues={{
          hoofdschotel: hoofdschotelOpties[0].value,
          soep: soepOpties[0].value,
          dessert: dessertOpties[0].value,
          leverdatum: "",
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Form values:", values);
            setSubmitting(false);
          }, 300);
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
          <FormItem name="leverdatum" label="Leverdatum">
            <DatePicker
              name="leverdatum"
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
              placeholder="Selecteer een datum"
              style={{ width: "100%" }}
            />
          </FormItem>
          <SubmitButton disabled={false}>Bestellen</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
}
